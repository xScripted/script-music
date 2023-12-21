import type { ITag } from './ITag'
import type { Howl } from 'howler'

export interface ISong {
  fileName: string
  title: string
  artist: string
  tags: ITag[]
  cover: string
  lyrics: string
}

export interface IActiveSong extends ISong {
  howl?: Howl | null
}
