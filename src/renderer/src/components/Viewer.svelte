<script lang="ts">
  import Utilities from '@/components/Utilities.svelte'
  import PlaylistHeader from '@/components/PlaylistHeader.svelte'

  import { panel, songsFiltered } from '@/constants/godStore'
  import type { ISong } from '@interfaces/ISong'
  import Song from '@/components/Song.svelte'

  import Svg from '@/components/Svg.svelte'

  let newSong: boolean = false
  let shrinkHeader: boolean = false
  let songsValue: ISong[] = []

  songsFiltered.subscribe((value) => (songsValue = value))

  const toggleNewSong = () => {
    newSong = !newSong

    panel.update(() => (newSong ? 'Youtube to MP3' : ''))
  }

  const handleScroll = (ev) => {
    shrinkHeader = !!ev.target.scrollTop
  }

  document.addEventListener('click', (ev) => {
    const allSongs = document.querySelectorAll('.song')
    allSongs.forEach((song: HTMLElement) => {
      song.classList.remove('song-active')
    })
  })
</script>

<style lang="scss">
  .viewer {
    position: relative;
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    padding: 25px;

    .utilities {
      width: 100%;
      height: fit-content;
      display: flex;
      justify-content: right;
    }

    .song-list {
      height: 100%;
      overflow: scroll;
      overflow-x: hidden;
      margin-top: 25px;
    }

    .new-song {
      width: 50px;
      height: 50px;

      position: absolute;
      bottom: 15px;
      right: 15px;

      background: none;
      border: none;
      cursor: pointer;
    }
  }
</style>

<div class="viewer g-box">
  <div class="utilities">
    <Utilities />
  </div>

  <PlaylistHeader bind:shrinkHeader />

  <div class="song-list" on:scroll={handleScroll}>
    {#each songsValue as song}
      <Song {song} />
    {/each}
  </div>

  <button class="new-song" on:click={toggleNewSong}>
    <Svg name="plus" />
  </button>
</div>
