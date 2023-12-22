import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import type { ISong, IActiveSong } from '../../../interfaces/ISong'
import type { ITag } from '../../../interfaces/ITag'

export const playlist: Writable<ISong[]> = writable([])
export const playlistFiltered: Writable<ISong[]> = writable([])
export const panel: Writable<string> = writable('')
export const tags: Writable<ITag[]> = writable([])
export const filterSearch: Writable<string> = writable('')
export const path: Writable<string> = writable('')
export const isPaused: Writable<boolean> = writable(true)
export const rate: Writable<number> = writable(1)
export const volume: Writable<number> = writable(0.5)
export const activeSong: Writable<IActiveSong> = writable({
  fileName: '',
  title: '',
  artist: '',
  tags: [],
  cover: '',
  lyrics: '',
  howl: null,
})
