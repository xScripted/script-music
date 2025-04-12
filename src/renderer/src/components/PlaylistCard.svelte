<script lang="ts">
  import type { IPlaylist } from '@interfaces/IPlaylist'
  import { panel, selectedPlaylistForUpdate, playlists } from '@/constants/godStore'
  import { get } from 'svelte/store'
  import { player } from '@/scripts/player'
  import Svg from './Svg.svelte'

  export let playlist: IPlaylist

  const togglePlaylist = () => {
    playlists.update(() => {
      return get(playlists).map((p: IPlaylist) => {
        if (playlist.title === p.title) {
          p.active = !playlist.active
        }

        player.filter()

        return p
      })
    })
  }

  const playlistEditor = () => {
    panel.update(() => 'Playlist editor')
    selectedPlaylistForUpdate.update(() => playlist)
  }
</script>

<style lang="scss">
  .playlist-card {
    height: 75px;
    width: 100%;

    border: none;
    border-radius: var(--radius);
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    border: 2px solid transparent;

    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;

    overflow: hidden;
    cursor: pointer;

    &.active {
      border: 2px solid var(--colorBrand);
    }

    span {
      width: 100%;
      font-size: 20px;

      display: flex;
      justify-content: left;
      align-items: center;

      padding-left: 20px;
    }

    .photo {
      width: 75px;
      height: 75px;
      overflow: hidden;

      display: flex;
      justify-content: center;
      flex-shrink: 0;

      object-fit: cover;
    }
  }
</style>

<button class="playlist-card" class:active={playlist.active} on:click={togglePlaylist}>
  <img class="photo" src={playlist.image} alt="" />
  <span>{playlist.title}</span>
  <div on:click={playlistEditor}>
    <Svg name="options" height="15" width="15" />
  </div>
</button>
