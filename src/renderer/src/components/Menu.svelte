<script lang="ts">
  import { activeSong } from '@/constants/godStore'
  import Svg from '@/components/Svg.svelte'
  import PlaylistCard from '@/components/PlaylistCard.svelte'
  let playlistNumber: number = 1 //array.length de las playlists que hay

  let createPlaylist = () => {}
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
      height: fit-content;
      width: 100%;

      display: flex;
      flex-direction: column;
      gap: 10px;

      .new-playlist {
        padding: 20px 0;
        text-align: center;

        .p-title {
          font-size: 30px;
          font-weight: bold;
          color: white;
        }
      }

      .playlist1,
      .empty {
        height: 75px;
        width: 100%;

        border: none;
        background-color: white;
        border-radius: var(--radius);
        text-align: left;

        display: flex;
        justify-content: space-evenly;
        align-items: center;

        span {
          font-weight: bold;
          font-size: 20px;
        }
      }

      .playlist1 {
        background: linear-gradient(330deg, #5b0eeb 0%, #6d5dfc 50%, #8abdff 100%);
        color: white;
      }

      .empty {
        background-color: rgba(255, 255, 255, 0.3);
      }
    }

    .cover {
      width: 96%;
      overflow: hidden;
      border-radius: var(--radius);
      aspect-ratio: 1/1;

      position: absolute;
      bottom: 10px;

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
      <Svg name="plus2" />
    </div>

    <!-- Crear un array con las playlists que hay y hacer un #each-->
    <button class="playlist1">
      <Svg name="heart" />
      <span>Pa ducharme</span>
    </button>

    <PlaylistCard />

    <!-- playlistNumber = numero de playlists creadas = array con las canciones con
      el que se va a hacer un bucle donde se van a mostrar-->
    {#if playlistNumber <= 5}
      <div class="empty" />
    {/if}
  </div>

  {#if $activeSong.fileName}
    <div class="cover">
      <img src={$activeSong.cover} alt="" />
    </div>
  {/if}
</div>
