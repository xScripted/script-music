<script lang="ts">
  import type { IPlaylist } from '@interfaces/IPlaylist'
  import { panel, selectedPlaylistForUpdate } from '@/constants/godStore'
  import { get } from 'svelte/store'
  import { player } from '@/scripts/player'
  import Svg from './Svg.svelte'

  export let playlist: IPlaylist

  const togglePlaylist = () => {
    playlists.update(() => {
      return get(playlists).map((playlist: IPlaylist) => {
        if (playlist.title === title) {
          playlist.active = !active
        }

        player.filter()

        return playlist
      })
    })
  }

  const playlistEditor = () => {
    panel.update(() => 'Playlist editor')
    selectedPlaylistForUpdate.update(() => playlist)
  }
</script>

<style lang="scss">
  .card {
    height: 75px;
    width: 100%;

    border: none;
    border-radius: var(--radius);
    background-color: rgba(255, 255, 255, 0.3);
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

<button class="card" class:active={playlist.active} on:click={togglePlaylist}>
  <img class="photo" src={playlist.image} alt="" />
  <span>{playlist.title}</span>
  <button on:click={playlistEditor}>
    <Svg name="options" height="15" width="15" />
  </button>
</button>
