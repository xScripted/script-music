<script lang="ts">
  import { panel } from '../scripts/store'
  import YoutubeSong from './YoutubeSong.svelte'
  import Settings from './Settings.svelte'
  import UpdateSong from './UpdateSong.svelte'

  let active: boolean = false

  let panelValue: string = ''

  panel.subscribe((value) => {
    active = !!value
    panelValue = value
  })
</script>

<style lang="scss">
  .panel {
    position: relative;
    transition:
      width 0.3s ease-out,
      opacity 0.3s 0.3s;
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    border-radius: var(--radius);
    overflow-y: auto;
    overflow-x: hidden;
    width: 0;
    opacity: 0;
    margin-left: 0;

    &.active {
      transition:
        width 0.3s ease-in,
        opacity 0.3s 0.3s;
      width: 600px;
      padding: 20px;
      opacity: 1;
      margin-left: 10px;
    }

    h2 {
      font-size: 26px;
      text-align: center;
      margin-bottom: 30px;
      white-space: nowrap;
    }
  }
</style>

<div class="panel" class:active>
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
</div>
