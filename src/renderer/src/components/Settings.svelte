<script lang="ts">
  import { onMount } from 'svelte'

  let bgImage

  const updateBG = () => {
    // Guardamos la imagen nueva en el localstorage
    window.localStorage.setItem('bg', bgImage)

    // Cogemos el div contenedor del App.svelte
    const appWrapper: HTMLElement = document.querySelector('.app-wrapper')

    // Le cambiamos el backgroundImage
    appWrapper.style.backgroundImage = `url(${bgImage})`
  }

  onMount(() => {
    const savedBG = window.localStorage.getItem('bg')
    bgImage = savedBG ? savedBG : ''
  })
</script>

<style lang="scss">
  .settings {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px 0;

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }

  .input[type='number'] {
    padding: 10px;
  }
</style>

<div class="settings">
  <div class="input-group">
    <h4>Background image</h4>
    <input class="input" type="text" bind:value={bgImage} on:input={updateBG} placeholder="URL" />
  </div>

  <div class="input-group">
    <h4>Nightcore:</h4>
    <input class="input" type="range" />
    <h4>Slowed:</h4>
    <input class="input" type="range" />
  </div>

  <div class="input-group">
    <h3>DJ mode</h3>
    <h4>Start</h4>
    <input class="input" type="number" />
    <h4>Finish</h4>
    <input class="input" type="number" />
  </div>

  <div class="input-group">
    <h4>Song delay</h4>
    <input class="input" type="number" />
    <span>s</span>
  </div>
</div>
