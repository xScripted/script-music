<script lang="ts">
  import Input from './Input.svelte'
  export let playlistName: string = ''
</script>

<style lang="scss">
</style>

<div class="playlist-edit">
  <div class="photo"></div>
  <Input placeholder="Playlist name" bind:value={playlistName} />
</div>
