import {Expose} from 'class-transformer'

export class UserExposeDto {
  @Expose()
  email: string

  @Expose()
  username: string

  @Expose()
  image_url: string
}
