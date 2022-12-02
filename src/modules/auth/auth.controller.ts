import {Serialize} from '@app/shared/interceptors/serialize.interceptor'
import {Body, Controller, Post} from '@nestjs/common'
import {AuthService} from '@app/modules/auth/auth.service'
import {LoginDto} from '@app/modules/auth/dto/login.dto'
import {RegisterDto} from '@app/modules/auth/dto/register.dto'
import {AuthExposeDto} from '@app/modules/auth/dto/auth_expose.dto'

@Controller('auth')
@Serialize(AuthExposeDto)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body('register') dto: RegisterDto) {
    return this.authService.register(dto)
  }

  @Post('login')
  login(@Body('login') dto: LoginDto) {
    return this.authService.login(dto)
  }
}
