import {BadRequestException, Injectable} from '@nestjs/common'
import {UserService} from '../user/user.service'
import {LoginDto} from './dto/login.dto'
import {RegisterDto} from './dto/register.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(dto: RegisterDto) {
    const user = await this.userService.findByEmail(dto.email)
    if (user) throw new BadRequestException('Email in taken')

    const salt = await bcrypt.genSalt()
    const hashed = await bcrypt.hash(dto.password, salt)

    return this.userService.create({
      email: dto.email,
      username: dto.username,
      password: hashed,
      image_url: dto.image_url,
    })
  }

  async login(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email)
    if (!user) throw new BadRequestException('Invalid credentials')

    const isMatch = await bcrypt.compare(dto.password, user.password)
    if (!isMatch) throw new BadRequestException('Invalid credentials')

    return user
  }
}
