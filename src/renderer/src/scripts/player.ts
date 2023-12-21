import type { IActiveSong, ISong } from '../../../interfaces/ISong'
import { playlistFiltered, playlist, filterSearch, path, activeSong, isPaused } from './store'
import { get } from 'svelte/store'
import { Howl, Howler } from 'howler'

export const player = {
  filter() {
    playlistFiltered.update(() => {
      return get(playlist).filter((song: ISong) => {
        const includeTitle: boolean = song.title.includes(get(filterSearch))
        const includeArtist: boolean = song.title.includes(get(filterSearch))

        return includeTitle || includeArtist
      })
    })
  },
  play(fileName: string) {
    if (get(activeSong).howl) get(activeSong).howl.unload()

    const howl = new Howl({
      src: [get(path) + fileName],
      rate: 1,
      volume: 0.2,
      onplay: () => isPaused.update(() => false),
      onend: () => isPaused.update(() => true),
      onstop: () => isPaused.update(() => true),
      onpause: () => isPaused.update(() => true),
    })

    const song: ISong = get(playlist).find((song: ISong) => song.fileName === fileName)

    const newActiveSong: IActiveSong = {
      fileName: song.fileName,
      title: song.title,
      artist: song.artist,
      tags: song.tags,
      cover: song.cover,
      lyrics: song.lyrics,
      howl,
    }

    activeSong.update(() => newActiveSong)

    howl.play()
  },
  pause() {
    get(activeSong).howl ? get(activeSong).howl.pause() : null
  },
  resume() {
    get(activeSong).howl ? get(activeSong).howl.play() : null
  },
}
