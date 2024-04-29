<script lang="ts">
  //https://yoksel.github.io/url-encoder/ <-- Convert SVG to DataURL
  export let value: boolean = false
  export let toggle: boolean = false
</script>

<style lang="scss">
  $size: 20px;

  .checkbox-custom {
    cursor: pointer;
    position: relative;
    appearance: none;
    background: transparent;
    margin: 0;
    width: 25px;
    height: 25px;
    border-radius: 4px;
    border: 1px solid var(--colorBorder);
    flex-shrink: 0;

    &:checked {
      background-color: var(--colorBrand);
      border: 1px solid var(--colorBrand);
      animation: beat 0.3s ease;

      &:after {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        width: 20px;
        height: 20px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' width='50px' viewBox='0 0 26 26'%3E%3Cpath d='m22.567 4.73l-1.795-1.219a1.09 1.09 0 0 0-1.507.287l-8.787 12.959l-4.039-4.039a1.09 1.09 0 0 0-1.533 0l-1.533 1.536a1.084 1.084 0 0 0 0 1.534L9.582 22c.349.347.895.615 1.387.615s.988-.31 1.307-.774l10.58-15.606a1.085 1.085 0 0 0-.289-1.505z'/%3E%3C/svg%3E");
        background-size: contain;
        background-repeat: no-repeat;
      }
    }

    @keyframes beat {
      0%,
      100% {
        transform: scale(1);
      }
      50% {
        transform: scale(0.9);
      }
    }
  }

  .toggle {
    position: relative;
    height: calc($size + 10px);
    width: calc($size * 2 + 10px);

    transition: 0.3s ease;
    border-radius: $size;
    box-shadow: inset 0 0 0 1px var(--colorBrand);

    &.on {
      background-color: var(--colorBrand);
      transition: 0.3s ease;
    }

    input {
      border-radius: $size;

      height: calc($size + 10px);
      width: calc($size * 2 + 10px);
    }

    .slider {
      width: $size;
      height: $size;

      position: absolute;
      top: 0;
      bottom: 0;
      left: 5px;
      margin: auto;

      background-color: var(--colorBrand);
      border-radius: $size;
      transition: 0.3s ease;

      &.on {
        background-color: var(--colorBase);
        transform: translateX($size);
        transition: 0.3s ease;
      }
    }
  }
</style>

{#if toggle}
  <button class="toggle" on:click={() => (value = !value)} class:on={value}>
    <input type="checkbox" checked={value} />
    <div class="slider" class:on={value} />
  </button>
{:else}
  <input type="checkbox" class="checkbox-custom" checked={value} on:click={() => (value = !value)} aria-label="checkbox" />
{/if}

<!--Radio?-->
