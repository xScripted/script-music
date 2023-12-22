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
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px 0;
  }
</style>

<div class="settings">
  <div class="input-group">
    <h4>Background image</h4>
    <input class="input" type="text" bind:value={bgImage} on:input={updateBG} placeholder="URL" />
  </div>
</div>
