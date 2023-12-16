<script lang="ts">
  import InputTag from './InputTag.svelte'

  let active: boolean = false
</script>

<style lang="scss">
  .container {
    width: 235px;
    height: fit-content;
    gap: 15px;
    display: flex;
    padding: 10px;
    flex-direction: column;
    background-color: #ebebeb;
    border: 1px solid gray;
    border-radius: var(--radius);
    position: absolute;

    top: 35px;
    right: -45px;

    .upper {
      width: 100%;
      height: fit-content;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .switch {
        height: 25px;
        width: 48px;
        border-radius: 50px;
        display: flex;
        align-items: center;

        background: #ebebeb;
        box-shadow:
          3px 3px 5px #bebebe,
          -3px -3px 5px #ffffff;

        .circle {
          border: none;

          height: 19px;
          width: 19px;
          margin: 3px;
          border-radius: 50px;
          transition: 0.35s ease;
          background: linear-gradient(330deg, #5b0eeb 0%, #6d5dfc 50%, #8abdff 100%);
          cursor: pointer;
        }

        &.active {
          background: linear-gradient(330deg, #5b0eeb 0%, #6d5dfc 50%, #8abdff 100%);

          .circle {
            transform: translateX(23px);
            background: #ebebeb;
          }
        }
      }
    }

    .tags {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
  }
</style>

<div class="container">
  <div class="upper">
    <label><input type="checkbox" name="select" id="" /> Select all </label>
    <div class="switch" class:active>
      <button class="circle" on:click={() => (active = !active)} />
    </div>
  </div>
  <div class="tags">
    <label> <input type="checkbox" id="cbox1" value="first_checkbox" /> Este es mi primer checkbox </label>
    <label> <input type="checkbox" id="cbox1" value="second_checkbox" /> Este es mi segundo checkbox </label>
    <label> <input type="checkbox" id="cbox1" value="third_checkbox" /> Este es mi tercer checkbox </label>
    <label> <input type="checkbox" id="cbox1" value="fourth_checkbox" /> Este es mi cuarto checkbox </label>
  </div>
  <InputTag />
</div>
