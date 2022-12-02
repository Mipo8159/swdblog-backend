import {Module} from '@nestjs/common'
import {AuthController} from '@app/modules/auth/auth.controller'
import {AuthService} from '@app/modules/auth/auth.service'
import {PassportModule} from '@nestjs/passport'

import {UserModule} from '../user/user.module'
import {TokenModule} from '../token/token.module'

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),

    UserModule,
    TokenModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
