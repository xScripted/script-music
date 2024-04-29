<script lang="ts">
  import { queue } from '@/constants/godStore'
  import { player } from '@/scripts/player'

  import Svg from '@/components/Svg.svelte'

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
      }

      &:hover {
        background-color: rgba(255, 255, 255, 0.35);
        transition: 0.3s ease;

        .position {
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

<button class="container" on:dragover={dragOver} on:drop={drop} bind:this={HTMLContenedor}>
  {#each queueValue as song, i}
    <button
      class="songRow"
      draggable="true"
      id="drag{i}"
      on:click={() => player.play(song.fileName)}
      on:dragstart={dragStart}
      on:dragend={dragEnd}
    >
      <div class="position">
        <span>{i + 1}</span>
        <Svg name="play" />
      </div>

      <div class="song">
        <div class="title">{song.title}</div>
        <div class="artist">{song.artist}</div>
      </div>
      <div class="functions">
        <button class="delete" on:click={() => player.removeSong(i)}>
          <Svg name="delete" />
        </button>
      </div>
    </button>
  {/each}

  {#if queueValue.length < 1}
    <span style="text-align: center;">No songs on queue 😪</span>
  {/if}
</button>

<div class="before" />
