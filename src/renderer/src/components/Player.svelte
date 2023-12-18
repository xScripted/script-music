<script lang="ts">
  import { activeSong } from '../scripts/store'
</script>

<style lang="scss">
  .player {
    height: 100%;
    width: 100%;

    display: grid;
    align-items: center;

    background-color: rgba(255, 255, 255, 0.7);
    border-radius: var(--radius);
    padding: 10px;

    .details {
      display: flex;
      flex-direction: column;

      .song-title {
        font-size: 22px;
      }

      .artist {
        font-weight: lighter;
        font-size: 18px;
      }
    }
  }
</style>

<div class="player">
  <div class="details">
    <div class="song-title">{$activeSong.title}</div>
    <div class="artist">{$activeSong.artist}</div>
  </div>

  <div class="control">
    <div class="shuffle"></div>
    <div class="previous"></div>
    <div class="play"></div>
    <div class="next"></div>
    <div class="repeat"></div>
  </div>

  <div class="panel">
    <div class="reverb"></div>
    <div class="nightcore"></div>
    <div class="queue"></div>
  </div>
</div>
