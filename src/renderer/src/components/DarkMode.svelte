<script lang="ts">
  import Checkbox from '@/components/essentials/Checkbox.svelte'

  import { onMount } from 'svelte'
  let darkMode: boolean = false

  let darkModeToggle: Function = () => {}

  const sendEvent = () => {
    const event = new CustomEvent('dark-mode', {
      detail: {
        darkMode,
      },
    })

    document.dispatchEvent(event)
  }

  onMount(() => {
    darkModeToggle = () => {
      if (localStorage) {
        localStorage.setItem('dark-mode', JSON.stringify(darkMode))
        if (darkMode) document.body.setAttribute('dark-mode', '')
        else document.body.removeAttribute('dark-mode')

        sendEvent()
      }
    }

    darkMode = JSON.parse(localStorage.getItem('dark-mode'))
    if (darkMode) document.body.setAttribute('dark-mode', '')
    else document.body.removeAttribute('dark-mode')
    sendEvent()
  })

  $: darkMode, darkModeToggle()
</script>

<style lang="scss"></style>

<Checkbox toggle bind:value={darkMode} />
