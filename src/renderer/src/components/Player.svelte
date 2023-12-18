<script lang="ts">
  import { activeSong } from '../scripts/store'

  import shuffleSVG from './../assets/shuffle.svg'
  import previousSVG from './../assets/previous.svg'
  import nextSVG from './../assets/next.svg'
  import playSVG from './../assets/play2.svg'
  import pauseSVG from './../assets/pause2.svg'
  import repeatSVG from './../assets/repeat.svg'
  import nightcoreSVG from './../assets/nightcore.svg'
  import slowedSVG from './../assets/slowed.svg'
  import djSVG from './../assets/dj1.svg'
  import queueSVG from './../assets/queue.svg'
</script>

<style lang="scss">
  .player {
    height: 100%;
    width: 100%;

    padding: 10px;
    padding-top: 0px;
    display: inline-grid;
    justify-content: center;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;

    background-color: rgba(255, 255, 255, 0.3);
    border-radius: var(--radius);
    backdrop-filter: blur(10px);

    .progress {
      width: 100%;
      grid-column: 1/4;

      display: flex;
      justify-content: space-around;
      align-items: center;
      gap: 10px;

      .progress-bar {
        background-color: white;
        width: 100%;
        height: 10px;
        border-radius: 25px;
        overflow: hidden;

        .song-progress {
          background: linear-gradient(330deg, #5b0eeb 0%, #6d5dfc 50%, #8abdff 100%);
          height: 100%;
          border-radius: 25px;
          transform: translateX(-500px);
        }
      }
    }

    .details {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-self: start;

      .song-title {
        font-size: 25px;
        font-weight: 600;
      }

      .artist {
        font-weight: lighter;
        width: 100%;
        font-size: 18px;
      }
    }

    .control {
      height: fit-content;
      width: fit-content;

      display: flex;
      justify-content: space-evenly;
      justify-self: center;
      align-items: center;
      gap: 10px;

      img {
        width: 50px;
      }

      .shuffle,
      .repeat {
        width: 35px;
      }
    }

    .panel {
      height: 100%;
      width: fit-content;
      display: flex;
      justify-content: space-evenly;
      justify-self: end;
      align-items: center;
      gap: 10px;

      img {
        width: 25px;
      }
    }
  }
</style>

<div class="player">
  <div class="progress">
    <div class="current-min">0:00</div>
    <div class="progress-bar">
      <div class="song-progress"></div>
    </div>
    <div class="duration">3:48</div>
  </div>

  <div class="details">
    <div class="song-title">{$activeSong.title}</div>
    <div class="artist">{$activeSong.artist}</div>
  </div>

  <div class="control">
    <img src={shuffleSVG} alt="" class="shuffle" />
    <img src={previousSVG} alt="" class="previous" />
    <div class="play-pause">
      <img src={playSVG} alt="" class="play" />
      <!--<img src={pauseSVG} alt="" class="pause" />-->
    </div>
    <img src={nextSVG} alt="" class="next" />
    <img src={repeatSVG} alt="" class="repeat" />
  </div>

  <div class="panel">
    <img src={slowedSVG} alt="" class="slowed" />
    <img src={nightcoreSVG} alt="" class="nightcore" />
    <img src={queueSVG} alt="" class="queue" />
    <img src={djSVG} alt="" class="dj" />
  </div>
</div>
