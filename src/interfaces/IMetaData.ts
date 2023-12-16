import { ITag } from './ITag'
export interface IMetaData {
  fileUrl: string // File Name
  title: string
  artist: string
  date: Date
  image: {
    description: string
  }
  genre: ITag[]
}
