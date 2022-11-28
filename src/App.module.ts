import {Module} from '@nestjs/common'
import {ConfigModule, ConfigService} from '@nestjs/config'
import {SequelizeModule} from '@nestjs/sequelize'
import {ConnectSequelize} from '@app/config/sequalize.config'

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
  ],
})
export class AppModule {}
