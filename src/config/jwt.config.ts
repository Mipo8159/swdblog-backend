import {ConfigService} from '@nestjs/config'
import {JwtModuleOptions} from '@nestjs/jwt'

export const JwtConfig = async (
  configService: ConfigService,
): Promise<JwtModuleOptions> => ({
  secret: configService.get<string>('JWT_ACCESS_SECRET'),
  signOptions: {
    expiresIn: configService.get<string>('JWT_ACCESS_EXPIRE'),
  },
})
