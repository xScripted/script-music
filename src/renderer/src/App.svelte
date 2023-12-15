<script lang="ts">
  import Player from './components/Player.svelte'
  import Viewer from './components/Viewer.svelte'
  import Menu from './components/Menu.svelte'
  import Utilities from './components/Utilities.svelte'
</script>

<style lang="scss">
  .wrapper {
    height: 100vh;
    width: 100%;

    position: relative;
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-template-rows: 1fr 100px;

    background-color: #cf6b9b;
    color: #363636;

    .bottom {
      grid-column: 1/3;
      position: relative;
      margin-right: 10px;
      margin-bottom: 10px;
    }

    .right {
      margin: 10px;
      position: relative;
    }

    .left {
      position: relative;
    }
  }
</style>

<div class="wrapper">
  <div class="left">
    <Menu />
  </div>
  <div class="right">
    <Viewer />
  </div>
  <div class="bottom">
    <Player />
  </div>
</div>
