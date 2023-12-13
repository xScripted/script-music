<script lang="ts">
  import { Howl } from 'howler'
  import { get } from 'svelte/store'
  import { store, test } from '../src/scripts/store'

  let url
  let data: any = {}

  let sound
  let path

  const play = async () => {
    data = await window.electron.ipcRenderer.invoke('download-song', url)
    console.log(store.playlist)
    path = await window.electron.ipcRenderer.invoke('get-path')

    test.update(() => {
      return 'bbbbbbb'
    })

    console.log(get(test), test)

    setTimeout(() => {
      sound = new Howl({
        src: [`${path}/${data.title}.mp3`],
        rate: 1.2,
        volume: 0.3,
      })
      sound.play()
    }, 1000)
  }

  const pause = () => sound.pause()
</script>

<style lang="scss">
  * {
    padding: 10px;
    margin: 10px;
  }

  h1 {
    height: 100px;
  }
</style>

<h1>#YOUTUBE TO NIGHTCORE <br /> {data.title}</h1>
<input type="text" bind:value={url} placeholder="https://www.youtube.com/watch?v=GmOxB-gXhs4" />

<button on:click={play}> Download song! </button>
<button on:click={pause}> Pause </button>
<button on:click={() => sound.play()}> Resume </button>

<h2>{$test}</h2>
