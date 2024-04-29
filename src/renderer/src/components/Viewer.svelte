<script lang="ts">
  import PlaylistHeader from './PlaylistHeader.svelte'
  import Utilities from './Utilities.svelte'

  import { panel, songsFiltered } from './../scripts/store'
  import type { ISong } from '../../../interfaces/ISong'
  import Song from './Song.svelte'

  import plusSVG from './../assets/plus.svg'
  import homeSVG from './../assets/home.svg'
  import backSVG from './../assets/back.svg'
  import BubbleButton from './BubbleButton.svelte'

  let newSong: boolean = false
  let songsValue: ISong[] = []

  songsFiltered.subscribe((value) => (songsValue = value))

  const toggleNewSong = () => {
    newSong = !newSong

    panel.update(() => (newSong ? 'Youtube to MP3' : ''))
  }
</script>

<style lang="scss">
  .viewer {
    position: relative;
    height: 100%;
    width: 100%;

    display: grid;
    grid-template-rows: 60px 625px 1fr;
    //grid-template-rows: 60px 175px 1fr;
    padding: 20px;

    overflow: hidden;

    .fuck-go-back {
      position: absolute;
      top: 15px;
      left: 15px;

      img {
        height: 30px;
      }
    }

    .song-list {
      //padding-top: 75px;
      height: 100%;
      overflow: scroll;
      overflow-x: hidden;
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

      img {
        width: 100%;
        transition: 0.5s ease;
      }
    }
  }
</style>

<div class="viewer g-box">
  <div class="utilities">
    <Utilities />
  </div>

  <PlaylistHeader />

  <div class="song-list">
    {#each songsValue as song}
      <Song {song} />
    {/each}
  </div>

  <button class="new-song" on:click={toggleNewSong}>
    <img src={plusSVG} alt="" />
  </button>

  <BubbleButton />
</div>
