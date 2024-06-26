import { Response } from 'express';
import { compare, genSalt, hash } from 'bcryptjs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';

import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { Public } from 'src/auth/decorators/public';
import { generateJwtToken } from 'src/utils/jwt';
import { Op } from 'sequelize';
import { UpdateUserInput } from './dto/update-user.input';
import { CurrentUser } from 'src/auth/decorators/current-user';
import { User } from './entities/user.entity';
import { getPaginationFilters, isPresent } from 'src/utils/helper';
import { GetPaginatedFilter } from 'src/utils/type';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Query('searchUsers')
  async searchUsers(
    @Args('query') query: string,
    @Args('filter') filter: GetPaginatedFilter,
  ) {
    try {
      const { offset, limit, createdAtOrder } = getPaginationFilters(filter);

      const { total, rows } = await this.userService.findAndCountAll(
        {
          name: { [Op.iLike]: `%${query}%` },
        },
        {
          order: [['createdAt', createdAtOrder]],
          offset,
          limit,
        },
      );

      return {
        total,
        offset,
        limit,
        users: rows,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Public()
  @Query('getAllUsers')
  async getAllUsers(@Args('filter') filter: GetPaginatedFilter) {
    try {
      const { offset, limit, createdAtOrder } = getPaginationFilters(filter);

      const { total, rows } = await this.userService.findAndCountAll(
        {},
        {
          order: [['createdAt', createdAtOrder]],
          offset,
          limit,
        },
      );

      return {
        total,
        offset,
        limit,
        users: rows,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Public()
  @Mutation('signup')
  async signup(
    @Args('signUpInput') createUserInput: CreateUserInput,
    @Context() context: { res: Response },
  ) {
    try {
      const { res } = context;
      const user = await this.userService.findOne({
        [Op.or]: [
          { email: createUserInput.email },
          { mobileNumber: createUserInput.mobileNumber },
        ],
      });

      if (user) {
        throw new Error('User already exist with this email or mobile number');
      }

      const hashPassword = await hash(
        createUserInput.password,
        await genSalt(),
      );

      const createUser = await this.userService.create({
        name: createUserInput.name,
        email: createUserInput.email,
        password: hashPassword,
        mobileNumber: createUserInput.mobileNumber,
      });

      const jwtToken = await generateJwtToken({
        id: createUser.id,
        email: createUser.email,
      });

      res.cookie('access_token', jwtToken.token, {
        maxAge: 24 * 60 * 60 * 1000,
        path: '/',
        domain: 'localhost',
      });

      console.log('access Token', jwtToken.token);
      return createUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Public()
  @Mutation('login')
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context('res') res: Response,
  ) {
    try {
      const user = await this.userService.findOne({ email });

      if (!user) {
        throw new Error('User does not exist');
      }

      const isValidPassword = await compare(password, user.password);

      if (!isValidPassword) {
        throw new Error('Invalid password');
      }

      const jwtToken = await generateJwtToken({
        id: user.id,
        email: user.email,
      });

      res.cookie('access_token', jwtToken.token, {
        maxAge: 24 * 60 * 60 * 1000,
        path: '/',
        domain: 'localhost',
      });

      console.log('access Token', jwtToken.token);
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Query('user')
  findOne(@Args('id') id: string) {
    return this.userService.findOne(id);
  }

  @Mutation('updateUser')
  async update(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser('user') currentUser: User,
  ) {
    try {
      const user = await this.userService.findOne({
        id: currentUser.id,
      });

      if (isPresent(updateUserInput.email)) {
        const user = await this.userService.findOne({
          email: updateUserInput.email,
        });

        if (user && currentUser.id !== user.id) {
          throw new Error('User already exist with this email');
        }
      }

      if (isPresent(updateUserInput.mobileNumber)) {
        const user = await this.userService.findOne({
          mobileNumber: updateUserInput.mobileNumber,
        });

        if (user && currentUser.id !== user.id) {
          throw new Error('User already exist with this mobile number');
        }
      }

      const updatedUser = await this.userService.update(
        { id: user.id },
        updateUserInput,
      );

      if (updatedUser[0] === 0) {
        throw new Error('Failed to update user');
      }

      return updatedUser[1][0];
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation('deleteUser')
  async delete(@Args('id') id: string): Promise<string> {
    try {
      const user = await this.userService.findOne({
        id,
      });

      if (!user) {
        throw new Error('User does not exist');
      }

      await this.userService.delete({ id });

      return 'User deleted successfully';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
