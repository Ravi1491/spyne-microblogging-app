
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface SignUpInput {
    name: string;
    email: string;
    mobileNumber: string;
    password: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    mobileNumber: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IQuery {
    user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    signup(signUpInput: SignUpInput): User | Promise<User>;
    login(email: string, password: string): User | Promise<User>;
}

type Nullable<T> = T | null;
