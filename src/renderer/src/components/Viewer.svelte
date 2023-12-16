<script lang="ts">
  import Utilities from './Utilities.svelte'
  import addSVG from './../assets/add.svg'
  import addQueueSVG from './../assets/queue.svg'
  import brushSVG from './../assets/brush.svg'
  import plusSVG from './../assets/plus.svg'
  import { panel } from './../scripts/store'

  let newSong: boolean = false

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
    padding: 75px;

    background-color: rgba(255, 255, 255, 0.7);
    border-radius: var(--radius);

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
    <div class="title">Te quiero guapo</div>
  </div>

  <div class="song-list">
    <div class="song-row">
      <img
        src="https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/d9/8e/ae/d98eaece-2460-1445-384c-e0d6299268d9/artwork.jpg/1200x1200bf-60.jpg"
        class="cover"
        alt=""
      />
      <div class="details">
        <span class="song-title">Cherry Blossom Nightmare</span>
        <span class="singer">Unlike Pluto</span>
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
  </div>

  <button class="new-song" class:active={newSong} on:click={toggleNewSong}>
    <img src={plusSVG} alt="" />
  </button>
</div>
