<script lang="ts">
  import { queue } from './../scripts/store'
  import { player } from '../scripts/player'

  import moveSVG from './../assets/move.svg'
  import playSVG from './../assets/play.svg'
  import deleteSVG from './../assets/delete.svg'

  let queueValue
  queue.subscribe((value) => (queueValue = value))

  const drag = (event) => {
    event.dataTransfer.setData('nombre', 'laia')
    console.log(event.target)
  }

  let altura: number = 0
  let HTMLContenedor: HTMLElement

  const dragOver = (event) => {
    ;[...HTMLContenedor.children].map((song, index) => {
      console.log(song.getBoundingClientRect().top)

      if (event.clientY < song.getBoundingClientRect().top) {
        song.classList.add('before')
      } else {
        song.classList.remove('before')
      }
    })

    //console.log('por gilipollas: ', event.clientY)
    //👍
  }
</script>

<style lang="scss">
  .container {
    height: fit-content;
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 5px;

    padding: 5px 0;

    .songRow {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 15px;

      padding: 5px 10px;
      border-radius: 5px;
      transition: 0.3s ease;
      cursor: pointer;

      .position {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;

        width: 25px;
        height: 100%;

        .play {
          position: absolute;
          height: 100%;
          top: 0;
          left: 0;
          margin: auto;

          opacity: 0;
        }
      }

      .song {
        width: 100%;
        text-align: start;

        .title {
          font-weight: 600;
        }

        .artist {
          font-size: 12px;
        }
      }

      .functions {
        display: none;
        gap: 5px;

        img {
          height: 25px;
          opacity: 0.5;

          &:hover {
            opacity: 1;
          }
        }
      }

      &:hover {
        background-color: rgba(255, 255, 255, 0.35);
        transition: 0.3s ease;

        .position {
          .play {
            opacity: 0.8;
          }

          span {
            opacity: 0;
          }
        }

        .functions {
          display: flex;
        }
      }

      transition: 0.3s ease;
    }
  }

  .before {
    transform: translateY(50px);
    transition: 0.3s ease;
  }
</style>

<div class="container" on:dragover={dragOver} bind:this={HTMLContenedor}>
  {#each queueValue as song, i}
    <div class="songRow" draggable="true" id="drag{i}" on:click={() => player.play(song.fileName)}>
      <div class="position">
        <span>{i + 1}</span>
        <img src={playSVG} alt="" class="play" />
      </div>

      <div class="song">
        <div class="title">{song.title}</div>
        <div class="artist">{song.artist}</div>
      </div>
      <div class="functions">
        <img src={deleteSVG} alt="" class="delete" on:click={() => player.removeSong(i)} />
        <img src={moveSVG} alt="" class="move" on:dragstart={drag} />
      </div>
    </div>
  {/each}
</div>

<div class="before" />
