import {ConfigService} from '@nestjs/config'
import {SequelizeModuleOptions} from '@nestjs/sequelize'
import {Sequelize} from 'sequelize-typescript'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import {User} from '@app/modules/user/models/user.model'
import {Token} from '@app/modules/token/models/token.model'

// CONNECT TO DATABASE
export const ConnectSequelize = async (
  configService: ConfigService,
): Promise<SequelizeModuleOptions> => ({
  dialect: configService.get<'postgres' | 'mysql'>('DB_TYPE'),
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  models: [User, Token],
  autoLoadModels: true,
})

// SQL
const env = dotenv.parse(fs.readFileSync(`.env.${process.env.NODE_ENV}`))
export const sequelize = new Sequelize(
  env.DB_DATABASE,
  env.DB_USER,
  env.DB_PASSWORD,
  {
    dialect: 'postgres',
    host: env.DB_HOST,
  },
)
