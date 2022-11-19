import { NextPage } from 'next';
import { NextRouter } from 'next/router';
import type { User } from '@curious/db';
import { RouterOutputs } from '../lib/trpc';

export type NextPageWithLayout = NextPage & {
   getLayout?: (page: React.ReactElement, query: NextRouter) => React.ReactNode;
};

export type TUserSafe = Omit<User, 'password'>;
export type TAuth = TUserSafe | false;

export type TUserFilters = 'All' | 'Answers' | 'Questions' | 'Posts';
export type TUserFilter = {
   name: TUserFilters;
   icon: string;
   route: string;
};

export type TUser = RouterOutputs['user']['getUser']['payload'];
export type TAnswer = RouterOutputs['answer']['getAnswers']['payload'][number];
export type TPost = RouterOutputs['post']['getPosts']['payload'][number];
