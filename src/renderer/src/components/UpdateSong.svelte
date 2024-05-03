<script lang="ts">
  import type { ISong } from '@interfaces/ISong.ts'
  import type { ITag } from '@interfaces/ITag.ts'
  import type { IMetaData } from '@interfaces/IMetaData.ts'

  import { selectedSongForUpdate, tags, songs, songsFiltered } from '@/constants/godStore'
  import Tag from '@/components/Tag.svelte'
  import InputTag from '@/components/InputTag.svelte'
  import { get } from 'svelte/store'
  import Input from '@/components/Input.svelte'

  let selectedSongForUpdateValue
  let tagsCopy: ITag[] = []

  selectedSongForUpdate.subscribe((value: ISong) => (selectedSongForUpdateValue = value))

  const toggleTag = (tagName: string) => {
    const tagIndex: number = tagsCopy.findIndex((tag: ITag) => tag.name === tagName)

    tagsCopy[tagIndex].active = !tagsCopy[tagIndex].active

    updateSong()
  }

  const updateSong = () => {
    const activeTags = tagsCopy.filter((tag: ITag) => tag.active).map((tag: ITag) => tag.name)

    const metaData: IMetaData = {
      fileUrl: selectedSongForUpdateValue.fileName,
      title: selectedSongForUpdateValue.title,
      artist: selectedSongForUpdateValue.artist,
      date: new Date(),
      subtitle: selectedSongForUpdateValue.cover,
      genre: JSON.stringify(activeTags),
    }

    window.electron.ipcRenderer.invoke('write-meta-data', { fileName: selectedSongForUpdateValue.fileName, metaData })

    const songsI = get(songs).findIndex((song: ISong) => song.fileName === selectedSongForUpdateValue.fileName)

    songs.update((p: ISong[]) => {
      p[songsI] = {
        fileName: p[songsI].fileName,
        title: selectedSongForUpdateValue.title,
        artist: selectedSongForUpdateValue.artist,
        tags: activeTags,
        cover: selectedSongForUpdateValue.cover,
        lyrics: p[songsI].lyrics,
        date: p[songsI].date,
      }

      return p
    })

    //songs Filtered Index
    const songsFI = get(songsFiltered).findIndex((song: ISong) => song.fileName === selectedSongForUpdateValue.fileName)

    songsFiltered.update((p: ISong[]) => {
      p[songsFI] = {
        fileName: p[songsFI].fileName,
        title: selectedSongForUpdateValue.title,
        artist: selectedSongForUpdateValue.artist,
        tags: activeTags,
        cover: selectedSongForUpdateValue.cover,
        lyrics: p[songsFI].lyrics,
        date: p[songsFI].date,
      }

      return p
    })
  }

  let tagsValue: ITag[]
  tags.subscribe((value: ITag[]) => (tagsValue = value.map((tag: ITag) => Object.assign({}, tag))))

  $: {
    tagsCopy = tagsValue.map((tag: ITag) => {
      tag.active = selectedSongForUpdateValue.tags.find((name: string) => name === tag.name)

      return { ...tag }
    })
  }
</script>

<style lang="scss">
  .update-song-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    .update-song {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;

      .input-group {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .double {
        grid-column: span 2;
      }

      .form-tags {
        padding: 10px 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 10px;

        .input-tag-container {
          grid-column: span 2;
        }
      }

      img {
        width: 100%;
        height: 100%;
        aspect-ratio: 1 / 1;
        border-radius: var(--radius);
        grid-row: span 2;
        object-fit: cover;
      }
    }
  }
</style>

<div class="update-song-wrapper">
  <div class="update-song">
    <img src={selectedSongForUpdateValue.cover} alt="" />

    <div class="input-group">
      <h4>Title</h4>
      <Input bind:value={selectedSongForUpdateValue.title} on:input={updateSong} placeholder="Title" />
    </div>

    <div class="input-group">
      <h4>Artist</h4>
      <Input bind:value={selectedSongForUpdateValue.artist} on:input={updateSong} placeholder="Artist" />
    </div>

    <div class="input-group double">
      <h4>Cover</h4>
      <Input bind:value={selectedSongForUpdateValue.cover} placeholder="Cover" />
    </div>

    <div class="tags-group double">
      <h4>Tags</h4>

      <div class="form-tags">
        {#each tagsCopy as tag}
          <button on:click={() => toggleTag(tag.name)}>
            <Tag {tag} active={tag.active} />
          </button>
        {/each}
        <div class="input-tag-container">
          <InputTag />
        </div>
      </div>
    </div>
  </div>
</div>
