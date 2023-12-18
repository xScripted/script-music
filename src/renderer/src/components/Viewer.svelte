<script lang="ts">
  import Utilities from './Utilities.svelte'
  import addSVG from './../assets/add.svg'
  import addQueueSVG from './../assets/queue.svg'
  import brushSVG from './../assets/brush.svg'
  import plusSVG from './../assets/plus.svg'
  import { panel, playlist, activeSong } from './../scripts/store'
  import type { ISong } from '../../../interfaces/ISong'
  import { Howl, Howler } from 'howler'
  import { onMount } from 'svelte'
  import { get } from 'svelte/store'

  let newSong: boolean = false
  let playlistValue: ISong[] = []
  let path = ''

  playlist.subscribe((value) => (playlistValue = value))

  const toggleNewSong = () => {
    newSong = !newSong

    panel.update(() => (newSong ? 'Youtube to MP3' : ''))
  }

  const playSong = (fileName: string) => {
    var sound = new Howl({
      src: [path + fileName],
      rate: 0.85,
      volume: 0.2,
    })
    sound.play()

    const song = get(playlist).find((song: ISong) => song.fileName === fileName)

    activeSong.update(() => song)
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
    padding: 75px;

    background-color: rgba(255, 255, 255, 0.3);
    border-radius: var(--radius);
    backdrop-filter: blur(10px);

    .fuck-go-back {
      position: absolute;
      top: 15px;
      left: 15px;

      .back,
      .forth {
        height: 25px;
        width: 25px;
        border: none;
        border-radius: 50px;
        background-color: #363636;
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
      margin-top: 75px;

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
          .tag {
            height: 25px;
            width: 75px;

            top: 0;
            bottom: 0;
            right: 15px;
            margin: auto;
            position: absolute;

            background-color: #6d5dfc;
            border-radius: 5px;
            transition: 0.3s ease;
          }
        }

        .more {
          display: none;
          gap: 10px;
        }

        &:hover {
          background-color: rgba(255, 255, 255, 0.35);
          transition: 0.3s ease;

          .tags {
            .tag {
              transition: 0.3s ease;
              width: 25px;
              transform: translateX(-105px);
            }
          }

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
      <button class="back"></button>
      <button class="forth"></button>
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
      <div class="song-row">
        <img src={song.cover} class="cover" alt="" />
        <div class="details" on:click={() => playSong(song.fileName)}>
          <span class="song-title">{song.title}</span>
          <span class="singer">{song.artist}</span>
        </div>
        <div class="tags">
          <div class="tag"></div>
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
