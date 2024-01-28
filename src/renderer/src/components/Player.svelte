<script lang="ts">
  import ProgressBar from './ProgressBar.svelte'
  import { activeSong, isPaused, panel, newVolume, loop, shuffle, newRate, djMode } from '../scripts/store'
  import { player } from '../scripts/player'

  import shuffleSVG from './../assets/shuffle.svg'
  import previousSVG from './../assets/previous.svg'
  import nextSVG from './../assets/next.svg'
  import playSVG from './../assets/play.svg'
  import pauseSVG from './../assets/pause.svg'
  import loopSVG from './../assets/repeat.svg'
  import nightcoreSVG from './../assets/nightcore.svg'
  import slowedSVG from './../assets/slowed.svg'
  import djSVG from './../assets/dj.svg'
  import queueSVG from './../assets/queue.svg'
  import mutedSVG from './../assets/muted.svg'
  import volumeUpSVG from './../assets/volumeUp.svg'
  import volumeDownSVG from './../assets/volumeDown.svg'

  let isPausedValue
  let shuffleValue
  let volumeValue
  let panelValue
  let loopValue
  let rateValue
  let djModeValue

  isPaused.subscribe((value) => (isPausedValue = value))
  panel.subscribe((value) => (panelValue = value))
  loop.subscribe((value) => (loopValue = value))
  shuffle.subscribe((value) => (shuffleValue = value))
  newRate.subscribe((value) => (rateValue = value))
  newVolume.subscribe((value) => (volumeValue = value))
  djMode.subscribe((value) => (djModeValue = value))
</script>

<style lang="scss">
  .player {
    height: 100%;
    width: 100%;

    padding: 15px;
    padding-top: 10px;
    display: inline-grid;
    justify-content: center;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;

    background-color: rgba(255, 255, 255, 0.3);
    border-radius: var(--radius);
    backdrop-filter: blur(10px);

    .progress-bar {
      width: 100%;
      grid-column: 1/5;
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

      .secondary {
        width: 35px;
        opacity: 0.5;

        &.active {
          opacity: 1;
        }
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

      button {
        display: flex;
        align-items: center;
      }

      .utility {
        opacity: 0.5;

        &.active {
          opacity: 1;
        }
      }

      .volume {
        display: flex;
        justify-content: space-around;
        align-items: center;
        opacity: 1;
        gap: 10px;
      }
    }
  }
</style>

<div class="player">
  <div class="progress-bar">
    <ProgressBar />
  </div>

  <div class="details">
    <div class="song-title">{$activeSong.title}</div>
    <div class="artist">{$activeSong.artist}</div>
  </div>

  <div class="control">
    <button on:click={player.updateShuffle}>
      <img src={shuffleSVG} alt="" class="secondary" class:active={shuffleValue} />
    </button>
    <button on:click={() => player.back()}>
      <img src={previousSVG} alt="" class="previous" />
    </button>
    <div class="play-pause">
      {#if isPausedValue}
        <button on:click={() => player.resume()}>
          <img src={playSVG} alt="" class="play" />
        </button>
      {:else}
        <button on:click={() => player.pause()}>
          <img src={pauseSVG} alt="" class="pause" />
        </button>
      {/if}
    </div>
    <button on:click={() => player.forth()}>
      <img src={nextSVG} alt="" class="next" />
    </button>
    <button on:click={player.updateLoop}>
      <img src={loopSVG} alt="" class="secondary" class:active={loopValue} />
    </button>
  </div>

  <div class="panel">
    <button on:click={player.updateSlowed} class="utility" class:active={rateValue < 1}>
      <img src={slowedSVG} alt="" />
    </button>
    <button on:click={player.updateNightcore} class="utility" class:active={rateValue > 1}>
      <img src={nightcoreSVG} alt="" />
    </button>
    <button class="utility" class:active={djModeValue} on:click={() => djMode.update(() => !djModeValue)}>
      <img src={djSVG} alt="" />
    </button>
    <button
      class="utility"
      class:active={panelValue === 'Queue'}
      on:click={() => panel.update((value) => (value === 'Queue' ? '' : 'Queue'))}
    >
      <img src={queueSVG} alt="" />
    </button>

    <div class="volume">
      <button class="speaker" on:click={player.toggleMute}>
        {#if volumeValue === 0}
          <img src={mutedSVG} alt="" />
        {:else if volumeValue <= 0.25}
          <img src={volumeDownSVG} alt="" />
        {:else}
          <img src={volumeUpSVG} alt="" />
        {/if}
      </button>
      <input type="range" class="volume-bar" min="0" max="0.5" step="0.01" value={volumeValue} on:input={player.updateVolume} />
    </div>
  </div>
</div>
