<script lang="ts">
  import { tags } from '@/scripts/store'
  import { get } from 'svelte/store'
  import type { ITag } from '@interfaces/ITag'

  export let tag: ITag = {}
  export let tagName: string = ''
  export let active: boolean = false

  let tagsValue = get(tags)

  tags.subscribe((value: ITag[]) => (tagsValue = value))

  if (tagName) tag = tagsValue.find((storeTag: ITag) => storeTag.name === tagName)
</script>

<style lang="scss">
  .tag {
    transition: 0.3s ease;
    position: relative;
    border-radius: 6px;
    padding: 5px 10px;
    background-color: white;
    overflow: hidden;
    display: flex;
    align-items: center;
    opacity: 0.5;
    transform: scale(0.9);

    &.active {
      transition: 0.3s ease;
      transform: scale(1);

      box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.3);
      opacity: 1;
    }

    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.2;
    }

    span {
      position: relative;
      font-size: 14px;
      z-index: 1;
    }
  }
</style>

<div class="tag" class:active>
  <span>
    {tag?.name}
  </span>
  <div class="bg" style="background-color: {tag?.color}" />
</div>
