const data = require('../data')

const resolvers = {
  Query: {
    users: () => data,
  },
}

module.exports = resolvers
