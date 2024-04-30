<script lang="ts">
  import { setAllSongs } from '@/scripts/generic'
  import { tags, path, playlists } from '@/constants/godStore'
  import Player from '@/components/Player.svelte'
  import Viewer from '@/components/Viewer.svelte'
  import Panel from '@/components/Panel.svelte'
  import Menu from '@/components/Menu.svelte'
  import { onMount } from 'svelte'
  import type { ITag } from '@interfaces/ITag'
  import type { IPlaylist } from '@interfaces/IPlaylist'

  let HTMLAppWrapper: HTMLElement

  const getTags = () => {
    tags.update(() => {
      const tagsFromDB: ITag[] = JSON.parse(window.localStorage.getItem('tags') || '[]')

      return tagsFromDB
    })
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
  @import './sass/global.scss';

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
    color: var(--colorText);

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
