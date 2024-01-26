<script lang="ts">
  import { onMount } from 'svelte'
  import { nightRate, slowRate, djModeStart, djModeFinish } from '../scripts/store'
  import { get } from 'svelte/store'
  import { player } from '../scripts/player'

  let bgImage
  let slowValue
  let nightValue
  let djModeStartValue
  let djModeFinishValue

  slowRate.subscribe((value) => (slowValue = value))
  nightRate.subscribe((value) => (nightValue = value))
  djModeStart.subscribe((value) => (djModeStartValue = value))
  djModeFinish.subscribe((value) => (djModeFinishValue = value))

  const updateBG = () => {
    // Guardamos la imagen nueva en el localstorage
    window.localStorage.setItem('bg', bgImage)

    // Cogemos el div contenedor del App.svelte
    const appWrapper: HTMLElement = document.querySelector('.app-wrapper')

    // Le cambiamos el backgroundImage
    appWrapper.style.backgroundImage = `url(${bgImage})`
  }

  //el rate no se actualiza al instante

  const updateNightcore = (event) => {
    nightRate.update(() => event.target.value)
    window.localStorage.setItem('nightValue', nightValue)

    player.updateNightcore()
  }

  const updateSlowed = (event) => {
    slowRate.update(() => event.target.value)
    window.localStorage.setItem('slowValue', slowValue)

    player.updateSlowed()
  }

  const updateDjModeStart = (event) => {
    djModeStart.update(() => event.target.value)
    window.localStorage.setItem('djModeStart', djModeStartValue)
  }

  const updateDjModeFinish = (event) => {
    djModeFinish.update(() => event.target.value)
    window.localStorage.setItem('djModeFinish', djModeFinishValue)
  }

  onMount(() => {
    const savedBG = window.localStorage.getItem('bg')
    bgImage = savedBG ? savedBG : ''

    const savedNightValue: any = window.localStorage.getItem('nightValue') || get(nightRate)
    nightRate.update(() => savedNightValue)

    const savedSlowValue: any = window.localStorage.getItem('slowValue') || get(slowRate)
    slowRate.update(() => savedSlowValue)

    djModeStart.update(() => Number(window.localStorage.getItem('djModeStart') || get(djModeStart)))
    djModeFinish.update(() => Number(window.localStorage.getItem('djModeFinish') || get(djModeFinish)))
  })
</script>

<style lang="scss">
  .settings {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .input-group {
      display: flex;
      flex-direction: column;
      //gap: 10px;

      .title {
        display: flex;
        gap: 10px;
      }

      .dj {
        display: flex;
        justify-content: space-around;

        .start,
        .finish {
          width: 100%;
        }
      }
    }
  }

  .input[type='number'] {
    width: 50%;
    padding: 10px;
  }
</style>

<div class="settings">
  <div class="input-group">
    <h4>Background image</h4>
    <input class="input" type="text" bind:value={bgImage} on:input={updateBG} placeholder="URL" />
  </div>

  <div class="input-group">
    <div class="title">
      <h4>Nightcore:</h4>
      <div class="nightValue">{nightValue}</div>
    </div>
    <input class="input" type="range" on:input={updateNightcore} value={nightValue} min="1" max="2" step="0.1" />

    <div class="title">
      <h4>Slowed:</h4>
      <div class="slowValue">{slowValue}</div>
    </div>
    <input class="input" type="range" on:input={updateSlowed} value={slowValue} min="0.1" max="1" step="0.1" />
  </div>

  <div class="input-group">
    <h3>DJ mode</h3>
    <div class="dj">
      <div class="start">
        <h4>Start:</h4>
        <input class="input" type="number" on:input={updateDjModeStart} value={djModeStartValue} min="0" max="50" />
        <span>%</span>
      </div>

      <div class="finish">
        <h4>Finish:</h4>
        <input class="input" type="number" on:input={updateDjModeFinish} value={djModeFinishValue} min="51" max="100" />
        <span>%</span>
      </div>
    </div>
  </div>

  <div class="input-group">
    <h4>Song delay:</h4>
    <div class="delay">
      <input class="input" type="number" />
      <span>s</span>
    </div>
  </div>
</div>
