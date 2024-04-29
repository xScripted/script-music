<script lang="ts">
  import type { ISong } from '@interfaces/ISong'
  import { player } from '@/scripts/player'
  import { panel, queue, selectedSongForUpdate } from '@/constants/godStore'
  import Tag from '@/components/Tag.svelte'
  import Svg from '@/components/Svg.svelte'

  export let song: ISong

  const openEditor = () => {
    panel.update(() => 'Update song')
    selectedSongForUpdate.update(() => song)
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
    <button on:click={openEditor}> <Svg name="brush" /> </button>
    <button on:click={addToQueue}> <Svg name="addQueue" /> </button>
    <button on:click={openEditor}> <Svg name="add" /> </button>
  </div>
</div>
