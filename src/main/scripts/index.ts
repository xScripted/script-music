import { downloadVideo, getVideoTitle } from 'yt-get'
import fs from 'fs'
import id3 from 'node-id3'

export const downloadSong = async (youtubeUrl: string): Promise<string> => {
  if (!youtubeUrl) return ''
  await downloadVideo(youtubeUrl)

  return await getVideoTitle(youtubeUrl)
}

export const writeMetaData = async ({ fileName, metaData }) => {
  const path = await process.cwd()
  const filePath = `${path}/music/${fileName}.mp3`

  id3.write(metaData, filePath)
}

export const readMetaData = async (fileName: string) => {
  const path = await process.cwd()
  const filePath = `${path}/music/${fileName}.mp3`

  return id3.Promise.read(filePath)
}

export const getSongFileNames = async () => {
  const path = await process.cwd()
  const directoryPath = `${path}/music/`

  return await fs.readdirSync(directoryPath)
}
