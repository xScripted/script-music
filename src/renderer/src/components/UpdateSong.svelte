<script lang="ts">
  import type { ISong } from './../../../interfaces/ISong.ts'
  import type { ITag } from './../../../interfaces/ITag.ts'

  import { updatingSong, tags } from '../scripts/store'
  import Tag from './Tag.svelte'
  import InputTag from './InputTag.svelte'
  import { get } from 'svelte/store'

  let updatingSongValue

  updatingSong.subscribe((value: ISong) => (updatingSongValue = value))

  const toggleTag = (tagName: string) => {
    const tagActive = updatingSongValue.tags.find((name: string) => name === tagName)

    if (tagActive) {
      updatingSongValue.tags = updatingSongValue.tags.filter((name: string) => name != tagName)
    } else {
      updatingSongValue.tags.push(tagName)
    }
  }
</script>

<style lang="scss">
  .update-song {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .double {
      grid-column: span 2;
    }

    .form-tags {
      padding: 10px 0;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: 10px;
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: var(--radius);
      grid-row: span 2;
      object-fit: cover;
    }
  }
</style>

<div class="update-song">
  <img src={updatingSongValue.cover} alt="" />

  <div class="input-group">
    <h4>Title</h4>
    <input class="input" type="text" bind:value={updatingSongValue.title} placeholder="Title" />
  </div>

  <div class="input-group">
    <h4>Artist</h4>
    <input class="input" type="text" bind:value={updatingSongValue.artist} placeholder="Artist" />
  </div>

  <div class="input-group double">
    <h4>Cover</h4>
    <input class="input" type="text" bind:value={updatingSongValue.cover} placeholder="Artist" />
  </div>

  <div class="tags-group double">
    <h4>Tags</h4>

    <div class="form-tags">
      {#each get(tags) as tag}
        <button on:click={() => toggleTag(tag.name)}>
          <Tag {tag} active={updatingSongValue.tags.find((x) => x === tag.name)} />
        </button>
      {/each}
      <div class="input-tag-container">
        <InputTag />
      </div>
    </div>
  </div>
</div>
