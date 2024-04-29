<script lang="ts">
  import Utilities from '@/components/Utilities.svelte'
  import PlaylistHeader from '@/components/PlaylistHeader.svelte'

  import { panel, songsFiltered } from '@/scripts/store'
  import type { ISong } from '@interfaces/ISong'
  import Song from '@/components/Song.svelte'

  import Svg from '@/components/Svg.svelte'
  import BubbleButton from '@/components/BubbleButton.svelte'

  let newSong: boolean = false
  let songsValue: ISong[] = []

  songsFiltered.subscribe((value) => (songsValue = value))

  const toggleNewSong = () => {
    newSong = !newSong

    panel.update(() => (newSong ? 'Youtube to MP3' : ''))
  }
</script>

<style lang="scss">
  .viewer {
    position: relative;
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    //grid-template-rows: 60px 625px 1fr;
    //grid-template-rows: 60px 175px 1fr; no
    padding: 25px;

    overflow: hidden;

    .utilities {
      width: 100%;
      height: fit-content;
      display: flex;
      justify-content: right;
    }

    .song-list {
      margin-top: 50px;
      height: 100%;
      overflow: scroll;
      overflow-x: hidden;
    }

    .new-song {
      width: 50px;
      height: 50px;

      position: absolute;
      bottom: 15px;
      right: 15px;

      background: none;
      border: none;
      cursor: pointer;
    }
  }
</style>

<div class="viewer g-box">
  <div class="utilities">
    <Utilities />
  </div>

  <PlaylistHeader />

  <div class="song-list">
    {#each songsValue as song}
      <Song {song} />
    {/each}
  </div>

  <button class="new-song" on:click={toggleNewSong}>
    <Svg name="plus" />
  </button>
</div>
