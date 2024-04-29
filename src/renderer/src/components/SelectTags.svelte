<script lang="ts">
  import InputTag from '@/components/InputTag.svelte'
  import { tags } from '@/scripts/store'
  import { player } from '@/scripts/player'
  import Tag from '@/components/Tag.svelte'
  import type { ITag } from '@interfaces/ITag'
  import { tagsSwitch } from '@/scripts/store'

  let tagsValue: ITag[] = []
  let tagsSwitchValue: boolean = false

  tags.subscribe((value: ITag[]) => (tagsValue = value))
  tagsSwitch.subscribe((value: boolean) => (tagsSwitchValue = value))

  const toggleTag = (tagName: string) => {
    tags.update((value: ITag[]) => {
      return value.map((tag: ITag) => {
        if (tag.name === tagName) {
          tag.active = !tag.active
        }

        return tag
      })
    })

    player.filter()
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

    player.filter()
  }

  const toggleSwitch = () => {
    tagsSwitch.update((value) => {
      return !value
    })

    player.filter()
  }
</script>

<style lang="scss">
  .select-tags {
    .select:hover {
      //color: #6d5dfc;
      background: linear-gradient(330deg, #5b0eeb 0%, #6d5dfc 50%, #8abdff 100%);
    }

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
        border: 1px solid lightgrey;

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
      grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
      gap: 10px;
      padding: 20px 0;
    }
  }
</style>

<div class="select-tags">
  <div class="upper">
    <button class="select" on:click={toggleAllTags}>
      {allActive ? 'Unselect all tags' : 'Select all tags'}
    </button>
    <button class="switch" class:active={tagsSwitchValue} on:click={toggleSwitch}>
      <div class="circle" />
    </button>
  </div>
  <div class="tags">
    {#each tagsValue as tag}
      <button on:click={() => toggleTag(tag.name)}>
        <Tag {tag} active={tag.active} />
      </button>
    {/each}
  </div>
  <InputTag />
</div>
