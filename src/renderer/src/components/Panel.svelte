<script lang="ts">
  import { get } from 'svelte/store'
  import { panel } from '../scripts/store'
  import YoutubeSong from './YoutubeSong.svelte'

  let active: boolean = false

  let panelValue: string = ''

  panel.subscribe((value) => {
    active = !!value
    panelValue = value
  })
</script>

<style lang="scss">
  .panel {
    transition:
      0.5s ease-out,
      padding 0s;
    width: 0%;
    max-width: 400px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: var(--radius);
    overflow: hidden;
    margin-left: 10px;
    opacity: 0;

    &.active {
      transition: 0.5s ease-in;
      width: 100%;
      padding: 20px;
      opacity: 1;
    }

    h2 {
      font-size: 26px;
      text-align: center;
      margin-bottom: 30px;
    }
  }
</style>

<div class="panel" class:active>
  <h2>{$panel}</h2>

  {#if panelValue === 'Youtube to MP3'}
    <YoutubeSong />
  {/if}
</div>
