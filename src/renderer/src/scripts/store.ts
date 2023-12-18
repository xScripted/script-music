import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import type { ISong } from '../../../interfaces/ISong'
import type { ITag } from '../../../interfaces/ITag'

export const playlist: Writable<ISong[]> = writable([])
export const panel: Writable<string> = writable('')
export const tags: Writable<ITag[]> = writable([])
export const activeSong: Writable<ISong> = writable({
  fileName: '',
  title: '',
  artist: '',
  tags: [],
  cover: '',
  lyrics: '',
})
