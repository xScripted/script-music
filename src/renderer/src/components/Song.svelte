<script lang="ts">
  import type { ISong } from '@interfaces/ISong'
  import type { ITag } from '@interfaces/ITag'
  import { player } from '@/scripts/player'
  import Tag from '@/components/Tag.svelte'
  import Svg from '@/components/Svg.svelte'
  import MagicDropdown from '@/components/MagicDropdown.svelte'
  import { panel, queue, selectedSongForUpdate, tags } from '@/constants/godStore'

  export let song: ISong

  const iconSize: string = '20'
  let HTMLAddPlaylist: HTMLElement
  let openDropdown: boolean = false

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
    <button on:click={() => (openDropdown = true)} bind:this={HTMLAddPlaylist}>
      <Svg name="add" width={iconSize} height={iconSize} />
    </button>
  </div>

  {#if openDropdown}
    <MagicDropdown source={HTMLAddPlaylist}
      >Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate nisi vero iste quibusdam obcaecati ullam non fugiat, a similique
      velit molestiae! Odit labore, ad nemo tenetur obcaecati harum officiis aperiam!</MagicDropdown
    >
  {/if}
</div>
