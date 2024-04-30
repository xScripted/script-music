<script lang="ts">
  export let disabled: boolean = false
  export let type: 'main' | 'secondary' | 'subButton' = 'main'
  export let width: string = ''
  export let customClass: string = ''
  export let click = () => {}
</script>

<style lang="scss">
  .btn-main,
  .btn-secondary {
    height: fit-content;
    width: fit-content;
    padding: 6px 15px;
    border-radius: var(--radius);
    transition: 0.3s ease;
    box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.3);
  }

  .btn-main {
    background-color: var(--colorBrand);
    border: 1px solid var(--colorBrand);

    :global(span) {
      color: var(--colorBase);
    }

    &:not([disabled]):hover {
      transition: 0.3s ease;
      background-color: var(--colorBase);

      :global(span) {
        color: var(--colorBrand);
      }
    }

    &[disabled] {
      opacity: 0.3;
      border: 1px solid var(--colorText2);
      background-color: var(--colorBase);

      cursor: default;

      :global(span) {
        color: var(--colorText2);
      }
    }
  }

  .btn-secondary {
    border: 1px solid var(--colorBrand);

    :global(span) {
      color: var(--colorBrand);
    }

    &:not([disabled]):hover {
      transition: 0.3s ease;
      background-color: var(--colorBrand);

      :global(span) {
        color: var(--colorBase);
      }
    }

    &[disabled] {
      opacity: 0.3;
      border: 1px solid var(--colorText2);
      cursor: default;

      :global(span) {
        color: var(--colorText2);
      }
    }
  }
</style>

<button class="btn-{type} {customClass}" style={width ? `width: ${width}` : ''} on:click={click} {disabled}>
  <slot />
</button>
