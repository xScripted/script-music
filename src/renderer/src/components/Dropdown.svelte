<script lang="ts">
  import { onMount } from 'svelte'

  export let isOpen: boolean = true
  export let id: string

  let HTMLContainer

  onMount(() => {
    // Close Outside
    window.addEventListener('click', (ev: any) => {
      if (!HTMLContainer) return
      if (!HTMLContainer.parentNode.contains(ev.target) && HTMLContainer.getAttribute('id') === id) {
        isOpen = false
      }
    })
  })
</script>

<style lang="scss">
  .dropdown {
    position: absolute;
    width: 300px;
    height: fit-content;
    transform: translateX(-260px) translateY(10px);
    box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.3);
    padding: 20px;
    border-radius: var(--radius);
    background-color: rgba(255, 255, 255, 1);
    z-index: 9;
  }
</style>

{#if isOpen}
  <div class="dropdown" bind:this={HTMLContainer} {id}>
    <slot />
  </div>
{/if}
