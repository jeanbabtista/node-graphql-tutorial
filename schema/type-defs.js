const { gql } = require('apollo-server')

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    age: Int!
    sex: Sex!
    movies: [Movie!]!
  }

  type Movie {
    id: ID!
    name: String!
    yearOfPublication: Int!
    isInTheaters: Boolean!
  }

  input CreateUserInput {
    name: String!
    age: Int = 18
    sex: Sex = MALE
  }

  type Mutation {
    createUser(user: CreateUserInput!): User!
    updateUserNameById(id: ID!, name: String!): User
    deleteUserById(id: ID!): User
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    movies: [Movie!]!
    moviesGreaterThanYearOfPublication(yearOfPublication: Int): [Movie!]!
    movie(id: ID!): Movie
  }

  enum Sex {
    MALE
    FEMALE
  }
`

module.exports = typeDefs
