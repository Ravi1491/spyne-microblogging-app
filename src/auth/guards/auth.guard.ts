import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { applicationConfig } from 'config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

import { IS_PUBLIC_KEY } from '../decorators/public';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private usersService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    let token: string;
    let request;

    if (context.getType() === 'http') {
      // Handle HTTP request
      request = context.switchToHttp().getRequest();
      token = this.extractTokenFromHeader(request);
    } else {
      // Assume GraphQL for all other cases
      const ctx = GqlExecutionContext.create(context);
      request = ctx.getContext().req;
      token = this.extractTokenFromHeader(request);
    }

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const decode: { id: string } = await this.jwtService.verifyAsync(token, {
        secret: applicationConfig.jwt.secret,
      });

      const user = await this.usersService.findOne({
        id: decode.id,
      });

      if (!user) {
        throw new Error('User not found');
      }

      request['user'] = user;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
