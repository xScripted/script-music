<script lang="ts">
  import InputTag from './InputTag.svelte'
  import { tags } from '../scripts/store'
  import Tag from './Tag.svelte'
  import type { ITag } from './../../../interfaces/ITag.ts'

  let tagsValue = []

  tags.subscribe((value) => (tagsValue = value))

  const toggleTag = (tagName: string) => {
    tags.update((value: ITag[]) => {
      return value.map((tag: ITag) => {
        if (tag.name === tagName) tag.active = !tag.active

        return tag
      })
    })
  }

  let allActive: boolean = false
  const toggleAllTags = () => {
    allActive = !allActive

    tags.update((value: ITag[]) => {
      return value.map((tag: ITag) => {
        tag.active = allActive
        return tag
      })
    })
  }

  let active: boolean = false
</script>

<style lang="scss">
  .container {
    width: 270px;
    height: fit-content;
    gap: 15px;
    display: flex;
    padding: 20px;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 0.7);
    box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    border-radius: var(--radius);
    position: absolute;
    z-index: 2;

    top: 35px;
    right: -45px;

    .upper {
      width: 100%;
      height: fit-content;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .switch {
        transition: 0.3s ease;
        height: 25px;
        width: 48px;
        border-radius: 50px;
        display: flex;
        align-items: center;
        border: none;
        cursor: pointer;
        background: linear-gradient(330deg, #ebebeb 0%, #ebebeb 50%, #ebebeb 100%);

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
        }

        &.active {
          transition: 0.3s ease;
          background: linear-gradient(330deg, #5b0eeb 0%, #6d5dfc 50%, #8abdff 100%);

          .circle {
            transform: translateX(23px);
            background: #ebebeb;
          }
        }
      }
    }

    .tags {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: 10px;
    }
  }
</style>

<div class="container">
  <div class="upper">
    <button on:click={toggleAllTags}>{allActive ? 'Unselect all tags' : 'Select all tags'} </button>
    <button class="switch" class:active on:click={() => (active = !active)}>
      <div class="circle" />
    </button>
  </div>
  <div class="tags">
    {#each tagsValue as tag}
      <button on:click={() => toggleTag(tag.name)}>
        <Tag {tag} />
      </button>
    {/each}
  </div>
  <InputTag />
</div>
