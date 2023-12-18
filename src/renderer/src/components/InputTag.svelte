<script lang="ts">
  import type { ITag } from './../../../interfaces/ITag.ts'
  import { tags } from '../scripts/store'
  import { get } from 'svelte/store'

  let name: string = ''
  let color: string = ''

  const createTag = () => {
    const tag: ITag = {
      name,
      color,
    }

    tags.update((tags: ITag[]) => [...tags, tag])

    window.localStorage.setItem('tags', JSON.stringify(get(tags)))
  }

  const handleKeydown = (e) => (e.key === 'Enter' ? createTag() : null)
</script>

<style lang="scss">
  .new-tag {
    height: 35px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;

    background-color: inherit;
    border-radius: 10px;
    gap: 10px;
    padding: 8px 10px;

    box-shadow: inset 0 0 10px 0px rgba(0, 0, 0, 0.2);
    .tag {
      background-color: inherit;
      outline: none;
      border: none;
      width: 100px;
      padding: 5px;
    }

    .separation {
      height: 120%;
      width: 1px;
      background-color: gray;
    }

    .color-input {
      position: relative;
      height: 20px;
      width: 20px;
      overflow: hidden;
      border-radius: 4px;

      .square,
      .color {
        position: absolute;
        margin: 0 auto;
        top: 0;
        right: 0;
        width: 24px;
        height: 24px;
      }

      .square {
        background: linear-gradient(330deg, #5b0eeb 0%, #6d5dfc 50%, #8abdff 100%);
      }

      .color {
        opacity: 0;
        cursor: pointer;
      }
    }
  }
</style>

<div class="new-tag">
  <button on:click={createTag}>
    <svg class="add" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#808080">
      <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
    </svg>
  </button>
  <input type="text" class="tag" placeholder="New tag" bind:value={name} on:keydown={handleKeydown} />
  <div class="separation" />
  <div class="color-input">
    <div class="square" style="background: {color}" />
    <input type="color" class="color" bind:value={color} />
  </div>
</div>
