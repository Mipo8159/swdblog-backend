import {ConfigService} from '@nestjs/config'
import {SequelizeModuleOptions} from '@nestjs/sequelize'

export const ConnectSequelize = async (
  configService: ConfigService,
): Promise<SequelizeModuleOptions> => ({
  dialect: configService.get<'postgres' | 'mysql'>('DB_TYPE'),
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  models: [],
  autoLoadModels: true,
})
