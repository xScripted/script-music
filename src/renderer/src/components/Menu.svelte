<script lang="ts">
  import { activeSong } from '../scripts/store'
  import heartSVG from './../assets/heart.svg'
  import addSVG from './../assets/add.svg'
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

      .p-title {
        font-size: 30px;
        font-weight: bold;
        color: white;
      }

      .new-playlist,
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

        .icon {
          width: 50px;
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
      width: 100%;
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
    <span class="p-title">Playlists:</span>
    <button class="new-playlist">
      <img src={addSVG} alt="" class="icon" />
      <span>New playlist</span>
    </button>
    <button class="playlist1">
      <img src={heartSVG} alt="" class="icon" />
      <span>Pa ducharme</span>
    </button>
    <button class="empty">
      <!-- if (playlistNumber =< 5) {empty.style.display=`flex`} o algo asi saps,
        playlistNumber = numero de playlists creadas = array con las canciones con
        el que se va a hacer un bucle donde se van a mostrar-->
      <span></span>
    </button>
  </div>
  <div class="cover">
    <img src={$activeSong.cover} alt="" />
  </div>
</div>
