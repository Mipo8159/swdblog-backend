import {MiddlewareConsumer, Module} from '@nestjs/common'
import {ConfigModule, ConfigService} from '@nestjs/config'
import {SequelizeModule} from '@nestjs/sequelize'
import {APP_PIPE} from '@nestjs/core'
import * as cookieParser from 'cookie-parser'

import {ConnectSequelize} from '@app/config/sequalize.config'
import {UserModule} from '@app/modules/user/user.module'
import {TokenModule} from '@app/modules/token/token.module'
import {AuthModule} from '@app/modules/auth/auth.module'
import {JoiValidation} from '@app/config/joi.config'
import {UserMiddleware} from '@app/modules/user/middlewares/user.middleware'
import {BackendValidationPipe} from '@app/shared/pipes/validation.pipe'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      validationSchema: JoiValidation(),
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: ConnectSequelize,
    }),
    AuthModule,
    UserModule,
    TokenModule,
  ],

  providers: [
    {
      provide: APP_PIPE,
      useClass: BackendValidationPipe,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cookieParser())
      .forRoutes('*')
      .apply(UserMiddleware)
      .forRoutes('*')
  }
}
