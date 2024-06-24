<script lang="ts">
  import type { IPlaylist } from '@interfaces/IPlaylist'
  import type { ISong } from '@interfaces/ISong'
  import type { ITag } from '@interfaces/ITag'
  import { player } from '@/scripts/player'
  import Tag from '@/components/Tag.svelte'
  import Svg from '@/components/Svg.svelte'
  import { get } from 'svelte/store'
  import { panel, queue, selectedSongForUpdate, tags, playlists } from '@/constants/godStore'
  import { computePosition, autoUpdate } from '@floating-ui/dom'

  export let song: ISong

  const iconSize: string = '20'
  let HTMLAddPlaylist: HTMLElement
  let HTMLTooltip: HTMLElement
  let HTMLSong: HTMLElement

  let playlistsValue: IPlaylist[]
  playlists.subscribe((value) => (playlistsValue = value))

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

  const addToPlaylist = (i: number) => {
    playlists.update(() => {
      const playlistsCopy = get(playlists)

      const alreadyExists = playlistsCopy[i].playlist.includes(song.fileName)

      if (!alreadyExists) playlistsCopy[i].playlist.push(song.fileName)

      window.localStorage.setItem('playlists', JSON.stringify(playlistsCopy))
      console.log(playlistsCopy)

      toggleTooltip()
      return playlistsCopy
    })
  }

  const toggleTooltip = () => {
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

    const allSongs = document.querySelectorAll('.song')

    allSongs.forEach((song: HTMLElement) => {
      song.classList.remove('song-active')
    })

    HTMLSong.classList.toggle('song-active')
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

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
      transition: 0.3s ease;

      .more {
        opacity: 1;
      }
    }

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
      display: flex;
      opacity: 0;
      gap: 10px;
    }
  }

  :global(.song-active) {
    background-color: rgba(255, 255, 255, 0.5) !important;

    .more {
      opacity: 1;
    }
  }

  .tooltip {
    position: absolute;
    background-color: white;
    border-radius: var(--radius);
    border: 1px solid #ccc;
    padding: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: none;
  }

  :global(.show) {
    display: block !important;
  }
</style>

<div class="song-container" bind:this={HTMLSong}>
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
      <button aria-describedby="tooltip-{song.title}" bind:this={HTMLAddPlaylist} on:click={toggleTooltip}>
        <Svg name="add" width={iconSize} height={iconSize} />
      </button>
    </div>
  </div>

  <div id="tooltip-{song.title}" class="tooltip" role="tooltip" bind:this={HTMLTooltip}>
    {#each playlistsValue as playlist, i}
      <button on:click={() => addToPlaylist(i)}>{playlist.title}</button>
    {/each}
  </div>
</div>
