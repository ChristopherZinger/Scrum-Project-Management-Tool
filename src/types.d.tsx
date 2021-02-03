import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: Date;
};

export type UserProfileType = {
  __typename?: 'UserProfileType';
  id: Scalars['ID'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  user?: Maybe<UserType>;
};

export type UserType = {
  __typename?: 'UserType';
  id: Scalars['ID'];
  email: Scalars['String'];
  password: Scalars['String'];
  role: UserRole;
  user?: Maybe<UserProfileType>;
  emailConfirmed?: Maybe<Scalars['DateTime']>;
  isActive: Scalars['Boolean'];
  removedAt?: Maybe<Scalars['DateTime']>;
};

export enum UserRole {
  Admin = 'ADMIN',
  BaseUser = 'BASE_USER'
}


export type UserProfile = {
  __typename?: 'UserProfile';
  id: Scalars['ID'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  user: UserType;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  email: Scalars['String'];
};

export type RegistrationInputType = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type ChangePassword = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type LoginInputType = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  test: Scalars['String'];
  myProfile?: Maybe<UserResponse>;
  user?: Maybe<Array<UserType>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  changePassword?: Maybe<UserResponse>;
  confirmUserEmail?: Maybe<UserResponse>;
  login?: Maybe<UserResponse>;
  logout: Scalars['Boolean'];
  requestConfirmationEmail: Scalars['Boolean'];
  requestPasswordChangeEmail: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  data: RegistrationInputType;
};


export type MutationChangePasswordArgs = {
  data: ChangePassword;
};


export type MutationConfirmUserEmailArgs = {
  token: Scalars['String'];
};


export type MutationLoginArgs = {
  data: LoginInputType;
};


export type MutationRequestPasswordChangeEmailArgs = {
  email: Scalars['String'];
};

export type MyProfileQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type MyProfileQueryQuery = (
  { __typename?: 'Query' }
  & { myProfile?: Maybe<(
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'email'>
  )> }
);


export const MyProfileQueryDocument = gql`
    query myProfileQuery {
  myProfile {
    email
  }
}
    `;

/**
 * __useMyProfileQueryQuery__
 *
 * To run a query within a React component, call `useMyProfileQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyProfileQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyProfileQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyProfileQueryQuery(baseOptions?: Apollo.QueryHookOptions<MyProfileQueryQuery, MyProfileQueryQueryVariables>) {
        return Apollo.useQuery<MyProfileQueryQuery, MyProfileQueryQueryVariables>(MyProfileQueryDocument, baseOptions);
      }
export function useMyProfileQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyProfileQueryQuery, MyProfileQueryQueryVariables>) {
          return Apollo.useLazyQuery<MyProfileQueryQuery, MyProfileQueryQueryVariables>(MyProfileQueryDocument, baseOptions);
        }
export type MyProfileQueryQueryHookResult = ReturnType<typeof useMyProfileQueryQuery>;
export type MyProfileQueryLazyQueryHookResult = ReturnType<typeof useMyProfileQueryLazyQuery>;
export type MyProfileQueryQueryResult = Apollo.QueryResult<MyProfileQueryQuery, MyProfileQueryQueryVariables>;