<script lang="ts">
  import { selectedPlaylistForUpdate, playlists, songs } from '@/constants/godStore'
  import { get } from 'svelte/store'
  import Input from '@/components/Input.svelte'
  import type { IPlaylist } from '@interfaces/IPlaylist'
  import type { ISong } from '@interfaces/ISong'
  import Svg from './Svg.svelte'

  let selectedPlaylistForUpdateValue

  selectedPlaylistForUpdate.subscribe((value: IPlaylist) => (selectedPlaylistForUpdateValue = value))

  const updatePlaylist = () => {
    const playlistI = get(playlists).findIndex((playlist: IPlaylist) => playlist === selectedPlaylistForUpdateValue.id)

    playlists.update((p: IPlaylist[]) => {
      p[playlistI].title = selectedPlaylistForUpdateValue.title
      p[playlistI].image = selectedPlaylistForUpdateValue.image

      return p
    })
  }

  let completeSongsOfPlaylist = []

  selectedPlaylistForUpdateValue.playlist.map((songId: string) => {
    const foundSong = get(songs).find((song: ISong) => song.fileName === songId)
    completeSongsOfPlaylist.push(foundSong)
  })
</script>

<style lang="scss">
  .playlist-edit {
    height: calc(100% - 65px);

    display: flex;
    flex-direction: column;

    .preview {
      margin-bottom: 20px;
      border-radius: var(--radius);
      height: 200px;
      width: 200px;
      object-fit: cover;
    }

    .song-list {
      display: flex;
      flex-direction: column;
      gap: 5px;
      height: 100%;

      overflow-y: scroll;

      .song {
        display: flex;
        padding: 10px 0;
        gap: 20px;
        position: relative;

        &:hover {
          background-color:;
        }

        .details {
          width: 100%;
          display: flex;
          flex-direction: column;
          .title {
            flex-shrink: 0;
            max-width: 250px;
            overflow: hidden;

            white-space: nowrap;
            text-overflow: ellipsis;
          }

          .artist {
            font-size: 13px;
            font-weight: lighter;
          }
        }

        .delete {
          padding: 0 15px;
          height: 100%;
        }
      }
    }
  }
</style>

<div class="playlist-edit">
  <!-- LAIA: La imagen se ve fea -->
  <img src={selectedPlaylistForUpdateValue.image} alt="" class="preview" />
  <Input placeholder="Playlist image" bind:value={selectedPlaylistForUpdateValue.image} on:input={updatePlaylist} />
  <Input placeholder="Playlist name" bind:value={selectedPlaylistForUpdateValue.title} on:input={updatePlaylist} />
  <button class="delete"></button>

  <div class="song-list">
    {#each completeSongsOfPlaylist as song}
      <div class="song">
        <div class="details">
          <div class="title">{song.title}</div>
          <div class="artist">{song.artist}</div>
        </div>
        <button class="delete">x</button>
      </div>
    {/each}
  </div>
</div>
