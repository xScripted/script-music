<script lang="ts">
  import { playlist, playlistFiltered, tags, path } from './scripts/store'
  import Player from './components/Player.svelte'
  import Viewer from './components/Viewer.svelte'
  import Panel from './components/Panel.svelte'
  import Menu from './components/Menu.svelte'
  import { onMount } from 'svelte'
  import type { ISong } from '../../interfaces/ISong'
  import type { ITag } from '../../interfaces/ITag'

  let HTMLAppWrapper: HTMLElement

  const getTags = () => {
    tags.update(() => {
      const tagsFromDB: ITag[] = JSON.parse(window.localStorage.getItem('tags') || '[]')

      return tagsFromDB.map((tag: ITag) => {
        tag.active = true

        return tag
      })
    })
  }

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
          tags: JSON.parse(metaSong.genre || '[]'),
          cover: metaSong.subtitle || '',
          lyrics: '',
        }

        allSongs.push(song)
      })
    )

    playlist.set(allSongs)
    playlistFiltered.set(allSongs)
  }

  onMount(async () => {
    const pathValue = await window.electron.ipcRenderer.invoke('get-path')

    path.update(() => pathValue)

    await setAllSongs()
    getTags()

    const savedBG = window.localStorage.getItem('bg')

    if (savedBG) HTMLAppWrapper.style.backgroundImage = `url(${savedBG})`
  })
</script>

<style lang="scss">
  .app-wrapper {
    //font-family: 'Outfit', sans-serif;

    height: 100vh;
    width: 100%;

    position: relative;
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-template-rows: 1fr 125px;

    background-color: #cf6b9b;
    background-image: url('https://wallpapers.com/images/hd/cute-pikachu-pokemon-ynbgo9vzeaemo126.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    color: #363636;

    .bottom {
      grid-column: 1/3;
      position: relative;
      margin: 0 10px 10px 10px;
    }

    .right {
      margin: 10px;
      position: relative;
      display: flex;
      min-height: 0;
    }

    .left {
      position: relative;
    }
  }
</style>

<div class="app-wrapper" bind:this={HTMLAppWrapper}>
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
