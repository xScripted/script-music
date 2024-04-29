<script lang="ts">
  export let image: string
  export let title: string
  export let active: boolean
</script>

<style lang="scss">
  .card {
    height: 75px;
    width: 100%;

    border: none;
    border-radius: var(--radius);
    background-color: rgba(255, 255, 255, 0.3);

    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;

    overflow: hidden;
    cursor: pointer;

    span {
      width: 100%;
      font-size: 20px;

      display: flex;
      justify-content: left;
      align-items: center;

      padding-left: 20px;
    }

    .photo {
      width: 75px;
      height: 75px;
      overflow: hidden;

      display: flex;
      justify-content: center;
      flex-shrink: 0;

      object-fit: cover;
    }
  }
</style>

<div class="card" class:active>
  <img class="photo" src={image} alt="" />
  <span>{title}</span>
</div>
