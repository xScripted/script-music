<script lang="ts">
  import { panel } from '@/constants/godStore'
  import YoutubeSong from '@/components/YoutubeSong.svelte'
  import Settings from '@/components/Settings.svelte'
  import UpdateSong from '@/components/UpdateSong.svelte'
  import Queue from '@/components/Queue.svelte'
  import PlaylistCreator from '@/components/PlaylistCreator.svelte'
  import TagEditor from '@/components/TagEditor.svelte'

  import Svg from '@/components/Svg.svelte'
  import PlaylistEditor from '@/components/PlaylistEditor.svelte'

  let active: boolean = false
  let panelValue: string = ''

  panel.subscribe((value) => {
    active = !!value
    panelValue = value
  })

  $: if (!active) panel.update(() => '')
</script>

<style lang="scss">
  .panel {
    position: relative;
    transition:
      width 0.3s ease-out,
      opacity 0.3s 0.3s;
    overflow-y: auto;
    overflow-x: hidden;
    width: 0;
    opacity: 0;
    margin-left: 0;
    display: flex;
    flex-direction: column;

    &.active {
      transition:
        width 0.3s ease-in,
        opacity 0.3s 0.3s;

      width: 600px;
      padding: 20px;
      opacity: 1;
      margin-left: 10px;
      .close {
        width: 30px;
        height: 30px;

        position: absolute;
        top: 10px;
        right: 10px;

        transform: rotate(45deg);
        background: none;
        border: none;
        cursor: pointer;
      }
    }

    h2 {
      font-size: 26px;
      text-align: center;
      margin-bottom: 30px;
      white-space: nowrap;
    }
  }
</style>

<div class="panel g-box" class:active>
  <h2>{$panel}</h2>

  {#if panelValue === 'Youtube to MP3'}
    <YoutubeSong />
  {/if}

  {#if panelValue === 'Settings'}
    <Settings />
  {/if}

  {#if panelValue === 'Update song'}
    <UpdateSong />
  {/if}

  {#if panelValue === 'Queue'}
    <Queue />
  {/if}

  {#if panelValue === 'Playlist creator'}
    <PlaylistCreator />
  {/if}

  {#if panelValue === 'Playlist editor'}
    <PlaylistEditor />
  {/if}

  {#if panelValue === 'Tags editor'}
    <TagEditor />
  {/if}

  <button class="close" on:click={() => (active = false)}>
    <Svg name="plus2" />
  </button>
</div>
