<script lang="ts">
  import { playlist } from '../scripts/store.js'
  import type { ISong } from './../../../interfaces/ISong.ts'
  import type { IMetaData } from './../../../interfaces/IMetaData.ts'
  let youtubeURL = ''
  let cover = ''
  let title = ''
  let artist = ''

  const downloadSong = async () => {
    if (!youtubeURL) return
    const fileName = await window.electron.ipcRenderer.invoke('download-song', youtubeURL)

    const metaData: IMetaData = {
      fileUrl: fileName,
      title,
      artist,
      date: new Date(),
      APIC: cover,
      genre: JSON.stringify([]),
    }

    setTimeout(() => {
      window.electron.ipcRenderer.invoke('write-meta-data', { fileName, metaData })
    }, 1000)

    const newSong: ISong = {
      fileName,
      title,
      artist,
      tags: [],
      cover,
      lyrics: '',
    }

    playlist.update((p) => [...p, newSong])
  }
</script>

<style lang="scss">
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 12px 0;
  }

  label {
    font-weight: bold;
  }

  .tags-group {
    height: 200px;
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
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
</style>

<div class="youtube-song">
  <div class="input-group">
    <label>Youtube URL</label>
    <input type="text" bind:value={youtubeURL} placeholder="https://www.youtube.com/watch?v=ip10YUcH2BA" />
  </div>

  <div class="cover">
    <img src={cover} alt="" />
    <div class="input-group">
      <label>Cover</label>
      <input type="text" bind:value={cover} placeholder="Image url" />
    </div>
  </div>
  <div class="input-group">
    <label>Title</label>
    <input type="text" bind:value={title} placeholder="Title" />
  </div>

  <div class="input-group">
    <label>Artist</label>
    <input type="text" bind:value={artist} placeholder="Artist" />
  </div>

  <div class="tags-group">
    <label>Tags</label>
  </div>

  <button class="g-btn" on:click={downloadSong}> Descargar y guardar canción </button>
</div>
