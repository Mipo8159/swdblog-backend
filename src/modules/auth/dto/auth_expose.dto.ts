import {Expose} from 'class-transformer'

export class AuthExposeDto {
  @Expose()
  email: string

  @Expose()
  username: string

  @Expose()
  image_url: string
}
