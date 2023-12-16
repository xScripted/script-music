<script lang="ts">
  import Tags from './Tags.svelte'
  import searchSVG from './../assets/search.svg'
  import filterSVG from './../assets/filter.svg'
  import tagsSVG from './../assets/tags.svg'
  import settingsSVG from './../assets/settings.svg'

  let tagsVisible: boolean = false
  let search: boolean = false
  let settingsVisible: boolean = false
  let filterVisible: boolean = false

  const tagsClick = () => {
    tagsVisible = !tagsVisible
  }

  const searchClick = () => {
    search = !search
  }

  const settingsClick = () => {
    settingsVisible = !settingsVisible
  }

  const filterClick = () => {
    filterVisible = !filterVisible
  }
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

    .tags {
      position: relative;
    }
  }
</style>

<div class="container">
  <div class="search" class:active={search}>
    <button on:click={searchClick}>
      <img src={searchSVG} alt="" />
    </button>
    <input class="search-input" type="text" name="" id="" placeholder="Type to search..." />
  </div>
  <div class="filter" class:active={filterVisible}>
    <button on:click={filterClick}>
      <img src={filterSVG} alt="" />
    </button>
  </div>
  <div class="tags" class:active={tagsVisible}>
    <button on:click={tagsClick}>
      <img src={tagsSVG} alt="" />
    </button>

    {#if tagsVisible}
      <Tags />
    {/if}
  </div>
  <div class="settings" class:active={settingsVisible}>
    <button on:click={settingsClick}>
      <img src={settingsSVG} alt="" />
    </button>
  </div>
</div>
