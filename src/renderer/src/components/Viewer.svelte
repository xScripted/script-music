<script lang="ts">
  import Utilities from './Utilities.svelte'
  import Tag from './Tag.svelte'
  import { panel, playlistFiltered, playlist, activeSong } from './../scripts/store'
  import type { ISong } from '../../../interfaces/ISong'
  import { Howl, Howler } from 'howler'
  import { onMount } from 'svelte'
  import { get } from 'svelte/store'
  import { player } from '../scripts/player'

  import addSVG from './../assets/add.svg'
  import addQueueSVG from './../assets/queue.svg'
  import brushSVG from './../assets/brush.svg'
  import plusSVG from './../assets/plus.svg'
  import homeSVG from './../assets/home.svg'
  import backSVG from './../assets/back.svg'

  let newSong: boolean = false
  let playlistValue: ISong[] = []
  let path = ''

  playlistFiltered.subscribe((value) => (playlistValue = value))

  const toggleNewSong = () => {
    newSong = !newSong

    panel.update(() => (newSong ? 'Youtube to MP3' : ''))
  }

  onMount(async () => {
    path = await window.electron.ipcRenderer.invoke('get-path')
  })
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

      .song-row {
        display: grid;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 15px;
        position: relative;

        grid-template-columns: 75px 1fr 1fr 100px;
        border-radius: var(--radius);
        transition: 0.3s ease;
        gap: 10px;
        cursor: pointer;

        .cover {
          height: 75px;
          width: 75px;
          border-radius: var(--radius);
          object-fit: cover;
        }

        .details {
          display: flex;
          flex-direction: column;

          .song-title {
            font-size: 22px;
          }

          .singer {
            font-weight: lighter;
            font-size: 18px;
          }
        }

        .tags {
          display: flex;
          justify-self: end;
          gap: 10px;
        }

        .more {
          display: none;
          gap: 10px;
        }

        &:hover {
          background-color: rgba(255, 255, 255, 0.35);
          transition: 0.3s ease;

          .more {
            display: flex;
          }
        }
      }
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

      &.active {
        img {
          transform: rotate(45deg);
          transition: 0.5s ease;
        }
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
    <!-- Overflow: scroll para que solo se scrolleen las canciones -->

    {#each playlistValue as song}
      <div class="song-row">
        <img src={song.cover} class="cover" alt="" />
        <button class="details" on:click={() => player.play(song.fileName)}>
          <span class="song-title">{song.title}</span>
          <span class="singer">{song.artist}</span>
        </button>
        <div class="tags">
          {#each song.tags as tag}
            <Tag {tag} />
          {/each}
        </div>
        <div class="more">
          <img src={brushSVG} alt="" />
          <img src={addQueueSVG} alt="" />
          <img src={addSVG} alt="" />
        </div>
      </div>
    {/each}
  </div>

  <button class="new-song" class:active={newSong} on:click={toggleNewSong}>
    <img src={plusSVG} alt="" />
  </button>
</div>
