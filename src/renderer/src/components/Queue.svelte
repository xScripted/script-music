<script lang="ts">
  import { queue } from './../scripts/store'
  import { player } from '../scripts/player'

  import playSVG from './../assets/play.svg'
  import deleteSVG from './../assets/delete.svg'
  //import moveSVG from './../assets/move.svg'

  let dragElement: HTMLElement
  let HTMLContenedor: HTMLElement
  let songDupe: HTMLElement
  let queueValue
  queue.subscribe((value) => (queueValue = value))

  const dragStart = (event) => {
    dragElement = event.target

    songDupe = dragElement.cloneNode(true) as HTMLElement
    HTMLContenedor.appendChild(songDupe)
    songDupe.classList.add('cloned')

    dragElement.style.visibility = 'hidden'
  }

  const dragOver = (event) => {
    event.preventDefault()

    for (let song of HTMLContenedor.children) {
      if (event.clientY < song.getBoundingClientRect().top) {
        song.classList.add('before')
      } else {
        song.classList.remove('before')
      }
    }

    console.log(event.clientY)

    songDupe.style.transform = `translateY(${event.clientY}px)`

    //👍
  }

  const dragEnd = (event) => {
    dragElement.style.visibility = 'visible'
    songDupe.remove()
  }

  const drop = () => {
    const pepePapa = HTMLContenedor.querySelector('.before')
    HTMLContenedor.insertBefore(dragElement, pepePapa)
    ;[...HTMLContenedor.children].map((song) => {
      song.classList.remove('before')
    })

    dragElement.style.visibility = 'visible'
  }
</script>

<style lang="scss">
  .container {
    height: fit-content;
    width: 100%;

    position: relative;
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
      cursor: grab;

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
    //transform: translateY(50px);
    transition: 0.3s ease;
  }

  :global(.cloned) {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.35);
    position: absolute;
    z-index: 5;
    border: 2px solid red;
  }
</style>

<div class="container" on:dragover={dragOver} on:drop={drop} bind:this={HTMLContenedor}>
  {#each queueValue as song, i}
    <div
      class="songRow"
      draggable="true"
      id="drag{i}"
      on:click={() => player.play(song.fileName)}
      on:dragstart={dragStart}
      on:dragend={dragEnd}
    >
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
        <!--<img src={moveSVG} alt="" class="move"  />-->
      </div>
    </div>
  {/each}

  {#if queueValue.length < 1}
    <span style="text-align: center;">No songs on queue 😪</span>
  {/if}
</div>

<div class="before" />
