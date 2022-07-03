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
      console.log('creating user', args)

      const user = {
        id: users.length + 1,
        name: args.user.name,
        age: args.user.age,
        sex: args.user.sex,
        movies: [],
      }

      users.push(user)
      return user
    },
    updateUserNameById: (_parent, args) => {
      const { id, name } = args
      console.log('updating user with id', id, 'to name', name)

      const i = users.findIndex((user) => user.id === +id)
      if (i < 0) return null

      users[i].name = name
      return users[i]
    },
    deleteUserById: (_parent, args) => {
      const { id } = args
      console.log('deleting user with id', id)

      const i = users.findIndex((user) => user.id === +id)
      if (i < 0) return null

      const deletedUser = users.splice(i, 1)[0]
      return deletedUser
    },
  },
}

module.exports = resolvers
