import type { IActiveSong, ISong } from '../../../interfaces/ISong'
import type { ITag } from '../../../interfaces/ITag'
import {
  playlistFiltered,
  playlist,
  filterSearch,
  path,
  activeSong,
  isPaused,
  rate,
  volume,
  tags,
  tagsSwitch,
  fadeTime,
  loop,
  random,
} from './store'
import { get } from 'svelte/store'
import { Howl, Howler } from 'howler'

let history: string[] = []
let historyIndex: number = 0
let timeoutID

const isInStoreTags = (songTagName: string, activeTags: ITag[]): boolean => {
  return activeTags.some((storeTag: ITag) => storeTag.name === songTagName)
}

//usar el Howler.pool para la lista de sonidos inactivos (autoplay)
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
  next(activeSong: IActiveSong) {
    //si la variable del loop está on, vuelve a tirar el play con la misma canción
    if (get(loop)) {
      player.play(activeSong.fileName)
      return
    }
    //si la variable del random está on, las canciones de la cola son intocables, se pone random cuando acaban dichas canciones
    //Si random = on && no hay canciones en la cola -> busca una canción aleatoria del playlistFilter
    //Si no hay nada puesto, poner la siguiente canción disponible del playlistFilter (posición 0)
    //crear una constante: number = playlistFilter.indexOf (buscar el fileName de la canción actual en la playlist)
    //const nextSongID: number = (playlistFilter.indexOf() + 1) y if(no excede el playlistFilter.length) -> player.play(playlistFilter[nextSongID].fileName) else player.play(playlistFilter[0].fileName)

    const nextSongID: number = get(playlistFiltered).indexOf(activeSong) + 1

    if (nextSongID <= get(playlistFiltered).length) player.play(get(playlistFiltered)[nextSongID].fileName)
    player.play(get(playlistFiltered)[0].fileName)

    //cuando hagáis pruebas, Miquel y Laia del futuro, os daréis cuenta de los errores con el activeSong de la progressBar.svelte 👍

    console.log('playlistFiltered: ', get(playlistFiltered))
    console.log('nextSongID: ', nextSongID)
    console.log('-------------------------------------')
  },
}
