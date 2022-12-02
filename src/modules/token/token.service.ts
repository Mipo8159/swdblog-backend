import {Injectable} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {JwtService} from '@nestjs/jwt'
import {IJwtOptions} from './interfaces/jwt_options.interface'
import {IJwtPayload} from './interfaces/jwt_payload.interface'
import {IJwtResponse} from './interfaces/jwt_response.interface'
import {Token} from './models/token.model'
import {TokenRepository} from './repositories/token.repository'

@Injectable()
export class TokenService {
  constructor(
    private readonly tokenRepository: TokenRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  // GENERATE TOKENS
  async generateTokens(payload: IJwtPayload): Promise<IJwtResponse> {
    const access_token = this.generateAccessToken(payload)
    const refresh_token = this.generateRefreshToken(payload)
    return {access_token, refresh_token}
  }

  // GENERATE ACCESS TOKEN (UTIL)
  private generateAccessToken(payload: IJwtPayload): string {
    return this.jwtService.sign({...payload, type: 'access'})
  }

  // GENERATE REFRESH TOKEN (UTIL)
  private generateRefreshToken(payload: IJwtPayload): string {
    const options: IJwtOptions = {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRE'),
    }
    return this.jwtService.sign({...payload, type: 'refresh'}, options)
  }

  // FIND TOKEN IN DATABASE
  async findToken(refresh_token: string): Promise<Token> {
    return this.tokenRepository.findOne(refresh_token)
  }

  // REMOVE TOKEN
  async removeToken(refresh_token: string): Promise<number> {
    return this.tokenRepository.delete(refresh_token)
  }

  // SAVE TOKEN
  async saveToken(user_id: number, refresh_token: string) {
    const token = await this.tokenRepository.findOne(refresh_token)
    if (token) {
      token.refresh_token = refresh_token
      return this.tokenRepository.save(token)
    } else {
      const newToken = new Token()
      newToken.user_id = user_id
      newToken.refresh_token = refresh_token
      return this.tokenRepository.save(token)
    }
  }

  // VALIDATE REFRESH TOKEN
  async validateRefreshToken(refresh_token: string): Promise<IJwtPayload> {
    try {
      return this.jwtService.verifyAsync(refresh_token, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      })
    } catch (error) {
      return null
    }
  }

  // VALIDATE ACCESS TOKEN
  async validateAccessToken(access_token: string): Promise<IJwtPayload> {
    try {
      return this.jwtService.verifyAsync(access_token)
    } catch (error) {
      return null
    }
  }
}
