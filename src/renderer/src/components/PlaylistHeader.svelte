<script lang="ts">
  import { playlists, songsFiltered } from '@/constants/godStore'
  import type { IPlaylist } from '@interfaces/IPlaylist'
  import type { ISong } from '@interfaces/ISong'

  export let shrinkHeader: boolean = false

  let image: string = 'https://upload.wikimedia.org/wikipedia/en/c/c4/Falling_in_Reverse_–_Popular_Monster.jpeg'
  let titleArray: string[] = []
  let nSongs: number = 0
  let title: string = ''

  songsFiltered.subscribe((value: ISong[]) => (nSongs = value.length))

  playlists.subscribe((value: IPlaylist[]) => {
    titleArray = []

    for (let playlist of value) {
      if (playlist.active) {
        image = playlist.image
        titleArray.push(playlist.title)
      }
    }

    title = titleArray.length > 1 ? titleArray.join(' + ') : titleArray[0]
  })
</script>

<style lang="scss">
  .playlist-header-container {
    transition: 0.3s ease;

    height: fit-content;
    display: flex;
    align-items: center;
    gap: 25px;
    margin-bottom: 25px;

    .photo {
      transition: 0.3s ease;

      height: 150px;
      width: 150px;
      border-radius: var(--radius);
      flex-shrink: 0;
      object-fit: cover;
    }

    .header {
      display: flex;
      flex-direction: column;

      .title {
        transition: 0.3s ease;

        font-size: 75px;
        font-weight: bolder;
        color: var(--colorText);
        width: 100%;
        text-wrap: balance;

        border: none;
        outline: none;
        background-color: transparent;
      }

      span.title {
        transition: 0.3s ease;

        font-size: 50px;
      }
    }

    &.shrinkHeader {
      transition: 0.3s ease;

      margin-bottom: 0;

      .title {
        transition: 0.3s ease;

        font-size: 30px;
      }

      span.title {
        transition: 0.3s ease;

        font-size: 30px;
      }

      .photo {
        transition: 0.3s ease;

        border-radius: 50%;
        height: 100px;
        width: 100px;
      }
    }
  }
</style>

{#if title}
  <div class="playlist-header-container" class:shrinkHeader>
    <img class="photo" src={image} alt="" />
    <div class="header">
      {#if titleArray.length <= 1}
        <input type="text" class="title" bind:value={title} spellcheck="false" />
      {:else}
        <span class="title">{title}</span>
      {/if}
      <span class="song-number">{nSongs} canciones</span>
    </div>
  </div>
{/if}
