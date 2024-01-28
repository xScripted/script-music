<script lang="ts">
  import type { ISong } from '../../../interfaces/ISong'
  import { player } from '../scripts/player'
  import { panel, queue, updatingSong } from '../scripts/store'

  import Tag from './Tag.svelte'

  import addSVG from './../assets/add.svg'
  import addQueueSVG from './../assets/queueAdd.svg'
  import brushSVG from './../assets/brush.svg'

  export let song: ISong

  const openEditor = () => {
    panel.update(() => 'Update song')
    updatingSong.update(() => song)
  }

  const addToQueue = () => {
    queue.update((value) => {
      value.push(song)
      return value
    })
  }
</script>

<style lang="scss">
  .song {
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

      img {
        height: 20px;
      }
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.35);
      transition: 0.3s ease;

      .more {
        display: flex;
      }
    }
  }
</style>

<div class="song">
  <img src={song.cover} class="cover" alt="" />
  <button class="details" on:click={() => player.play(song.fileName)}>
    <span class="song-title">{song.title}</span>
    <span class="singer">{song.artist}</span>
  </button>
  <div class="tags">
    {#each song.tags as tagName}
      <Tag {tagName} active />
    {/each}
  </div>
  <div class="more">
    <img src={brushSVG} alt="" on:click={openEditor} />
    <img src={addQueueSVG} alt="" on:click={addToQueue} />
    <img src={addSVG} alt="" />
  </div>
</div>
