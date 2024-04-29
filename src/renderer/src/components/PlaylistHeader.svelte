<script lang="ts">
  import { playlists } from '@/constants/godStore'
  import type { IPlaylist } from '@interfaces/IPlaylist'

  let image: string = 'https://upload.wikimedia.org/wikipedia/en/c/c4/Falling_in_Reverse_–_Popular_Monster.jpeg'
  let titleArray: string[] = []
  let nSongs: number = 123
  let title: string = ''

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
    height: fit-content;
    display: flex;
    align-items: center;
    gap: 25px;

    .photo {
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
        font-size: 70px;
        font-weight: bolder;
        color: var(--colorText);
        width: 100%;

        border: none;
        outline: none;
        background-color: transparent;
      }

      span.title {
        font-size: 30px;
      }
    }
  }
</style>

{#if title}
  <div class="playlist-header-container">
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
