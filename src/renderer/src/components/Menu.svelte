<script lang="ts">
  import { activeSong } from '../scripts/store'
</script>

<style lang="scss">
  .menu {
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .playlists {
      height: fit-content;
      width: 100%;

      display: flex;
      flex-direction: column;
      padding-top: 10px;
      padding-left: 10px;
      gap: 10px;

      .p-title {
        font-size: 30px;
        font-weight: bold;
        color: white;
      }

      .new-playlist,
      .playlist1,
      .playlist2,
      .playlist3 {
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

        .icon {
          width: 50px;
        }
      }

      .playlist2,
      .playlist3 {
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
      <span>New playlist</span>
      <img src="" alt="" class="icon" />
    </button>
    <button class="playlist1">
      <div class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
          ><g fill="#ffffff"
            ><path
              fill-rule="evenodd"
              d="M12 1.25a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0V2a.75.75 0 0 1 .75-.75ZM1.25 12a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1-.75-.75Zm18 0a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1-.75-.75ZM12 19.25a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 1 .75-.75Z"
              clip-rule="evenodd"
              opacity=".8"
            /><path
              d="M5.47 5.47a.75.75 0 0 1 1.06 0l.344.343a.75.75 0 0 1-1.061 1.06L5.47 6.53a.75.75 0 0 1 0-1.06Zm13.06 0a.75.75 0 0 1 0 1.06l-.343.344a.75.75 0 0 1-1.06-1.061l.343-.343a.75.75 0 0 1 1.06 0ZM6.873 17.127a.75.75 0 0 1 0 1.06l-.343.343a.75.75 0 0 1-1.06-1.06l.343-.343a.75.75 0 0 1 1.06 0Zm10.254 0a.75.75 0 0 1 1.06 0l.343.343a.75.75 0 1 1-1.06 1.06l-.343-.343a.75.75 0 0 1 0-1.06Z"
              opacity=".5"
            /><path
              d="M7 11.06c0 2.542 2.01 3.897 3.48 5.11c.52.427 1.02.83 1.52.83s1-.403 1.52-.83c1.47-1.213 3.48-2.568 3.48-5.11c0-2.543-2.75-4.346-5-1.902c-2.25-2.444-5-.64-5 1.902Z"
            /></g
          ></svg
        >
      </div>
      <span>Pa ducharme</span>
    </button>
    <button class="playlist2">
      <img src="" alt="" class="icon" />
      <span></span>
    </button>
    <button class="playlist3">
      <img src="" alt="" class="icon" />
      <span></span>
    </button>
  </div>
  <div class="cover">
    <img src={$activeSong.cover} alt="" />
  </div>
</div>
