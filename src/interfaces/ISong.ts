import type { ITag } from './ITag'

export interface ISong {
  fileName: string
  title?: string
  artist?: string
  tags?: ITag[]
  cover?: string
  lyrics?: string
}
