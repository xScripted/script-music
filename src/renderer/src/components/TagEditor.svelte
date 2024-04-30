<script lang="ts">
  import type { IMetaData } from '@interfaces/IMetaData'
  import type { ISong } from '@interfaces/ISong'
  import type { ITag } from '@interfaces/ITag'
  import { tags, songs } from '@/constants/godStore'
  import Tag from '@/components/Tag.svelte'
  import Button from '@/components/Button.svelte'
  import { get } from 'svelte/store'

  let tagsValue: ITag[] = []

  tags.subscribe((value) => (tagsValue = value))

  const updateColor = (tag: ITag, i: number) => {
    tags.update(() => {
      const tagsCopy = get(tags)
      tagsCopy[i].color = tag.color

      window.localStorage.setItem('tags', JSON.stringify(tagsCopy))

      return tagsCopy
    })
  }

  const removeTag = (i: number) => {
    tags.update(() => {
      const tagsCopy = get(tags).filter((_, i2: number) => i2 != i)

      get(songs).map((song: ISong) => {
        const songTagsCleared = song.tags.filter((tagName: string) => tagName != get(tags)[i].name)

        const metaData: IMetaData = {
          fileUrl: song.fileName,
          title: song.title,
          artist: song.artist,
          date: song.date,
          subtitle: song.cover,
          genre: JSON.stringify(songTagsCleared),
        }

        window.electron.ipcRenderer.invoke('write-meta-data', { fileName: song.fileName, metaData })
      })

      window.localStorage.setItem('tags', JSON.stringify(tagsCopy))

      return tagsCopy
    })
  }
</script>

<style lang="scss">
  .tag-list {
    .tag-group {
      padding: 5px 0;
      display: flex;
      gap: 20px;

      input {
        transition: 0.3s ease;
        height: 35px;
        border: 0;
        overflow: hidden;
        box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.3);
        border-radius: 5px;
        cursor: pointer;

        &:hover {
          transition: 0.3s ease;
          transform: scale(0.9);
        }
      }

      input[type='color']::-moz-color-swatch {
        border: none;
      }

      input[type='color']::-webkit-color-swatch-wrapper {
        padding: 0;
        border-radius: 0;
      }

      input[type='color']::-webkit-color-swatch {
        border: none;
      }

      :global(.tag) {
        width: 100px;
      }
    }
  }
</style>

<div class="tag-list">
  {#each tagsValue as tag, i (i)}
    <div class="tag-group">
      <Tag {tag} active />
      <input type="color" bind:value={tag.color} on:input={() => updateColor(tag, i)} />
      <Button click={() => removeTag(i)}>Borrar</Button>
    </div>
  {/each}
</div>
