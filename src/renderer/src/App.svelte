<script lang="ts">
  import { songs, songsFiltered, tags, path, playlists } from './scripts/store'
  import Player from './components/Player.svelte'
  import Viewer from './components/Viewer.svelte'
  import Panel from './components/Panel.svelte'
  import Menu from './components/Menu.svelte'
  import { onMount } from 'svelte'
  import type { ISong } from '../../interfaces/ISong'
  import type { ITag } from '../../interfaces/ITag'
  import { player } from './scripts/player'
  import type { IPlaylist } from '../../interfaces/IPlaylist'

  let HTMLAppWrapper: HTMLElement

  const getTags = () => {
    tags.update(() => {
      const tagsFromDB: ITag[] = JSON.parse(window.localStorage.getItem('tags') || '[]')

      return tagsFromDB
    })
  }

  const setAllSongs = async () => {
    const fileNames: string[] = await window.electron.ipcRenderer.invoke('get-song-file-names')

    let allSongs: ISong[] = []
    let tagsFromSongs: any = new Set()

    await Promise.all(
      fileNames.map(async (fileName: string) => {
        let metaSong = await window.electron.ipcRenderer.invoke('read-meta-data', fileName)

        const song: ISong = {
          fileName: fileName,
          title: metaSong.title || fileName,
          artist: metaSong.artist || '',
          tags: JSON.parse(metaSong.genre || '[]'),
          date: metaSong.date,
          cover: metaSong.subtitle || '',
          lyrics: '',
        }

        for (let tag of song.tags) tagsFromSongs.add(tag)

        allSongs.push(song)
      })
    )

    for (let tag of tagsFromSongs) {
      player.createTag(tag, '#FFFFFF')
    }

    songs.set(allSongs)
    songsFiltered.set(allSongs)
  }

  const getPlaylists = () => {
    playlists.update(() => {
      const playlistsFromDB: IPlaylist[] = JSON.parse(window.localStorage.getItem('playlists') || '[]')

      return playlistsFromDB
    })
  }

  onMount(async () => {
    const pathValue = await window.electron.ipcRenderer.invoke('get-path')

    path.update(() => pathValue)

    getTags()
    getPlaylists()
    await setAllSongs()

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

    background-color: #000000;
    background-image: url('https://wallpapers.com/images/featured/aesthetic-cloud-background-05bsl7m2e5bh01ki.jpg');
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
