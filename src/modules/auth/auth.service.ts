import {BadRequestException, Injectable} from '@nestjs/common'
import {LoginDto} from './dto/login.dto'
import {RegisterDto} from './dto/register.dto'
import * as bcrypt from 'bcrypt'
import {UserService} from '../user/user.service'
import {TokenService} from '../token/token.service'
import {IAuthResponse} from './interfaces/auth.response.interface'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async register(dto: RegisterDto): Promise<IAuthResponse> {
    const {email, username, password, image_url} = dto

    /* check email */
    const exists = await this.userService.findUserByEmail(email)
    if (exists) throw new BadRequestException('Email in taken')

    /* hash password */
    const salt = await bcrypt.genSalt()
    const hashed = await bcrypt.hash(password, salt)

    /* save user to database */
    const user = await this.userService.saveUser({
      email,
      username,
      password: hashed,
      image_url,
    })

    /* generate tokens and save refresh_token to database */
    const {access_token, refresh_token} =
      await this.tokenService.generateTokens({
        id: user.id,
        email: user.email,
      })
    // await this.tokenService.saveToken(user.id, refresh_token)

    return {
      user,
      access_token,
      refresh_token,
    }
  }

  async login(dto: LoginDto) {
    /* check user */
    const user = await this.userService.findUserByEmail(dto.email)
    if (!user) throw new BadRequestException('Invalid credentials')

    /* check password */
    const isMatch = await bcrypt.compare(dto.password, user.password)
    if (!isMatch) throw new BadRequestException('Invalid credentials')

    /* generate tokens and save refresh_token to database */
    const {access_token, refresh_token} =
      await this.tokenService.generateTokens({
        id: user.id,
        email: user.email,
      })
    await this.tokenService.saveToken(user.id, refresh_token)

    return {
      user,
      access_token,
      refresh_token,
    }
  }
}
