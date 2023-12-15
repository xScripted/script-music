<script lang="ts">
  import Utilities from './Utilities.svelte'
</script>

<style lang="scss">
  .viewer {
    height: 100%;
    width: 100%;
    padding: 75px;

    background-color: rgba(255, 255, 255, 0.7);
    border-radius: var(--radius);

    .fuck-go-back {
      position: absolute;
      top: 15px;
      left: 15px;

      .back,
      .forth {
        height: 25px;
        width: 25px;
        border: none;
        border-radius: 50px;
        background-color: #363636;
      }
    }

    .header {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 25px;

      .color {
        height: 150px;
        width: 150px;
        border-radius: var(--radius);
        background: linear-gradient(330deg, #5b0eeb 0%, #6d5dfc 50%, #8abdff 100%);

        display: flex;
        justify-content: center;
        align-items: center;

        .icon {
          width: 75%;
        }
      }

      .title {
        font-size: 75px;
        font-weight: bolder;
      }
    }

    .song-list {
      margin-top: 75px;

      .song-row {
        display: grid;
        align-items: center;
        justify-content: space-between;

        grid-template-columns: 75px 1fr 1fr 50px;
        gap: 10px;

        .cover {
          height: 75px;
          width: 75px;
          border-radius: var(--radius);
        }

        .details {
          display: flex;
          flex-direction: column;

          .song-title {
            font-size: 22px;
          }

          .singer {
            font-weight: lighter;
            font-size: 18px;
          }
        }
      }
    }
  }
</style>

<div class="viewer">
  <div class="utilities">
    <div class="fuck-go-back">
      <button class="back"></button>
      <button class="forth"></button>
    </div>
    <Utilities />
  </div>
  <div class="header">
    <div class="color">
      <div class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
          ><g fill="#ffffff"
            ><path
              fill-rule="evenodd"
              d="M12 1.25a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0V2a.75.75 0 0 1 .75-.75ZM1.25 12a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1-.75-.75Zm18 0a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1-.75-.75ZM12 19.25a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 1 .75-.75Z"
              clip-rule="evenodd"
              opacity=".8"
            /><path
              d="M5.47 5.47a.75.75 0 0 1 1.06 0l.344.343a.75.75 0 0 1-1.061 1.06L5.47 6.53a.75.75 0 0 1 0-1.06Zm13.06 0a.75.75 0 0 1 0 1.06l-.343.344a.75.75 0 0 1-1.06-1.061l.343-.343a.75.75 0 0 1 1.06 0ZM6.873 17.127a.75.75 0 0 1 0 1.06l-.343.343a.75.75 0 0 1-1.06-1.06l.343-.343a.75.75 0 0 1 1.06 0Zm10.254 0a.75.75 0 0 1 1.06 0l.343.343a.75.75 0 1 1-1.06 1.06l-.343-.343a.75.75 0 0 1 0-1.06Z"
              opacity=".5"
            /><path
              d="M7 11.06c0 2.542 2.01 3.897 3.48 5.11c.52.427 1.02.83 1.52.83s1-.403 1.52-.83c1.47-1.213 3.48-2.568 3.48-5.11c0-2.543-2.75-4.346-5-1.902c-2.25-2.444-5-.64-5 1.902Z"
            /></g
          ></svg
        >
      </div>
    </div>
    <div class="title">Pa ducharme</div>
  </div>

  <div class="song-list">
    <div class="song-row">
      <img
        src="https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/d9/8e/ae/d98eaece-2460-1445-384c-e0d6299268d9/artwork.jpg/1200x1200bf-60.jpg"
        class="cover"
        alt=""
      />
      <div class="details">
        <span class="song-title">Cherry Blossom Nightmare</span>
        <span class="singer">Unlike Pluto</span>
      </div>
      <div class="tags"></div>
      <div class="pokeballs">
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"
          ><g fill="none"
            ><path
              d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"
            /><path
              fill="#363636"
              d="M5 10a2 2 0 1 1 0 4a2 2 0 0 1 0-4Zm7 0a2 2 0 1 1 0 4a2 2 0 0 1 0-4Zm7 0a2 2 0 1 1 0 4a2 2 0 0 1 0-4Z"
            /></g
          ></svg
        >
      </div>
    </div>
  </div>
</div>
