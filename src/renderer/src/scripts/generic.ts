import { player } from '@/scripts/player'
import { songs, songsFiltered } from '@/constants/godStore'
import type { ISong } from '@interfaces/ISong'

export const setAllSongs = async () => {
  const fileNames: string[] = await window.electron.ipcRenderer.invoke('get-song-file-names')

  let allSongs: ISong[] = []
  let tagsFromSongs: any = new Set()

  await Promise.all(
    fileNames.map(async (fileName: string) => {
      let metaSong = await window.electron.ipcRenderer.invoke('read-meta-data', fileName)

      const song: ISong = {
        fileName: fileName,
        title: metaSong.title || fileName,
        artist: metaSong.artist || '',
        tags: JSON.parse(metaSong.genre || '[]'),
        date: metaSong.date,
        cover: metaSong.subtitle || '',
        lyrics: '',
      }

      for (let tag of song.tags) tagsFromSongs.add(tag)

      allSongs.push(song)
    })
  )

  for (let tag of tagsFromSongs) {
    player.createTag(tag, '#FFFFFF')
  }

  songs.set(allSongs)
  songsFiltered.set(allSongs)
}
