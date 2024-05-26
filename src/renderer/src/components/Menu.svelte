<script lang="ts">
  import { activeSong, panel } from '@/constants/godStore'
  import Svg from '@/components/Svg.svelte'
  import PlaylistCard from '@/components/PlaylistCard.svelte'
  import { playlists } from '@/constants/godStore'
  import type { IPlaylist } from '@interfaces/IPlaylist'

  let createPlaylist = () => {}

  let playlistsValue: IPlaylist[]

  playlists.subscribe((value) => (playlistsValue = value))
</script>

<style lang="scss">
  .menu {
    height: 100%;
    width: 100%;
    padding: 10px 0 10px 10px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .playlists {
      height: 100%;
      width: 100%;

      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 10px;
      overflow-y: scroll;

      .new-playlist {
        padding: 20px 0;
        text-align: center;
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        .p-title {
          font-size: 30px;
          font-weight: bold;
        }

        .add {
          display: flex;
          align-items: center;
        }
      }
    }

    .cover {
      width: 100%;
      height: 50%;
      overflow: hidden;
      border-radius: var(--radius);
      aspect-ratio: 1/1;

      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>

<div class="menu">
  <div class="playlists">
    <div class="new-playlist">
      <span class="p-title">Playlists</span>
      <button class="add" on:click={() => panel.update(() => 'Playlist creator')}>
        <Svg name="plus2" />
      </button>
    </div>

    {#each playlistsValue as playlist}
      <PlaylistCard {playlist} />
    {/each}
  </div>

  {#if $activeSong.fileName}
    <div class="cover">
      <img src={$activeSong.cover} alt="" />
    </div>
  {/if}
</div>
