import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import type { ISong, IActiveSong } from '../../../interfaces/ISong'
import type { ITag } from '../../../interfaces/ITag'
import type { IPlaylist } from '../../../interfaces/IPlaylist'

export const playlists: Writable<IPlaylist[]> = writable([])
export const songs: Writable<ISong[]> = writable([])
export const songsFiltered: Writable<ISong[]> = writable([])
export const queue: Writable<ISong[]> = writable([])
export const panel: Writable<string> = writable('')
export const tags: Writable<ITag[]> = writable([])
export const tagsSwitch: Writable<boolean> = writable(false)
export const filterSearch: Writable<string> = writable('')
export const path: Writable<string> = writable('')
export const isPaused: Writable<boolean> = writable(true)
export const rate: Writable<number> = writable(1)
export const newRate: Writable<number> = writable(1)
export const nightRate: Writable<number> = writable(1.2)
export const slowRate: Writable<number> = writable(0.8)
export const djMode: Writable<boolean> = writable(false)
export const djModeStart: Writable<number> = writable(20)
export const djModeFinish: Writable<number> = writable(80)
export const volume: Writable<number> = writable(0.5)
export const newVolume: Writable<number> = writable(0.5)
export const selectedSongForUpdate: Writable<ISong> = writable()
export const fadeTime: Writable<number> = writable(5)
export const loop: Writable<boolean> = writable(false)
export const shuffle: Writable<boolean> = writable(false)
export const activeSong: Writable<IActiveSong> = writable({
  fileName: '',
  title: '',
  artist: '',
  tags: [],
  cover: '',
  lyrics: '',
  date: new Date(),
  howl: null,
})
