const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema/type-defs')
const resolvers = require('./schema/resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || ''
    return { token }
  },
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
