import { writable } from 'svelte/store'

export const store = {
  playlist: writable(['xd', 'uwu']),
}

export const test = writable('aaaa')
