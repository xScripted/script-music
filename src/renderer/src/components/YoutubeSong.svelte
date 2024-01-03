<script lang="ts">
  import { playlist, playlistFiltered, tags } from '../scripts/store.js'
  import type { ISong } from './../../../interfaces/ISong.ts'
  import type { ITag } from './../../../interfaces/ITag.ts'
  import type { IMetaData } from './../../../interfaces/IMetaData.ts'
  import Tag from './Tag.svelte'
  import InputTag from './InputTag.svelte'

  let youtubeURL = ''
  let cover = ''
  let title = ''
  let artist = ''
  let formTags: ITag[] = []

  const downloadSong = async () => {
    if (!youtubeURL) return
    const fileName = await window.electron.ipcRenderer.invoke('download-song', youtubeURL)
    const tags: ITag[] = formTags.filter((tag: ITag) => tag.active)

    const metaData: IMetaData = {
      fileUrl: fileName,
      title,
      artist,
      date: new Date(),
      subtitle: cover,
      genre: JSON.stringify(tags.map((tag: ITag) => tag.name)),
    }

    setTimeout(() => {
      window.electron.ipcRenderer.invoke('write-meta-data', { fileName, metaData })
    }, 1000)

    const newSong: ISong = {
      fileName: fileName + '.mp3',
      title,
      artist,
      tags: tags.map((tag: ITag) => tag.name),
      cover,
      lyrics: '',
      date: new Date(),
    }

    playlist.update((p) => [...p, newSong])
    playlistFiltered.update((p) => [...p, newSong])
  }

  const activeFormTag = (name: string) => {
    formTags = formTags.map((tag: ITag) => {
      if (tag.name === name) tag.active = !tag.active

      return tag
    })
  }

  tags.subscribe((value: ITag[]) => {
    formTags = value.map((tag: ITag) => {
      tag.active = false
      return tag
    })
  })
</script>

<style lang="scss">
  .youtube-song {
    .input-group {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 10px 0;
    }

    label {
      font-weight: bold;
    }

    .tags-group {
      height: 200px;
    }

    .flex {
      display: flex;
      gap: 20px;
    }

    .form-tags {
      padding: 10px 0;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
      gap: 10px;
    }

    .cover {
      display: flex;
      align-items: flex-end;
      gap: 20px;
      padding: 12px 0;
      flex: 1;

      .input-group {
        padding: 0;
        flex: 1;
      }
      img {
        width: 85px;
        height: 85px;
        border-radius: var(--radius);
        object-fit: cover;
        background-color: rgba(0, 0, 0, 0.2);
      }
    }

    .input-tag-container {
      grid-column: span 2;
    }
  }

  .download-song {
    position: absolute;
    width: fit-content;
    left: 0;
    right: 0;
    bottom: 20px;
    padding: 20px 85px;
    margin: auto;
    white-space: nowrap;
  }
</style>

<div class="youtube-song">
  <div class="input-group">
    <label>Youtube URL</label>
    <input class="input" type="text" bind:value={youtubeURL} placeholder="https://www.youtube.com/watch?v=ip10YUcH2BA" />
  </div>

  <div class="cover">
    <img src={cover} alt="" />
    <div class="input-group">
      <label>Cover</label>
      <input class="input" type="text" bind:value={cover} placeholder="Image url" />
    </div>
  </div>

  <div class="flex">
    <div class="input-group">
      <label for="">Title</label>
      <input class="input" type="text" bind:value={title} placeholder="Title" />
    </div>

    <div class="input-group">
      <label for="">Artist</label>
      <input class="input" type="text" bind:value={artist} placeholder="Artist" />
    </div>
  </div>

  <div class="tags-group">
    <label for="">Tags</label>

    <div class="form-tags">
      {#each formTags as tag}
        <button on:click={() => activeFormTag(tag.name)}>
          <Tag {tag} active={tag.active} />
        </button>
      {/each}
      <div class="input-tag-container">
        <InputTag />
      </div>
    </div>
  </div>
</div>
<button class="g-btn download-song" on:click={downloadSong}> Descargar y guardar canción </button>
