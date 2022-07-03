const { users, movies } = require('../data')

const resolvers = {
  Query: {
    users: (parent, args, context, info) => {
      console.log('fetching users')
      return users
    },
    user: (parent, args, context, info) => {
      console.log('fetching user by id', args.id)
      return users.find((user) => user.id === +args.id)
    },
    movies: (parent, args, context, info) => {
      console.log('fetching movies')
      return movies
    },
    moviesGreaterThanYearOfPublication: (parent, args, context, info) => {
      console.log('fetching movies greater than year of publication', args.year)
      return movies.filter((movie) => movie.yearOfPublication > args.yearOfPublication)
    },
    movie: (parent, args, context, info) => {
      console.log('fetching movie by id', args.id)
      return movies.find((movie) => movie.id === +args.id)
    },
  },
  User: {
    movies: (parent, args, context, info) => {
      console.log('fetching movies of user', parent.id)
      return movies.filter((movie) => movie.id === 1)
    },
  },
  Mutation: {
    createUser: (_parent, args) => {
      console.log('creating user', args)

      const { name, age, sex } = args.user
      if (!name) throw new Error('Name cannot be empty')
      if (age <= 0) throw new Error('Age cannot be bellow or equals to 0')

      const user = {
        id: users.length + 1,
        name,
        age,
        sex,
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
