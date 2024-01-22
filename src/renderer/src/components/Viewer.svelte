<script lang="ts">
  import Utilities from './Utilities.svelte'

  import { panel, playlistFiltered } from './../scripts/store'
  import type { ISong } from '../../../interfaces/ISong'
  import Song from './Song.svelte'

  import plusSVG from './../assets/plus.svg'
  import homeSVG from './../assets/home.svg'
  import backSVG from './../assets/back.svg'

  let newSong: boolean = false
  let playlistValue: ISong[] = []

  playlistFiltered.subscribe((value) => (playlistValue = value))

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
    grid-template-rows: 60px 175px 1fr;
    padding: 15px 75px;

    overflow: hidden;

    background-color: rgba(255, 255, 255, 0.3);
    border-radius: var(--radius);
    backdrop-filter: blur(10px);

    .fuck-go-back {
      position: absolute;
      top: 15px;
      left: 15px;

      img {
        height: 30px;
      }
    }

    .header {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 25px;

      .color {
        height: 150px;
        width: 150px;
        border-radius: var(--radius);
        background: linear-gradient(330deg, #5b0eeb 0%, #6d5dfc 50%, #8abdff 100%);

        display: flex;
        justify-content: center;
        align-items: center;

        .icon {
          width: 75%;
        }
      }

      .title {
        font-size: 75px;
        font-weight: bolder;
      }
    }

    .song-list {
      padding-top: 75px;
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

<div class="viewer">
  <div class="utilities">
    <div class="fuck-go-back">
      <button class="back">
        <img src={backSVG} alt="" />
      </button>
      <button class="home">
        <img src={homeSVG} alt="" />
      </button>
    </div>
    <Utilities />
  </div>

  <div class="header">
    <div class="color">
      <div class="icon"></div>
    </div>
    <div class="title">Te quiero guapa</div>
  </div>

  <div class="song-list">
    {#each playlistValue as song}
      <Song {song} />
    {/each}
  </div>

  <button class="new-song" on:click={toggleNewSong}>
    <img src={plusSVG} alt="" />
  </button>
</div>
