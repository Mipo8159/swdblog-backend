import {Expose, Type} from 'class-transformer'

class UserMock {
  @Expose() id: string
  @Expose() email: string
  @Expose() username: string
  @Expose() image_url: string
  @Expose() active: boolean
}

export class AuthExposeDto {
  @Type(() => UserMock)
  @Expose()
  user: UserMock

  @Expose()
  access_token: string

  @Expose()
  refresh_token: string
}
