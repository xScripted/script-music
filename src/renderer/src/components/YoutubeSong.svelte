<script lang="ts">
  import { onMount } from 'svelte'

  let youtubeURL = ''
  let cover = ''
  let title = ''
  let artist = ''

  onMount(async () => {
    if (!youtubeURL) return

    const videoTitle = await window.electron.ipcRenderer.invoke('download-song', youtubeURL)
  })
</script>

<style lang="scss">
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px 0;

    label {
      font-weight: bold;
    }
  }
</style>

<div class="youtube-song">
  <div class="input-group">
    <label>Youtube URL</label>
    <input type="text" bind:value={youtubeURL} placeholder="https://www.youtube.com/watch?v=ip10YUcH2BA" />
  </div>
  <img src={cover} alt="" />
  <div class="input-group">
    <label>Title</label>
    <input type="text" bind:value={title} placeholder="Title" />
  </div>

  <div class="input-group">
    <label>Artist</label>
    <input type="text" bind:value={artist} placeholder="Artist" />
  </div>

  <div class="input-group">
    <label>Cover</label>
    <input type="text" bind:value={cover} placeholder="Image url" />
  </div>
</div>
