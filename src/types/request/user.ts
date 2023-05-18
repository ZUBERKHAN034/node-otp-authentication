import { Query } from 'express-serve-static-core';

export interface CreateUser extends Query {
  email: string;
}

export interface Login extends Query {
  email: string;
  otp: string;
}
