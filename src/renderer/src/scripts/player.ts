import type { IActiveSong, ISong } from '../../../interfaces/ISong'
import type { ITag } from '../../../interfaces/ITag'
import { playlistFiltered, playlist, filterSearch, path, activeSong, isPaused, rate, volume, tags } from './store'
import { get } from 'svelte/store'
import { Howl, Howler } from 'howler'

export const player = {
  filter() {
    playlistFiltered.update(() => {
      return get(playlist).filter((song: ISong) => {
        // Search
        const includeTitle: boolean = song.title.includes(get(filterSearch))
        const includeArtist: boolean = song.title.includes(get(filterSearch))

        // Tags
        const activeTags: ITag[] = get(tags).filter((tag: ITag) => tag.active)

        let isAnyTagActive = true
        if (activeTags.length) {
          const isInStoreTags = (songTagName: string): boolean => {
            return activeTags.some((storeTag: ITag) => storeTag.name === songTagName)
          }

          isAnyTagActive = song.tags.some((songTag: ITag) => isInStoreTags(songTag.name))
        }

        return (includeTitle || includeArtist) && isAnyTagActive
      })
    })
  },
  play(fileName: string) {
    if (get(activeSong).howl) get(activeSong).howl.unload()

    const howl = new Howl({
      src: [get(path) + fileName],
      rate: get(rate),
      volume: get(volume),
      onend: () => isPaused.update(() => true),
      onstop: () => isPaused.update(() => true),
      onpause: () => isPaused.update(() => true),
      onplay: () => {
        isPaused.update(() => false)

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
      },
    })

    howl.play()
  },
  pause() {
    get(activeSong).howl ? get(activeSong).howl.pause() : null
  },
  resume() {
    get(activeSong).howl ? get(activeSong).howl.play() : null
  },
}
