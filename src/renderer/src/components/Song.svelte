<script lang="ts">
  import type { ISong } from '@interfaces/ISong'
  import type { ITag } from '@interfaces/ITag'
  import { player } from '@/scripts/player'
  import Tag from '@/components/Tag.svelte'
  import Svg from '@/components/Svg.svelte'
  import { panel, queue, selectedSongForUpdate, tags } from '@/constants/godStore'
  import { computePosition, autoUpdate } from '@floating-ui/dom'

  export let song: ISong

  const iconSize: string = '20'
  let HTMLAddPlaylist: HTMLElement
  let HTMLTooltip: HTMLElement

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

  const openTooltip = () => {
    HTMLTooltip.classList.toggle('show')

    if (HTMLTooltip.classList.contains('show')) {
      autoUpdate(HTMLAddPlaylist, HTMLTooltip, () => {
        computePosition(HTMLAddPlaylist, HTMLTooltip, {
          placement: 'bottom',
        }).then(({ x, y }) => {
          Object.assign(HTMLTooltip.style, {
            left: `${x}px`,
            top: `${y}px`,
          })
        })
      })
    }
  }

  let tagsValue
  tags.subscribe((value) => (tagsValue = value))

  $: activeTags = tagsValue.filter((tag: ITag) => song.tags.includes(tag.name))
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
    gap: 15px;
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

      .artist {
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
      //display: none;
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

  #tooltip {
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    padding: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: none;
  }

  :global(.show) {
    display: block !important;
  }
</style>

<div class="song">
  <img src={song.cover} class="cover" alt="" />
  <button class="details" on:click={() => player.play(song.fileName)}>
    <span class="song-title">{song.title}</span>
    <span class="artist">{song.artist}</span>
  </button>
  <div class="tags">
    {#each activeTags as tag}
      <Tag {tag} active />
    {/each}
  </div>
  <div class="more">
    <button> <Svg name="brush" width={iconSize} height={iconSize} /> </button>
    <button> <Svg name="addQueue" width={iconSize} height={iconSize} /> </button>
    <button aria-describedby="tooltip" bind:this={HTMLAddPlaylist} on:mouseover={openTooltip}>
      <Svg name="add" width={iconSize} height={iconSize} />
    </button>
  </div>
</div>

<div id="tooltip" role="tooltip" bind:this={HTMLTooltip}>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis est eveniet necessitatibus. Maiores voluptatum aperiam, corporis libero
  numquam, dolores provident optio eos amet illum labore inventore repellat sequi reprehenderit aliquam?
</div>
