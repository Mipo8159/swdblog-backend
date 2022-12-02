import {Module} from '@nestjs/common'
import {SequelizeModule} from '@nestjs/sequelize'
import {TokenService} from './token.service'
import {User} from '@app/modules/user/models/user.model'
import {Token} from '@app/modules/token/models/token.model'
import {TokenRepository} from './repositories/token.repository'
import {JwtModule} from '@nestjs/jwt'
import {ConfigService} from '@nestjs/config'

@Module({
  imports: [
    SequelizeModule.forFeature([User, Token]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: config.get<string>('JWT_ACCESS_EXPIRE'),
        },
      }),
    }),
  ],
  providers: [TokenService, TokenRepository],
  exports: [TokenService],
})
export class TokenModule {}
