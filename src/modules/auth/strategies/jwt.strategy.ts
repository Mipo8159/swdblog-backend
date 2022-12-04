import {PassportStrategy} from '@nestjs/passport'
import {Injectable, UnauthorizedException} from '@nestjs/common'
import {ExtractJwt, Strategy} from 'passport-jwt'
import {IJwtPayload} from '@app/modules/token/interfaces/jwt_payload.interface'
import {UserService} from '@app/modules/user/user.service'
import {ConfigService} from '@nestjs/config'

@Injectable()
export class JwtStategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'),
    })
  }

  async validate(payload: IJwtPayload): Promise<any> {
    const {email} = payload
    const user = await this.userService.findUserByEmail(email)

    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
