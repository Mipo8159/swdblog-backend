import {ConfigService} from '@nestjs/config'
import {Module} from '@nestjs/common'
import {AuthController} from '@app/modules/auth/auth.controller'
import {AuthService} from '@app/modules/auth/auth.service'
import {UserModule} from '../user/user.module'
import {TokenModule} from '../token/token.module'
import {JwtModule} from '@nestjs/jwt'
import {JwtConfig} from '@app/config/jwt.config'
import {JwtStategy} from './strategies/jwt.strategy'

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: JwtConfig,
    }),
    UserModule,
    TokenModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStategy],
  exports: [JwtModule],
})
export class AuthModule {}
