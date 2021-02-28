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

export type TeammatesResponse = {
  __typename?: 'TeammatesResponse';
  invitedUsers: Array<Scalars['String']>;
  registeredUsers: Array<TeammateResponse>;
};

export type TeammateResponse = {
  __typename?: 'TeammateResponse';
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  email: Scalars['String'];
};

export type ProjectResponseType = {
  __typename?: 'ProjectResponseType';
  id: Scalars['Int'];
  pid?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type UserProfileResponse = {
  __typename?: 'UserProfileResponse';
  profileId: Scalars['Float'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  email: Scalars['String'];
  isActive: Scalars['Boolean'];
  emailConfirmed?: Maybe<Scalars['DateTime']>;
};


export type RegisterCompanyInputType = {
  email: Scalars['String'];
  name: Scalars['String'];
  city?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  buildingNumber?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
};

export type CreateProjectInputType = {
  title: Scalars['String'];
  pid: Scalars['String'];
};

export type ChangePassword = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type LoginInputType = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type RegisterUserProfileInputType = {
  password: Scalars['String'];
  email: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
};

export type RegisterWithInvitationInputType = {
  companyId: Scalars['Int'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  teammateInvitationData: Scalars['String'];
  teammates: TeammatesResponse;
  projects: Array<ProjectResponseType>;
  user?: Maybe<UserProfileResponse>;
};


export type QueryTeammateInvitationDataArgs = {
  companyId: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  RegisterCompany: Scalars['Boolean'];
  createProject: ProjectResponseType;
  changePassword?: Maybe<UserProfileResponse>;
  confirmUserEmail?: Maybe<UserProfileResponse>;
  requestConfirmationEmail: Scalars['Boolean'];
  requestPasswordChangeEmail: Scalars['Boolean'];
  cancellInvitation: Scalars['Boolean'];
  inviteTeammate: Scalars['Boolean'];
  login?: Maybe<UserProfileResponse>;
  logout: Scalars['Boolean'];
  register?: Maybe<UserProfileResponse>;
  registerWithInvitation: UserProfileResponse;
};


export type MutationRegisterCompanyArgs = {
  data: RegisterCompanyInputType;
};


export type MutationCreateProjectArgs = {
  data: CreateProjectInputType;
};


export type MutationChangePasswordArgs = {
  data: ChangePassword;
};


export type MutationConfirmUserEmailArgs = {
  token: Scalars['String'];
};


export type MutationRequestPasswordChangeEmailArgs = {
  email: Scalars['String'];
};


export type MutationCancellInvitationArgs = {
  email: Scalars['String'];
};


export type MutationInviteTeammateArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  data: LoginInputType;
};


export type MutationRegisterArgs = {
  data: RegisterUserProfileInputType;
};


export type MutationRegisterWithInvitationArgs = {
  data: RegisterWithInvitationInputType;
};

export type CancellInvitationMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type CancellInvitationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'cancellInvitation'>
);

export type CreateProjectMutationVariables = Exact<{
  data: CreateProjectInputType;
}>;


export type CreateProjectMutation = (
  { __typename?: 'Mutation' }
  & { createProject: (
    { __typename?: 'ProjectResponseType' }
    & Pick<ProjectResponseType, 'title' | 'pid'>
  ) }
);

export type InviteTeammateMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type InviteTeammateMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'inviteTeammate'>
);

export type LoginMutationVariables = Exact<{
  data: LoginInputType;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'UserProfileResponse' }
    & Pick<UserProfileResponse, 'email' | 'isActive' | 'emailConfirmed' | 'firstname' | 'lastname'>
  )> }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MyProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type MyProfileQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'UserProfileResponse' }
    & Pick<UserProfileResponse, 'email' | 'isActive' | 'emailConfirmed' | 'firstname' | 'lastname'>
  )> }
);

export type ProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectsQuery = (
  { __typename?: 'Query' }
  & { projects: Array<(
    { __typename?: 'ProjectResponseType' }
    & Pick<ProjectResponseType, 'title' | 'pid' | 'id'>
  )> }
);

export type RegisterCompanyMutationVariables = Exact<{
  data: RegisterCompanyInputType;
}>;


export type RegisterCompanyMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'RegisterCompany'>
);

export type RegisterMutationVariables = Exact<{
  data: RegisterUserProfileInputType;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register?: Maybe<(
    { __typename?: 'UserProfileResponse' }
    & Pick<UserProfileResponse, 'email' | 'firstname' | 'lastname' | 'isActive' | 'emailConfirmed'>
  )> }
);

export type RegisterWithInvitationMutationVariables = Exact<{
  data: RegisterWithInvitationInputType;
}>;


export type RegisterWithInvitationMutation = (
  { __typename?: 'Mutation' }
  & { registerWithInvitation: (
    { __typename?: 'UserProfileResponse' }
    & Pick<UserProfileResponse, 'email' | 'firstname' | 'lastname' | 'isActive' | 'emailConfirmed'>
  ) }
);

export type TeammateInvitationDataQueryVariables = Exact<{
  companyId: Scalars['Int'];
}>;


export type TeammateInvitationDataQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'teammateInvitationData'>
);

export type TeammatesQueryVariables = Exact<{ [key: string]: never; }>;


export type TeammatesQuery = (
  { __typename?: 'Query' }
  & { teammates: (
    { __typename?: 'TeammatesResponse' }
    & Pick<TeammatesResponse, 'invitedUsers'>
    & { registeredUsers: Array<(
      { __typename?: 'TeammateResponse' }
      & Pick<TeammateResponse, 'firstname' | 'lastname' | 'email'>
    )> }
  ) }
);


export const CancellInvitationDocument = gql`
    mutation CancellInvitation($email: String!) {
  cancellInvitation(email: $email)
}
    `;
export type CancellInvitationMutationFn = Apollo.MutationFunction<CancellInvitationMutation, CancellInvitationMutationVariables>;

/**
 * __useCancellInvitationMutation__
 *
 * To run a mutation, you first call `useCancellInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancellInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancellInvitationMutation, { data, loading, error }] = useCancellInvitationMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useCancellInvitationMutation(baseOptions?: Apollo.MutationHookOptions<CancellInvitationMutation, CancellInvitationMutationVariables>) {
        return Apollo.useMutation<CancellInvitationMutation, CancellInvitationMutationVariables>(CancellInvitationDocument, baseOptions);
      }
export type CancellInvitationMutationHookResult = ReturnType<typeof useCancellInvitationMutation>;
export type CancellInvitationMutationResult = Apollo.MutationResult<CancellInvitationMutation>;
export type CancellInvitationMutationOptions = Apollo.BaseMutationOptions<CancellInvitationMutation, CancellInvitationMutationVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($data: CreateProjectInputType!) {
  createProject(data: $data) {
    title
    pid
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, baseOptions);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const InviteTeammateDocument = gql`
    mutation InviteTeammate($email: String!) {
  inviteTeammate(email: $email)
}
    `;
export type InviteTeammateMutationFn = Apollo.MutationFunction<InviteTeammateMutation, InviteTeammateMutationVariables>;

/**
 * __useInviteTeammateMutation__
 *
 * To run a mutation, you first call `useInviteTeammateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteTeammateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteTeammateMutation, { data, loading, error }] = useInviteTeammateMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useInviteTeammateMutation(baseOptions?: Apollo.MutationHookOptions<InviteTeammateMutation, InviteTeammateMutationVariables>) {
        return Apollo.useMutation<InviteTeammateMutation, InviteTeammateMutationVariables>(InviteTeammateDocument, baseOptions);
      }
export type InviteTeammateMutationHookResult = ReturnType<typeof useInviteTeammateMutation>;
export type InviteTeammateMutationResult = Apollo.MutationResult<InviteTeammateMutation>;
export type InviteTeammateMutationOptions = Apollo.BaseMutationOptions<InviteTeammateMutation, InviteTeammateMutationVariables>;
export const LoginDocument = gql`
    mutation Login($data: LoginInputType!) {
  login(data: $data) {
    email
    isActive
    emailConfirmed
    firstname
    lastname
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MyProfileDocument = gql`
    query myProfile {
  user {
    email
    isActive
    emailConfirmed
    firstname
    lastname
  }
}
    `;

/**
 * __useMyProfileQuery__
 *
 * To run a query within a React component, call `useMyProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyProfileQuery(baseOptions?: Apollo.QueryHookOptions<MyProfileQuery, MyProfileQueryVariables>) {
        return Apollo.useQuery<MyProfileQuery, MyProfileQueryVariables>(MyProfileDocument, baseOptions);
      }
export function useMyProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyProfileQuery, MyProfileQueryVariables>) {
          return Apollo.useLazyQuery<MyProfileQuery, MyProfileQueryVariables>(MyProfileDocument, baseOptions);
        }
export type MyProfileQueryHookResult = ReturnType<typeof useMyProfileQuery>;
export type MyProfileLazyQueryHookResult = ReturnType<typeof useMyProfileLazyQuery>;
export type MyProfileQueryResult = Apollo.QueryResult<MyProfileQuery, MyProfileQueryVariables>;
export const ProjectsDocument = gql`
    query Projects {
  projects {
    title
    pid
    id
  }
}
    `;

/**
 * __useProjectsQuery__
 *
 * To run a query within a React component, call `useProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProjectsQuery(baseOptions?: Apollo.QueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
        return Apollo.useQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, baseOptions);
      }
export function useProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
          return Apollo.useLazyQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, baseOptions);
        }
export type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>;
export type ProjectsLazyQueryHookResult = ReturnType<typeof useProjectsLazyQuery>;
export type ProjectsQueryResult = Apollo.QueryResult<ProjectsQuery, ProjectsQueryVariables>;
export const RegisterCompanyDocument = gql`
    mutation RegisterCompany($data: RegisterCompanyInputType!) {
  RegisterCompany(data: $data)
}
    `;
export type RegisterCompanyMutationFn = Apollo.MutationFunction<RegisterCompanyMutation, RegisterCompanyMutationVariables>;

/**
 * __useRegisterCompanyMutation__
 *
 * To run a mutation, you first call `useRegisterCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerCompanyMutation, { data, loading, error }] = useRegisterCompanyMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterCompanyMutation(baseOptions?: Apollo.MutationHookOptions<RegisterCompanyMutation, RegisterCompanyMutationVariables>) {
        return Apollo.useMutation<RegisterCompanyMutation, RegisterCompanyMutationVariables>(RegisterCompanyDocument, baseOptions);
      }
export type RegisterCompanyMutationHookResult = ReturnType<typeof useRegisterCompanyMutation>;
export type RegisterCompanyMutationResult = Apollo.MutationResult<RegisterCompanyMutation>;
export type RegisterCompanyMutationOptions = Apollo.BaseMutationOptions<RegisterCompanyMutation, RegisterCompanyMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($data: RegisterUserProfileInputType!) {
  register(data: $data) {
    email
    firstname
    lastname
    isActive
    emailConfirmed
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RegisterWithInvitationDocument = gql`
    mutation RegisterWithInvitation($data: RegisterWithInvitationInputType!) {
  registerWithInvitation(data: $data) {
    email
    firstname
    lastname
    isActive
    emailConfirmed
  }
}
    `;
export type RegisterWithInvitationMutationFn = Apollo.MutationFunction<RegisterWithInvitationMutation, RegisterWithInvitationMutationVariables>;

/**
 * __useRegisterWithInvitationMutation__
 *
 * To run a mutation, you first call `useRegisterWithInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterWithInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerWithInvitationMutation, { data, loading, error }] = useRegisterWithInvitationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterWithInvitationMutation(baseOptions?: Apollo.MutationHookOptions<RegisterWithInvitationMutation, RegisterWithInvitationMutationVariables>) {
        return Apollo.useMutation<RegisterWithInvitationMutation, RegisterWithInvitationMutationVariables>(RegisterWithInvitationDocument, baseOptions);
      }
export type RegisterWithInvitationMutationHookResult = ReturnType<typeof useRegisterWithInvitationMutation>;
export type RegisterWithInvitationMutationResult = Apollo.MutationResult<RegisterWithInvitationMutation>;
export type RegisterWithInvitationMutationOptions = Apollo.BaseMutationOptions<RegisterWithInvitationMutation, RegisterWithInvitationMutationVariables>;
export const TeammateInvitationDataDocument = gql`
    query TeammateInvitationData($companyId: Int!) {
  teammateInvitationData(companyId: $companyId)
}
    `;

/**
 * __useTeammateInvitationDataQuery__
 *
 * To run a query within a React component, call `useTeammateInvitationDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeammateInvitationDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeammateInvitationDataQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useTeammateInvitationDataQuery(baseOptions: Apollo.QueryHookOptions<TeammateInvitationDataQuery, TeammateInvitationDataQueryVariables>) {
        return Apollo.useQuery<TeammateInvitationDataQuery, TeammateInvitationDataQueryVariables>(TeammateInvitationDataDocument, baseOptions);
      }
export function useTeammateInvitationDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeammateInvitationDataQuery, TeammateInvitationDataQueryVariables>) {
          return Apollo.useLazyQuery<TeammateInvitationDataQuery, TeammateInvitationDataQueryVariables>(TeammateInvitationDataDocument, baseOptions);
        }
export type TeammateInvitationDataQueryHookResult = ReturnType<typeof useTeammateInvitationDataQuery>;
export type TeammateInvitationDataLazyQueryHookResult = ReturnType<typeof useTeammateInvitationDataLazyQuery>;
export type TeammateInvitationDataQueryResult = Apollo.QueryResult<TeammateInvitationDataQuery, TeammateInvitationDataQueryVariables>;
export const TeammatesDocument = gql`
    query Teammates {
  teammates {
    invitedUsers
    registeredUsers {
      firstname
      lastname
      email
    }
  }
}
    `;

/**
 * __useTeammatesQuery__
 *
 * To run a query within a React component, call `useTeammatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeammatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeammatesQuery({
 *   variables: {
 *   },
 * });
 */
export function useTeammatesQuery(baseOptions?: Apollo.QueryHookOptions<TeammatesQuery, TeammatesQueryVariables>) {
        return Apollo.useQuery<TeammatesQuery, TeammatesQueryVariables>(TeammatesDocument, baseOptions);
      }
export function useTeammatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeammatesQuery, TeammatesQueryVariables>) {
          return Apollo.useLazyQuery<TeammatesQuery, TeammatesQueryVariables>(TeammatesDocument, baseOptions);
        }
export type TeammatesQueryHookResult = ReturnType<typeof useTeammatesQuery>;
export type TeammatesLazyQueryHookResult = ReturnType<typeof useTeammatesLazyQuery>;
export type TeammatesQueryResult = Apollo.QueryResult<TeammatesQuery, TeammatesQueryVariables>;