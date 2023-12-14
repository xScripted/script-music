<script lang="ts">
  import { Howl } from 'howler'
  import { get } from 'svelte/store'
  import { test } from '../src/scripts/store'

  let url
  let title: string = ''

  let sound
  let path
  let files = []

  const play = async () => {
    title = await window.electron.ipcRenderer.invoke('download-song', url)
    path = await window.electron.ipcRenderer.invoke('get-path')
    files = await window.electron.ipcRenderer.invoke('get-song-file-names')

    test.update(() => {
      return 'bbbbbbb'
    })

    console.log(get(test), test)

    await window.electron.ipcRenderer.invoke('write-meta-data', {
      fileName: title,
      metaData: {
        title: 'Tomorrow',
        artist: 'Kevin Penkin',
        album: 'xddddd',
        APIC: './example/mia_cover.jpg',
        TRCK: '27',
      },
    })

    setTimeout(async () => {
      console.log('Meta-data: ', await window.electron.ipcRenderer.invoke('read-meta-data', title))
      sound = new Howl({
        src: [`${path}/${title}.mp3`],
        rate: 1.2,
        volume: 0.3,
      })
      sound.play()
    }, 5000)
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

<h1>#YOUTUBE TO NIGHTCORE <br /> {title}</h1>
<input type="text" bind:value={url} placeholder="https://www.youtube.com/watch?v=GmOxB-gXhs4" />

<button on:click={play}> Download song! </button>
<button on:click={pause}> Pause </button>
<button on:click={() => sound.play()}> Resume </button>

<h2>{$test}</h2>

{#each files as file}
  <h2>{file}</h2>
  <br />
{/each}
