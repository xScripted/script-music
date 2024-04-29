<script lang="ts"></script>

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

      img {
        object-fit: cover;
        width: 100%;
      }
    }
  }
</style>

<div class="card">
  <div class="photo">
    <img
      src="https://imagenes.elpais.com/resizer/v2/SDSYXXO6PZBEVCPJF4STF6ORXI.jpg?auth=e2ddf0ed67d6f2dfc90dc91aeffe698e0f73b01dc60740c4a3f3654f257bb7f9&width=414"
      alt=""
    />
  </div>
  <span>Hola</span>
</div>
