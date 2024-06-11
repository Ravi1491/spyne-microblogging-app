import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (executionContext: string, context: ExecutionContext) => {
    let req: { user: User };

    if (context.getType() === 'http') {
      req = context.switchToHttp().getRequest();
    } else {
      const ctx = GqlExecutionContext.create(context);
      req = ctx.getContext().req;
    }

    return req.user as User;
  },
);
