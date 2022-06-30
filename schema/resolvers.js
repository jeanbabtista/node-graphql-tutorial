const { users, movies } = require('../data')

const resolvers = {
  Query: {
    users: () => users,
    user: (_parent, args) => users.find((user) => user.id === +args.id),
    movies: () => movies,
    moviesGreaterThanYearOfPublication: (_parent, args) => movies.filter((movie) => movie.yearOfPublication > args.yearOfPublication),
    movie: (_parent, args) => movies.find((movie) => movie.id === +args.id),
  },
  User: {
    movies: () => movies.filter((movie) => movie.id === 1),
  },
  Mutation: {
    createUser: (_parent, args) => {
      const user = {
        name: args.user.name,
        age: args.user.age,
        sex: args.user.sex,
      }

      users.push(user)
      return user
    },
  },
}

module.exports = resolvers
