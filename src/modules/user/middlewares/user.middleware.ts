import {JwtService} from '@nestjs/jwt'
import {Injectable, NestMiddleware} from '@nestjs/common'
import {NextFunction, Request, Response} from 'express'
import {UserService} from '@app/modules/user/user.service'
import {IJwtPayload} from '@app/modules/token/interfaces/jwt_payload.interface'

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null
      return next()
    }

    const token = req.headers.authorization.split(' ').pop()

    try {
      const {id} = this.jwtService.decode(token) as IJwtPayload
      const user = await this.userService.findUserById(id)
      req.user = user
      next()
    } catch (error) {
      req.user = null
      next()
    }
  }
}
