import {Module, ValidationPipe} from '@nestjs/common'
import {ConfigModule, ConfigService} from '@nestjs/config'
import {SequelizeModule} from '@nestjs/sequelize'
import {ConnectSequelize} from '@app/config/sequalize.config'
import {UserModule} from './modules/user/user.module'
import {TokenModule} from './modules/token/token.module'
import {AuthModule} from './modules/auth/auth.module'
import {APP_PIPE} from '@nestjs/core'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
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
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
