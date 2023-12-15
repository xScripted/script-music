<script lang="ts">
  import { Howl } from 'howler'
  import { get } from 'svelte/store'
  import { playlist } from '../src/scripts/store'
  import InputTag from './components/InputTag.svelte'
  import { onMount } from 'svelte'
  import Header from './components/Header.svelte'
  import Playlist from './components/Playlist.svelte'
  import Player from './components/Player.svelte'

  let url
  let title: string = ''

  let sound
  let path

  const play = async () => {
    title = await window.electron.ipcRenderer.invoke('download-song', url)
    path = await window.electron.ipcRenderer.invoke('get-path')

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

  onMount(async () => {
    const fileNames = await window.electron.ipcRenderer.invoke('get-song-file-names')

    playlist.update(() =>
      fileNames.map((fileName: string) => {
        return fileName
      })
    )
  })
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

<Header />
<Playlist />
<Player />
