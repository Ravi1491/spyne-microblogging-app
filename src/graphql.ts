
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

export interface CreateDiscussionInput {
    title: string;
    text: string;
    imageUrl?: Nullable<string>;
    hashtags?: Nullable<string[]>;
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

export interface Discussion {
    id: string;
    title: string;
    text: string;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}

export interface DiscussionSearchPaginatedResponse {
    offset: number;
    limit: number;
    total: number;
    discussions: Discussion[];
}

export interface IQuery {
    getDiscussion(id: string): Discussion | Promise<Discussion>;
    getAllDiscussions(filter?: Nullable<GetPaginatedFilter>): Nullable<DiscussionSearchPaginatedResponse> | Promise<Nullable<DiscussionSearchPaginatedResponse>>;
    getUserDiscussions(userId: string, filter?: Nullable<GetPaginatedFilter>): Nullable<DiscussionSearchPaginatedResponse> | Promise<Nullable<DiscussionSearchPaginatedResponse>>;
    getHashtagDiscussions(hashtag: string, filter?: Nullable<GetPaginatedFilter>): Nullable<DiscussionSearchPaginatedResponse> | Promise<Nullable<DiscussionSearchPaginatedResponse>>;
    searchDiscussions(query: string, filter?: Nullable<GetPaginatedFilter>): Nullable<DiscussionSearchPaginatedResponse> | Promise<Nullable<DiscussionSearchPaginatedResponse>>;
    getUserFollowers(filter?: Nullable<GetPaginatedFilter>): Nullable<FollowerPaginatedResponse> | Promise<Nullable<FollowerPaginatedResponse>>;
    user(id: string): Nullable<User> | Promise<Nullable<User>>;
    getAllUsers(filter?: Nullable<GetPaginatedFilter>): Nullable<UserSearchPaginatedResponse> | Promise<Nullable<UserSearchPaginatedResponse>>;
    searchUsers(query: string, filter?: Nullable<GetPaginatedFilter>): Nullable<UserSearchPaginatedResponse> | Promise<Nullable<UserSearchPaginatedResponse>>;
}

export interface IMutation {
    createDiscussion(createDiscussionInput: CreateDiscussionInput): Discussion | Promise<Discussion>;
    removeDiscussion(id: string): string | Promise<string>;
    followUser(followingUserId: string): string | Promise<string>;
    unfollowUser(followingUserId: string): string | Promise<string>;
    signup(signUpInput: SignUpInput): User | Promise<User>;
    login(email: string, password: string): User | Promise<User>;
    updateUser(updateUserInput?: Nullable<UpdateUserInput>): User | Promise<User>;
    deleteUser(id: string): string | Promise<string>;
}

export interface FollowerPaginatedResponse {
    offset: number;
    limit: number;
    total: number;
    followers: User[];
}

export interface User {
    id: string;
    name: string;
    email: string;
    mobileNumber: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserSearchPaginatedResponse {
    offset: number;
    limit: number;
    total: number;
    users: User[];
}

type Nullable<T> = T | null;
