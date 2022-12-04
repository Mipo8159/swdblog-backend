import {Body, Controller, HttpCode, Post, Req, Res} from '@nestjs/common'
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger'
import {Request, Response} from 'express'

import {AuthService} from '@app/modules/auth/auth.service'
import {LoginDto} from '@app/modules/auth/dto/login.dto'
import {RegisterDto} from '@app/modules/auth/dto/register.dto'
import {AuthExposeDto} from '@app/modules/auth/dto/auth_expose.dto'
import {IJwtResponse} from '@app/modules/token/interfaces/jwt_response.interface'
import {Serialize} from '@app/shared/interceptors/serialize.interceptor'
import {
  authResponse,
  registerRequest,
  loginRequest,
  invalidCredentials,
  unauthorized,
  accessResponse,
  emailTaken,
} from '@app/helper/swagger/auth.swagger'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // REGISTER
  @Post('register')
  @Serialize(AuthExposeDto)
  @ApiOperation({summary: 'REGISTER'})
  @ApiBody({schema: {example: registerRequest}})
  @ApiResponse({status: 200, schema: {example: authResponse}})
  @ApiResponse({status: 400, schema: {example: emailTaken}})
  async register(
    @Res({passthrough: true}) res: Response,
    @Body('register') dto: RegisterDto,
  ) {
    const {user, access_token, refresh_token} =
      await this.authService.register(dto)

    res.cookie('refresh_token', refresh_token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })
    return {user, access_token}
  }

  // LOGIN
  @Post('login')
  @Serialize(AuthExposeDto)
  @ApiOperation({summary: 'LOGIN'})
  @ApiBody({schema: {example: loginRequest}})
  @ApiResponse({status: 200, schema: {example: authResponse}})
  @ApiResponse({status: 400, schema: {example: invalidCredentials}})
  async login(
    @Res({passthrough: true}) res: Response,
    @Body('login') dto: LoginDto,
  ) {
    const {user, access_token, refresh_token} =
      await this.authService.login(dto)

    res.cookie('refresh_token', refresh_token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })
    return {user, access_token}
  }

  // LOGOUT
  @Post('logout')
  @ApiOperation({summary: 'LOGOUT'})
  @ApiResponse({status: 200, schema: {example: {message: 'logged out'}}})
  @ApiResponse({status: 401, schema: {example: unauthorized}})
  async logout(
    @Req() req: Request,
    @Res({passthrough: true}) res: Response,
  ): Promise<{message: string}> {
    const {refresh_token} = req.cookies
    const result = await this.authService.logout(refresh_token)
    res.clearCookie('refresh_token')
    return {message: result}
  }

  // REFRESH ACCESS
  @Post('refresh-access')
  @HttpCode(200)
  @ApiOperation({summary: 'REFRESH ACCESS'})
  @ApiResponse({status: 200, schema: {example: accessResponse}})
  @ApiResponse({status: 401, schema: {example: unauthorized}})
  async refreshAccess(
    @Req() req: Request,
    @Res({passthrough: true}) res: Response,
  ): Promise<IJwtResponse> {
    const {refresh_token: refreshToken} = req.cookies
    const {access_token, refresh_token: refresh_token} =
      await this.authService.refreshAccess(refreshToken)

    res.cookie('refresh_token', refresh_token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })
    return {access_token}
  }
}
