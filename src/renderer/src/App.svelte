<script lang="ts">
  import { playlist } from './scripts/store'
  import Player from './components/Player.svelte'
  import Viewer from './components/Viewer.svelte'
  import Panel from './components/Panel.svelte'
  import Menu from './components/Menu.svelte'
  import Utilities from './components/Utilities.svelte'
  import { onMount } from 'svelte'
  import type { ISong } from '../../interfaces/ISong'

  const setAllSongs = async () => {
    const fileNames: string[] = await window.electron.ipcRenderer.invoke('get-song-file-names')

    let allSongs = []

    await Promise.all(
      fileNames.map(async (fileName: string) => {
        let metaSong = await window.electron.ipcRenderer.invoke('read-meta-data', fileName)

        const song: ISong = {
          fileName: fileName,
          title: metaSong.title || fileName,
          artist: metaSong.artist || '',
          tags: JSON.parse(metaSong.comment?.text || '[]') || [],
          cover: metaSong.image?.description || '',
          lyrics: '',
        }

        allSongs.push(song)
      })
    )

    playlist.set(allSongs)
  }

  onMount(async () => {
    await setAllSongs()
  })
</script>

<style lang="scss">
  .wrapper {
    height: 100vh;
    width: 100%;

    position: relative;
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-template-rows: 1fr 100px;

    background-color: #cf6b9b;
    color: #363636;

    .bottom {
      grid-column: 1/3;
      position: relative;
      margin-right: 10px;
      margin-bottom: 10px;
    }

    .right {
      margin: 10px;
      position: relative;
      display: flex;
    }

    .left {
      position: relative;
    }
  }
</style>

<div class="wrapper">
  <div class="left">
    <Menu />
  </div>
  <div class="right">
    <Viewer />
    <Panel />
  </div>
  <div class="bottom">
    <Player />
  </div>
</div>
