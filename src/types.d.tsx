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
};

export type UserType = {
  __typename?: 'UserType';
  id: Scalars['ID'];
  email: Scalars['String'];
  password: Scalars['String'];
  user?: Maybe<Student>;
};

export type Student = {
  __typename?: 'Student';
  id: Scalars['ID'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  user: UserType;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  email: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  user?: Maybe<Array<UserType>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login?: Maybe<UserResponse>;
  logout: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type UserQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQueryQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<Array<(
    { __typename?: 'UserType' }
    & Pick<UserType, 'email'>
  )>> }
);


export const UserQueryDocument = gql`
    query UserQuery {
  user {
    email
  }
}
    `;

/**
 * __useUserQueryQuery__
 *
 * To run a query within a React component, call `useUserQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQueryQuery(baseOptions?: Apollo.QueryHookOptions<UserQueryQuery, UserQueryQueryVariables>) {
        return Apollo.useQuery<UserQueryQuery, UserQueryQueryVariables>(UserQueryDocument, baseOptions);
      }
export function useUserQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQueryQuery, UserQueryQueryVariables>) {
          return Apollo.useLazyQuery<UserQueryQuery, UserQueryQueryVariables>(UserQueryDocument, baseOptions);
        }
export type UserQueryQueryHookResult = ReturnType<typeof useUserQueryQuery>;
export type UserQueryLazyQueryHookResult = ReturnType<typeof useUserQueryLazyQuery>;
export type UserQueryQueryResult = Apollo.QueryResult<UserQueryQuery, UserQueryQueryVariables>;