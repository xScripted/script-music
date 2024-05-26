<script lang="ts">
  import { onMount } from 'svelte'

  export let source: HTMLElement
  let HTMLMagicDropdown: HTMLElement

  const isElementInViewport = (rect) => {
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  onMount(() => {
    document.body.appendChild(HTMLMagicDropdown)

    const coords = source.getBoundingClientRect()
    const coords2 = HTMLMagicDropdown.getBoundingClientRect()

    const positionTierList = [
      {
        top: coords.top,
        right: 0,
      },
    ]

    HTMLMagicDropdown.style.top = `${coords.top - coords2.height}px`
    HTMLMagicDropdown.style.left = `${coords.right - coords2.width / 2}px`

    console.log(isElementInViewport(coords2))
  })
</script>

<style lang="scss">
  .magic-dropdown {
    position: absolute;
    border-radius: var(--radius);
    background-color: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    padding: 10px;
  }
</style>

<div class="magic-dropdown" bind:this={HTMLMagicDropdown}>
  <slot />
</div>
