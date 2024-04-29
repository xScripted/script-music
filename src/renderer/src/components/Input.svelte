<script lang="ts">
  /* Example:
      <Input
        id="1"
        prefix="person"
        error={data.name.error}
        bind:value={data.name.value}
        label="Nombre y apellidos"
        placeholder="Nombre"
        autocomplete="name"
      />
    */

  import { svgList } from '@/constants/svgStore'
  import Svg from '@/components/Svg.svelte'

  export let id: string = '1'
  export let autocomplete: string = ''
  export let label: string = ''
  export let maxlength: number = 50
  export let placeholder: string = ''
  export let errorMessage: string = 'Completa este campo'
  export let error: boolean = false
  export let prefix: string = ''
  export let sufix: string = ''
  export let type: 'textarea' | 'text' | 'number' | 'currency' | 'email' | 'password' | 'tel' = 'text'
  export let externalValidate = null
  export let theme: 'radius20' | '' = ''
  export let step: string = '1'
  export let min: number | undefined = undefined
  export let max: number | undefined = undefined

  export let value: string | number = ''

  $: isError = error

  if (type === 'password') sufix = 'eyeClosed'

  const typeAction = (node) => {
    node.type = type === 'email' || type === 'number' || type === 'tel' || type === 'password' ? type : 'text'
  }

  const inputValidate = (event) => {
    if (type === 'tel') {
      const firstChar = event.target.value[0] === '+' ? '+' : ''
      event.target.value = firstChar + event.target.value.replace(/[^0-9\s]/g, '')
    }

    if (type === 'number') {
      if (max && parseFloat(event.target.value) > max) event.target.value = max
      if (min && parseFloat(event.target.value) < min) event.target.value = min
    }
  }

  $: externalValidate = (msg: string) => {
    if (type === 'email') {
      const emailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
      isError = !emailRegEx.test(value.toString())

      if (isError) errorMessage = msg

      return isError
    }
  }

  const sufixClick = () => {
    if (sufix === 'eye' || sufix === 'eyeClosed') {
      type = type === 'password' ? 'text' : 'password'
      sufix = type === 'password' ? 'eyeClosed' : 'eye'
    }
  }
</script>

<style lang="scss">
  $errorColor: rgb(138, 18, 18);
  .input-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 20px;

    input {
      font-size: 16px;
      width: 100%;
      outline: none;
      z-index: 1;

      &.radius20 {
        border-radius: 20px;
      }

      &.isError {
        border: 1px solid $errorColor;
      }
    }

    textarea {
      width: 100%;
      outline: none;
      font-size: 16px;
      z-index: 1;
    }

    label {
      color: var(--colorText);
      padding-bottom: 5px;
    }

    input,
    textarea {
      border-radius: var(--radius);
      border: 1px solid var(--colorBorder);
      background-color: var(--colorBase);
      padding: 10px;
    }

    .input {
      position: relative;

      :global(svg) {
        width: 20px !important;
        height: 20px !important;
      }

      .prefix,
      .sufix {
        top: 0;
        display: flex;
        align-items: center;
        position: absolute;
        height: 100%;
      }

      .prefix {
        left: 20px;
        ~ input {
          padding-left: 45px;
        }
      }

      .sufix {
        right: 20px;
        ~ input {
          padding-right: 45px;
        }
      }
    }

    .error {
      position: absolute;
      display: flex;
      align-items: center;
      gap: 5px;
      color: $errorColor;
      font-size: 12px;
      bottom: -2px;
      opacity: 0.8;

      :global(svg) {
        fill: $errorColor;
      }
    }
  }
</style>

<div class="input-wrapper" class:withLabel={label}>
  {#if label}
    <label class:filled={value || value === 0} for="input-{id}">{label}</label>
  {/if}

  {#if type != 'textarea'}
    <div class="input">
      {#if prefix}
        <div class="prefix">
          {#if svgList.includes(prefix)}
            <Svg name={prefix} fill="var(--colorBrand)" />
          {:else}
            {prefix}
          {/if}
        </div>
      {/if}

      {#if sufix}
        <button class="sufix" on:click={sufixClick}>
          {#if svgList.includes(sufix)}
            <Svg name={sufix} fill="var(--colorBrand)" />
          {:else}
            {sufix}
          {/if}
        </button>
      {/if}

      {#if type === 'number'}
        <input
          type="number"
          {step}
          class={theme}
          id="input-{id}"
          {min}
          {max}
          name="input-{id}"
          {autocomplete}
          class:isError
          use:typeAction
          on:input={inputValidate}
          bind:value
          {maxlength}
          {placeholder}
        />
      {:else if type === 'password'}
        <input
          type="password"
          class={theme}
          id="input-{id}"
          name="input-{id}"
          {autocomplete}
          class:isError
          use:typeAction
          on:input={inputValidate}
          bind:value
          {maxlength}
          {placeholder}
        />
      {:else}
        <input
          type="text"
          class={theme}
          id="input-{id}"
          name="input-{id}"
          {autocomplete}
          class:isError
          use:typeAction
          on:input={inputValidate}
          bind:value
          {maxlength}
          {placeholder}
        />
      {/if}
    </div>
  {:else}
    <textarea id="textarea-{id}" name="textarea-{id}" {placeholder} {maxlength} bind:value cols="30" rows="3" />
  {/if}

  {#if isError}
    <span class="error">
      <Svg name="error" width="15" />
      {errorMessage}
    </span>
  {/if}
</div>
