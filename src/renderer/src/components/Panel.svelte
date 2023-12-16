<script lang="ts">
  import { get } from 'svelte/store'
  import { panel } from '../scripts/store'
</script>

<style lang="scss">
  .panel {
    transition: width 0.3s ease-in-out;
    width: 0%;
    max-width: 400px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: var(--radius);
    overflow: hidden;

    &.active {
      transition: width 0.3s ease-in-out;
      width: 100%;
      padding: 20px;
      margin-left: 10px;
    }

    h2 {
      font-size: 26px;
      text-align: center;
    }
  }
</style>

<div class="panel" class:active={get(panel)}>
  <h2>{$panel}</h2>
</div>
