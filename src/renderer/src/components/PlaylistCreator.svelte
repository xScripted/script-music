<script lang="ts">
  import type { IPlaylist } from '@interfaces/IPlaylist'
  import { playlists } from '@/constants/godStore'
  import Input from '@/components/Input.svelte'
  import Button from '@/components/Button.svelte'
  import { get } from 'svelte/store'

  let title: string = ''
  let image: string = ''
  let error: boolean = false

  const createPlaylist = () => {
    const isAlready = get(playlists).some((playlist: IPlaylist) => playlist.title === title)

    if (isAlready) {
      error = true
      return
    }

    playlists.update(() => {
      const newPlaylists = [
        ...get(playlists),
        {
          id: new Date().getTime(),
          title,
          image,
          active: false,
          playlist: [],
        },
      ]

      window.localStorage.setItem('playlists', JSON.stringify(newPlaylists))

      return newPlaylists
    })
  }
</script>

<style lang="scss">
</style>

<div class="playlist-editor">
  <Input bind:value={image} placeholder="Image url" />
  <Input bind:value={title} placeholder="Title" errorMessage="¡Esta playlist ya existe!" {error} />
  <Button click={createPlaylist}>Crear playlist</Button>
</div>
