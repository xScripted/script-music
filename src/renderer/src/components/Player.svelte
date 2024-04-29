<script lang="ts">
  import ProgressBar from '@/components/ProgressBar.svelte'
  import { activeSong, isPaused, panel, newVolume, loop, shuffle, newRate, djMode } from '@/constants/godStore'
  import { player } from '@/scripts/player'

  import Svg from '@/components/Svg.svelte'

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

  const storedVolume = JSON.parse(window.localStorage.getItem('volume') || '""')

  volumeValue = storedVolume
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
      height: 100%;
      width: fit-content;

      display: flex;
      justify-content: space-evenly;
      justify-self: center;
      align-items: center;

      gap: 10px;
    }

    .panel {
      height: 100%;
      width: fit-content;
      display: flex;
      justify-content: space-evenly;
      justify-self: end;
      align-items: center;
      gap: 10px;

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

<div class="player g-box">
  <div class="progress-bar">
    <ProgressBar />
  </div>

  <div class="details">
    <div class="song-title">{$activeSong.title}</div>
    <div class="artist">{$activeSong.artist}</div>
  </div>

  <div class="control">
    <button on:click={player.updateShuffle}>
      <Svg name="shuffle" />
    </button>
    <button on:click={() => player.back()}>
      <Svg name="previous" />
    </button>
    <div class="play-pause">
      {#if isPausedValue}
        <button on:click={() => player.resume()}>
          <Svg name="play" />
        </button>
      {:else}
        <button on:click={() => player.pause()}>
          <Svg name="pause" />
        </button>
      {/if}
    </div>
    <button on:click={() => player.forth()}>
      <Svg name="next" />
    </button>
    <button on:click={player.updateLoop}>
      <Svg name="loop" />
    </button>
  </div>

  <div class="panel">
    <button on:click={player.updateSlowed} class="utility" class:active={rateValue < 1}>
      <Svg name="slowed" />
    </button>
    <button on:click={player.updateNightcore} class="utility" class:active={rateValue > 1}>
      <Svg name="nightcore" />
    </button>
    <button class="utility" class:active={djModeValue} on:click={() => djMode.update(() => !djModeValue)}>
      <Svg name="dj" />
    </button>
    <button
      class="utility"
      class:active={panelValue === 'Queue'}
      on:click={() => panel.update((value) => (value === 'Queue' ? '' : 'Queue'))}
    >
      <Svg name="queue" />
    </button>

    <div class="volume">
      <button class="speaker" on:click={player.toggleMute}>
        {#if volumeValue === 0}
          <Svg name="muted" />
        {:else if volumeValue <= 0.25}
          <Svg name="volumeDown" />
        {:else}
          <Svg name="volumeUp" />
        {/if}
      </button>
      <input
        type="range"
        class="volume-bar"
        min="0"
        max="0.5"
        step="0.01"
        value={volumeValue}
        on:input={(ev) => player.updateVolume(ev.target.value)}
      />
    </div>
  </div>
</div>
