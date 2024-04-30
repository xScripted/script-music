<script lang="ts">
  import type { IPlaylist } from '@interfaces/IPlaylist'
  import { playlists, panel } from '@/constants/godStore'
  import { get } from 'svelte/store'
  import { player } from '@/scripts/player'

  export let image: string
  export let title: string
  export let active: boolean

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

<button class="card" class:active on:click={togglePlaylist}>
  <img class="photo" src={image} alt="" />
  <span>{title}</span>
  <button on:click={() => panel.update(() => 'Playlist editor')}>...</button>
</button>
