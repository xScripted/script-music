<script lang="ts">
  import { selectedPlaylistForUpdate, playlists } from '@/constants/godStore'
  import { get } from 'svelte/store'
  import Input from '@/components/Input.svelte'
  import type { IPlaylist } from '@interfaces/IPlaylist'

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
</script>

<style lang="scss">
</style>

<div class="playlist-edit">
  <img src={selectedPlaylistForUpdateValue.image} alt="" class="preview" />
  <Input placeholder="Playlist image" bind:value={selectedPlaylistForUpdateValue.image} on:input={updatePlaylist} />
  <Input placeholder="Playlist name" bind:value={selectedPlaylistForUpdateValue.title} on:input={updatePlaylist} />
  <button class="delete"></button>
</div>
