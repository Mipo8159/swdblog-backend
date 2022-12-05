import {ConfigService} from '@nestjs/config'
import {Module} from '@nestjs/common'
import {JwtModule} from '@nestjs/jwt'

import {AuthController} from '@app/modules/auth/auth.controller'
import {AuthService} from '@app/modules/auth/auth.service'
import {UserModule} from '@app/modules/user/user.module'
import {TokenModule} from '@app/modules/token/token.module'
import {JwtConfig} from '@app/config/jwt.config'
import {JwtStategy} from '@app/modules/auth/strategies/jwt.strategy'

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
