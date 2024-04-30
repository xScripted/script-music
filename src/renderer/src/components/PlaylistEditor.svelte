<script lang="ts">
  import { selectedPlaylistForUpdate } from '@/constants/godStore'
  import { get } from 'svelte/store'
  import Input from './Input.svelte'

  let image: string = get(selectedPlaylistForUpdate).image
  let title: string = get(selectedPlaylistForUpdate).title
</script>

<style lang="scss">
</style>

<div class="playlist-edit">
  <img src={image} alt="" class="preview" />
  <Input placeholder="Playlist image" bind:value={image} />
  <Input placeholder="Playlist name" bind:value={title} />
</div>
