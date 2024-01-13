import type { IActiveSong, ISong } from '../../../interfaces/ISong'
import type { ITag } from '../../../interfaces/ITag'
import { playlistFiltered, playlist, filterSearch, path, activeSong, isPaused, rate, volume, tags, tagsSwitch, fadeTime } from './store'
import { get } from 'svelte/store'
import { Howl, Howler } from 'howler'

let history: string[] = []
let historyIndex: number = 0
let timeoutID

const isInStoreTags = (songTagName: string, activeTags: ITag[]): boolean => {
  return activeTags.some((storeTag: ITag) => storeTag.name === songTagName)
}

export const player = {
  filter() {
    playlistFiltered.update(() => {
      const activeTags: ITag[] = get(tags).filter((tag: ITag) => tag.active)
      return get(playlist).filter((song: ISong) => {
        // Search
        let songTitle: string = song.title.toLowerCase()
        let songArtist: string = song.artist.toLowerCase()

        const includeTitle: boolean = songTitle.includes(get(filterSearch).toLowerCase())
        const includeArtist: boolean = songArtist.includes(get(filterSearch).toLowerCase())

        // Tags
        const isAnyTagActive: boolean = song.tags.some((tagName: string) => isInStoreTags(tagName, activeTags)) // Miramos si algun tag de la cancion coincide con algun tag activo
        const allTagsActive: boolean = song.tags.every((tagName: string) => isInStoreTags(tagName, activeTags)) // Miramos si TODOS los tags de la cancion coincide con algun tag activo
        const filterTags = get(tagsSwitch) ? isAnyTagActive : allTagsActive
        console.log(song.title, isAnyTagActive, allTagsActive)
        return (includeTitle || includeArtist) && filterTags
      })
    })
  },
  play(fileName: string, isHistory: boolean = false) {
    const howlsList = (Howler as any)._howls

    if (howlsList.length === 1) {
      timeoutID = setTimeout(() => howlsList[0].unload(), get(fadeTime) * 1000)
      howlsList[0].fade(get(volume), 0, get(fadeTime) * 1000)
    }

    if (howlsList.length === 2) {
      howlsList[0].unload()
      clearTimeout(timeoutID)
      timeoutID = setTimeout(() => howlsList[0].unload(), get(fadeTime) * 1000)
      howlsList[0].fade(get(volume), 0, get(fadeTime) * 1000)
    }

    //👍

    const howl = new Howl({
      src: [get(path) + fileName],
      rate: get(rate),
      volume: get(volume),
      onend: () => isPaused.update(() => true),
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
          date: song.date,
          howl,
        }

        activeSong.update(() => newActiveSong)
      },
    })

    howl.play()

    if (!isHistory) {
      history = history.slice(0, historyIndex + 1)
      history.push(fileName)
      if (history.length > 1) historyIndex++
    }
  },

  pause() {
    get(activeSong).howl ? get(activeSong).howl.pause() : null
  },
  resume() {
    get(activeSong).howl ? get(activeSong).howl.play() : null
  },

  back() {
    if (historyIndex) historyIndex--

    player.play(history[historyIndex], true)
  },
  forth() {
    if (historyIndex < history.length) historyIndex++

    player.play(history[historyIndex], true)
  },
}
