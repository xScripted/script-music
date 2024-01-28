<script lang="ts">
  import { queue } from './../scripts/store'
  import { player } from '../scripts/player'

  import moveSVG from './../assets/move.svg'
  import deleteSVG from './../assets/delete.svg'

  let queueValue
  queue.subscribe((value) => (queueValue = value))
</script>

<style lang="scss">
  .container {
    height: fit-content;
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 5px;

    .songRow {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 15px;

      padding: 5px 10px;
      border-radius: 5px;
      transition: 0.3s ease;
      cursor: pointer;

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

        .functions {
          display: flex;
        }
      }
    }
  }
</style>

<div class="container">
  {#each queueValue as song, i}
    <div class="songRow">
      <span class="position">{i + 1}</span>
      <div class="song">
        <div class="title">{song.title}</div>
        <div class="artist">{song.artist}</div>
      </div>
      <div class="functions">
        <img src={deleteSVG} alt="" class="delete" on:click={() => player.removeSong(i)} />
        <img src={moveSVG} alt="" class="move" />
      </div>
    </div>
  {/each}
</div>
