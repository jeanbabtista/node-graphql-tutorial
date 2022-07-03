import { gql } from '@apollo/client'
import { CORE_USER_FIELDS } from './fragments'

export const GET_ALL_USERS = gql`
  ${CORE_USER_FIELDS}
  query GetAllUsers {
    users {
      ...CoreUserFields
    }
  }
`

export const GET_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      id
      name
    }
  }
`

export const GET_USER_BY_ID = gql`
  ${CORE_USER_FIELDS}
  query GetUserById($id: ID!) {
    user(id: $id) {
      ...CoreUserFields
    }
  }
`

export const CREATE_USER = gql`
  ${CORE_USER_FIELDS}
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
      ...CoreUserFields
    }
  }
`
