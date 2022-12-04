import {Expose} from 'class-transformer'

export class UserExposeDto {
  @Expose()
  id: number

  @Expose()
  email: string

  @Expose()
  username: string

  @Expose()
  image_url: string

  @Expose()
  created_at: string

  @Expose()
  updated_at: string
}
