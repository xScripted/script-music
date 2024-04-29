<script lang="ts">
  import SelectTags from './SelectTags.svelte'
  import Dropdown from './Dropdown.svelte'
  import { panel, filterSearch } from '../scripts/store'
  import { player } from '../scripts/player'
  import { onMount } from 'svelte'
  import Svg from '../components/Svg.svelte'

  let tagsVisible: boolean = false
  let search: boolean = false
  let filters: boolean = false

  let settingsVisible: boolean = false
  let filterVisible: boolean = false
  let searchValue: string = ''

  const updateGlobalSearch = () => {
    filterSearch.update((value: string) => (value = searchValue))
    player.filter()
  }

  //Close outside
  let HTMLContainer

  onMount(() => {
    window.addEventListener('click', (ev: any) => {
      if (HTMLContainer && !HTMLContainer.contains(ev.target) && !searchValue) {
        search = false
      }
    })
  })
</script>

<style lang="scss">
  .container {
    position: absolute;
    height: fit-content;
    width: fit-content;

    display: flex;
    justify-content: space-evenly;
    gap: 15px;

    top: 15px;
    right: 15px;

    button {
      background: none;
      border: none;
      cursor: pointer;
    }

    .search {
      width: 25px;
      height: 25px;
      display: flex;
      gap: 10px;
      overflow: hidden;
      transition: 0.3s ease;

      .search-input {
        background: none;
        border: none;
        outline: none;
        border-bottom: 1px solid #757575;
      }

      &.active {
        width: 210px;
        transition: 0.3s ease;
      }
    }

    .song-filters {
      .song-filter-section {
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 10px 0;
        gap: 10px;

        button {
          border: 1px solid rgb(170, 170, 170);
          padding: 10px 20px;
          border-radius: var(--radius);
          font-size: 14px;

          &:hover {
            background-color: rgb(236, 236, 236);
          }
        }
      }

      .filters {
        margin-top: 20px;
      }
    }

    .tags {
      position: relative;
    }
  }
</style>

<div class="container">
  <div class="search" class:active={search} bind:this={HTMLContainer}>
    <button on:click={() => (search = !search)}>
      <Svg name="search" />
    </button>
    <input class="search-input" type="text" bind:value={searchValue} on:input={updateGlobalSearch} placeholder="Type to search..." />
  </div>

  <div class="song-filters">
    <button on:click={() => (filters = !filters)} class:active={filterVisible}>
      <Svg name="filter" />
    </button>

    <Dropdown bind:isOpen={filters} id="dropdown-filters">
      <h4 class="sorting">Ordenar por</h4>

      <div class="song-filter-section">
        <button> Artist </button>
        <button> Title </button>
        <button> Date </button>
        <button> Shuffle </button>
      </div>

      <h4 class="filters">Filtros</h4>

      <div class="song-filter-section">
        <button> Cover </button>
        <button> Lyrics </button>
        <button> Repre </button>
        <button> No tags </button>
      </div>
    </Dropdown>
  </div>

  <div class="tags" class:active={tagsVisible}>
    <button on:click={() => (tagsVisible = !tagsVisible)}>
      <Svg name="tags" />
    </button>
    <Dropdown bind:isOpen={tagsVisible} id="dropdown-tags">
      <SelectTags />
    </Dropdown>
  </div>
  <button
    on:click={() => panel.update((value) => (value === 'Settings' ? '' : 'Settings'))}
    class="settings"
    class:active={settingsVisible}
  >
    <Svg name="settings" />
  </button>
</div>
