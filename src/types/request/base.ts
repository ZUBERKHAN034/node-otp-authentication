import { Query } from 'express-serve-static-core';

export interface ParamsID extends Query {
  id?: string;
}

export interface TokenUser {
  _id: string;
  username: string;
  email: string;
}
