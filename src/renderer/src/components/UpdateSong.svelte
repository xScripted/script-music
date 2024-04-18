<script lang="ts">
  import type { ISong } from './../../../interfaces/ISong.ts'
  import type { ITag } from './../../../interfaces/ITag.ts'
  import type { IMetaData } from './../../../interfaces/IMetaData.ts'

  import { selectedSongForUpdate, tags, playlist, playlistFiltered } from '../scripts/store'
  import Tag from './Tag.svelte'
  import InputTag from './InputTag.svelte'
  import { get } from 'svelte/store'

  let selectedSongForUpdateValue

  selectedSongForUpdate.subscribe((value: ISong) => (selectedSongForUpdateValue = value))

  let cover = selectedSongForUpdateValue.cover
  let title = selectedSongForUpdateValue.title
  let artist = selectedSongForUpdateValue.artist
  let formTags: ITag[] = selectedSongForUpdateValue.tags
  const fileName = selectedSongForUpdateValue.fileName

  const toggleTag = (tagName: string) => {
    const tagActive = selectedSongForUpdateValue.tags.find((name: string) => name === tagName)

    if (tagActive) {
      selectedSongForUpdateValue.tags = selectedSongForUpdateValue.tags.filter((name: string) => name != tagName)
    } else {
      selectedSongForUpdateValue.tags.push(tagName)
    }
  }

  const updateSong = () => {
    const tags: ITag[] = formTags.filter((tag: ITag) => tag.active)

    const metaData: IMetaData = {
      fileUrl: fileName,
      title,
      artist,
      date: new Date(),
      subtitle: cover,
      genre: JSON.stringify(tags.map((tag: ITag) => tag.name)),
    }

    window.electron.ipcRenderer.invoke('write-meta-data', { fileName, metaData })

    const playlistI = get(playlist).findIndex((song: ISong) => song.fileName === fileName)
    playlist.update((p: ISong[]) => {
      p[playlistI] = {
        fileName: p[playlistI].fileName,
        title,
        artist,
        tags: tags.map((tag: ITag) => tag.name),
        cover,
        lyrics: p[playlistI].lyrics,
        date: p[playlistI].date,
      }

      return p
    })

    const playlistFI = get(playlistFiltered).findIndex((song: ISong) => song.fileName === fileName)

    if (playlistFI) {
      playlistFiltered.update((p: ISong[]) => {
        p[playlistFI] = {
          fileName: p[playlistFI].fileName,
          title,
          artist,
          tags: tags.map((tag: ITag) => tag.name),
          cover,
          lyrics: p[playlistFI].lyrics,
          date: p[playlistFI].date,
        }

        return p
      })
    }
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

    .update-song-btn {
      padding: 20px;
      text-align: center;
    }
  }
</style>

<div class="update-song-wrapper">
  <div class="update-song">
    <img src={selectedSongForUpdateValue.cover} alt="" />

    <div class="input-group">
      <h4>Title</h4>
      <input class="input" type="text" bind:value={title} on:input={updateSong} placeholder="Title" />
    </div>

    <div class="input-group">
      <h4>Artist</h4>
      <input class="input" type="text" bind:value={artist} on:input={updateSong} placeholder="Artist" />
    </div>

    <div class="input-group double">
      <h4>Cover</h4>
      <input class="input" type="text" bind:value={cover} placeholder="Cover" />
    </div>

    <div class="tags-group double">
      <h4>Tags</h4>

      <div class="form-tags">
        {#each get(tags) as tag}
          <button on:click={() => toggleTag(tag.name)}>
            <Tag {tag} active={selectedSongForUpdateValue.tags.find((x) => x === tag.name)} />
          </button>
        {/each}
        <div class="input-tag-container">
          <InputTag />
        </div>
      </div>
    </div>
  </div>

  <button class="g-btn update-song-btn" on:click={updateSong}> Actualizar canción </button>
</div>
