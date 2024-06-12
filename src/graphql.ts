
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum CommentType {
    COMMENT = "COMMENT",
    REPLY = "REPLY"
}

export enum LikeEntityType {
    DISCUSSION = "DISCUSSION",
    COMMENT = "COMMENT"
}

export enum LikeType {
    LIKE = "LIKE",
    DISLIKE = "DISLIKE"
}

export enum Order {
    ASC = "ASC",
    DESC = "DESC"
}

export interface CreateCommentInput {
    content: string;
    type: CommentType;
    discussionId: string;
    parentCommentId?: Nullable<string>;
}

export interface UpdateCommentInput {
    id: string;
    content: string;
}

export interface CreateDiscussionLikeInput {
    type: LikeType;
    discussionId?: Nullable<string>;
}

export interface CreateCommentLikeInput {
    type: LikeType;
    discussionId?: Nullable<string>;
}

export interface CreateDiscussionInput {
    title: string;
    text: string;
    imageUrl?: Nullable<string>;
    hashtags?: Nullable<string[]>;
}

export interface UpdateDiscussionInput {
    title?: Nullable<string>;
    text?: Nullable<string>;
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

export interface Comment {
    id: string;
    content: string;
    type: CommentType;
    discussion: Discussion;
    parentComment?: Nullable<Comment>;
    user: User;
}

export interface IMutation {
    createComment(createCommentInput: CreateCommentInput): Comment | Promise<Comment>;
    updateComment(updateCommentInput: UpdateCommentInput): Comment | Promise<Comment>;
    removeComment(id: string): string | Promise<string>;
    createDiscussionLikeDisLike(createDiscussionLikeInput: CreateDiscussionLikeInput): DiscussionLike | Promise<DiscussionLike>;
    createCommentLikeDisLike(createCommentLikeInput: CreateCommentLikeInput): DiscussionLike | Promise<DiscussionLike>;
    createDiscussion(createDiscussionInput: CreateDiscussionInput): Discussion | Promise<Discussion>;
    updateDiscussion(id: string, updateDiscussionInput: UpdateDiscussionInput): Discussion | Promise<Discussion>;
    removeDiscussion(id: string): string | Promise<string>;
    followUser(followingUserId: string): string | Promise<string>;
    unfollowUser(followingUserId: string): string | Promise<string>;
    signup(signUpInput: SignUpInput): User | Promise<User>;
    login(email: string, password: string): User | Promise<User>;
    updateUser(updateUserInput?: Nullable<UpdateUserInput>): User | Promise<User>;
    deleteUser(id: string): string | Promise<string>;
}

export interface DiscussionLike {
    id: string;
    type: LikeType;
    entityType: LikeEntityType;
    discussion: Discussion;
    user: User;
}

export interface DiscussionLikePaginationResponse {
    total: number;
    limit: number;
    offset: number;
    likes: DiscussionLike[];
}

export interface IQuery {
    getDiscussionLike(discussionId: string, filter?: Nullable<GetPaginatedFilter>): DiscussionLikePaginationResponse | Promise<DiscussionLikePaginationResponse>;
    getDiscussion(id: string): Discussion | Promise<Discussion>;
    getAllDiscussions(filter?: Nullable<GetPaginatedFilter>): Nullable<DiscussionSearchPaginatedResponse> | Promise<Nullable<DiscussionSearchPaginatedResponse>>;
    getUserDiscussions(userId: string, filter?: Nullable<GetPaginatedFilter>): Nullable<DiscussionSearchPaginatedResponse> | Promise<Nullable<DiscussionSearchPaginatedResponse>>;
    getDiscussionByHashtag(hashtag: string, filter?: Nullable<GetPaginatedFilter>): Nullable<DiscussionSearchPaginatedResponse> | Promise<Nullable<DiscussionSearchPaginatedResponse>>;
    searchDiscussions(query: string, filter?: Nullable<GetPaginatedFilter>): Nullable<DiscussionSearchPaginatedResponse> | Promise<Nullable<DiscussionSearchPaginatedResponse>>;
    getUserFollowers(filter?: Nullable<GetPaginatedFilter>): Nullable<FollowerPaginatedResponse> | Promise<Nullable<FollowerPaginatedResponse>>;
    user(id: string): Nullable<User> | Promise<Nullable<User>>;
    getAllUsers(filter?: Nullable<GetPaginatedFilter>): Nullable<UserSearchPaginatedResponse> | Promise<Nullable<UserSearchPaginatedResponse>>;
    searchUsers(query: string, filter?: Nullable<GetPaginatedFilter>): Nullable<UserSearchPaginatedResponse> | Promise<Nullable<UserSearchPaginatedResponse>>;
}

export interface Discussion {
    id: string;
    title: string;
    text: string;
    user: User;
    hashtags?: Nullable<string[]>;
    createdAt: Date;
    updatedAt: Date;
}

export interface DiscussionSearchPaginatedResponse {
    offset: number;
    limit: number;
    total: number;
    discussions: Discussion[];
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
