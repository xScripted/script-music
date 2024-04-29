<script lang="ts">
  let image: string = 'https://upload.wikimedia.org/wikipedia/en/c/c4/Falling_in_Reverse_–_Popular_Monster.jpeg'
  let titleArray: string[] = ['Hola', 'adios']
  let canciones: number = 123

  let title: string = titleArray.join(' + ')
</script>

<style lang="scss">
  .playlist-header-container {
    height: fit-content;
    display: flex;
    align-items: center;
    gap: 25px;

    .photo {
      height: 150px;
      width: 150px;
      border-radius: var(--radius);
      object-fit: cover;
    }

    .header {
      display: flex;
      flex-direction: column;

      .title {
        font-size: 75px;
        font-weight: bolder;
        color: #363636;

        border: none;
        outline: none;
        background-color: transparent;
      }
    }
  }
</style>

<div class="playlist-header-container">
  <img class="photo" src={image} alt="" />
  <div class="header">
    <input type="text" class="title" bind:value={title} spellcheck="false" />
    <span class="song-number">{canciones} canciones</span>
  </div>
</div>
