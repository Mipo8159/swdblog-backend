import {User} from '@app/modules/user/models/user.model'

export interface IAuthResponse {
  user: User
  refresh_token: string
  access_token: string
}
