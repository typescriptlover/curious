import { TAuth, TUserSafe } from './types';

export interface IAuthContext {
   auth: TAuth;
   updateAuth: (newAuth: TAuth) => any;
}

export interface IAuthContextForce {
   auth: TUserSafe;
   updateAuth: (newAuth: TAuth) => any;
}
