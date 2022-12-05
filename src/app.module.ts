import {MiddlewareConsumer, Module} from '@nestjs/common'
import {ConfigModule, ConfigService} from '@nestjs/config'
import {SequelizeModule} from '@nestjs/sequelize'
import {ConnectSequelize} from '@app/config/sequalize.config'
import {UserModule} from './modules/user/user.module'
import {TokenModule} from './modules/token/token.module'
import {AuthModule} from './modules/auth/auth.module'
import {APP_PIPE} from '@nestjs/core'
import {JoiValidation} from './config/joi.config'
import {UserMiddleware} from './modules/user/middlewares/user.middleware'
import {BackendValidationPipe} from './shared/pipes/validation.pipe'
import * as cookieParser from 'cookie-parser'

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
