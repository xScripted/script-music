<script lang="ts">
  import Svg from '@/components/essentials/Svg.svelte'
  import { onMount } from 'svelte'
  interface IOption {
    main: string
    children: string[]
  }

  interface IValue {
    main: string
    child?: string
  }

  export let icon: string = ''
  export let id: string = '1'
  export let placeholder: string = 'Select'
  export let options: string[] | IOption[] = []

  let choices: IOption[] = []
  let isSimple = typeof options[0] === 'string'
  let value: IValue = { main: '', child: '' }
  let HTMLContainer
  let isOpen: boolean = false

  if (isSimple) {
    choices = options.map((option) => {
      return {
        main: option,
        children: [],
      }
    })
  } else {
    choices = options as IOption[]
  }

  const selectOption = (main: string, child: string = '') => {
    value = {
      main,
      child,
    }

    isOpen = false
  }

  onMount(() => {
    // Close Outside
    window.addEventListener('click', (ev: any) => {
      if (!HTMLContainer) return

      if (!HTMLContainer.contains(ev.target) && HTMLContainer.getAttribute('id') === id) {
        isOpen = false
      }
    })
  })
</script>

<style lang="scss">
  .content {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: fit-content;

    position: relative;

    &.isSimple {
      .main {
        font-weight: 400 !important;
      }
    }

    .select {
      display: flex;
      justify-content: space-between;
      align-items: center;

      border: 1px solid var(--colorBorder);
      border-radius: 5px;
      padding: 5px 10px;
      gap: 15px;

      height: 55px;
      width: 225px;
      background-color: var(--colorBase);

      .name {
        display: flex;
        align-items: center;
        gap: 10px;

        .value {
          display: flex;
          flex-direction: column;
          width: 125px;
          text-align: left;

          .placeholder {
            color: var(--colorText2);
            font-weight: 500;
          }
        }

        .child {
          font-weight: lighter;
          font-size: 12px;
          text-align: left;
        }
      }
    }

    .dropdown {
      border-radius: 5px;
      border: 1px solid var(--colorBorder);
      display: none;
      overflow: hidden;

      width: fit-content;
      min-width: 225px;

      background-color: var(--colorBase);

      position: absolute;
      z-index: 2;
      top: 60px;

      &.isOpen {
        display: flex;
        flex-direction: column;
      }

      button {
        text-align: left;
      }

      .main {
        font-weight: 500;
        padding: 5px 10px;

        &:hover {
          background-color: var(--colorBrand);
          color: var(--colorBase);
        }
      }

      .child {
        font-weight: lighter;
        padding: 5px 18px;
        color: var(--colorText2);

        &:hover {
          background-color: var(--colorBrand);
          color: var(--colorBase);
        }
      }

      .delete {
        border-top: 1px solid var(--colorBorder);
        margin-top: 10px;
        opacity: 0.5;
        padding: 5px 10px;

        &:hover {
          background-color: var(--colorBrand);
          color: var(--colorBase);
        }
      }
    }
  }
</style>

<div class="content" class:isSimple bind:this={HTMLContainer} {id}>
  <button class="select" on:click={() => (isOpen = !isOpen)}>
    <div class="name">
      {#if icon}
        <Svg name={icon} fill="var(--colorBrand)" height="20" width="20" />
      {/if}
      <div class="value">
        {#if !value.main}
          <span class="placeholder">{placeholder}</span>
        {/if}
        <span class="main">{value.main}</span>
        <span class="child">{value.child}</span>
      </div>
    </div>

    <Svg name="arrow" width="20" height="20" fill="var(--colorBrand)" />
  </button>

  <div class="dropdown" class:isOpen>
    {#each choices as choice}
      <button class="main" on:click={() => selectOption(choice.main)}>{choice.main}</button>
      {#each choice.children as child}
        <button class="child" on:click={() => selectOption(choice.main, child)}>{child}</button>
      {/each}
    {/each}
    <button class="delete" on:click={() => selectOption('', '')}>Delete selection</button>
  </div>
</div>
