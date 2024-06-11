
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Order {
    ASC = "ASC",
    DESC = "DESC"
}

export interface GetPaginatedFilter {
    offset?: Nullable<number>;
    limit?: Nullable<number>;
    createdAtOrder?: Nullable<Order>;
}

export interface SignUpInput {
    name: string;
    email: string;
    mobileNumber: string;
    password: string;
}

export interface UpdateUserInput {
    name?: Nullable<string>;
    email?: Nullable<string>;
    mobileNumber?: Nullable<string>;
}

export interface FollowerPaginatedResponse {
    offset: number;
    limit: number;
    total: number;
    followers: User[];
}

export interface IQuery {
    getUserFollowers(filter?: Nullable<GetPaginatedFilter>): Nullable<FollowerPaginatedResponse> | Promise<Nullable<FollowerPaginatedResponse>>;
    user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    followUser(followingUserId: string): string | Promise<string>;
    unfollowUser(followingUserId: string): string | Promise<string>;
    signup(signUpInput: SignUpInput): User | Promise<User>;
    login(email: string, password: string): User | Promise<User>;
    updateUser(updateUserInput?: Nullable<UpdateUserInput>): User | Promise<User>;
    deleteUser(id: string): string | Promise<string>;
}

export interface User {
    id: string;
    name: string;
    email: string;
    mobileNumber: string;
    createdAt: Date;
    updatedAt: Date;
}

type Nullable<T> = T | null;
