<script lang="ts">
  import Utilities from './Utilities.svelte'
  import addSVG from './../assets/add.svg'
  import addQueueSVG from './../assets/queue.svg'
  import brushSVG from './../assets/brush.svg'
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
        margin-bottom: 15px;

        grid-template-columns: 75px 1fr 1fr 100px;
        border-radius: var(--radius);
        transition: 0.2s ease;
        gap: 10px;
        cursor: pointer;

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

        .more {
          display: none;
          gap: 10px;
        }

        &:hover {
          background-color: rgba(255, 255, 255, 0.35);
          transition: 0.2s ease;

          .more {
            display: flex;
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
      <div class="more">
        <img src={brushSVG} alt="" />
        <img src={addQueueSVG} alt="" />
        <img src={addSVG} alt="" />
      </div>
    </div>
  </div>
</div>
