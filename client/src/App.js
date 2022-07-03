import { useState, useEffect } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import Users from './Users'
import Movies from './Movies'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})

export default function App() {
  const [state, setState] = useState({
    users: [],
    movies: [],
  })

  useEffect(() => console.log('state', state), [state])

  return (
    <ApolloProvider client={client}>
      <h1>Hello GraphQL!</h1>
      <Users state={state} setState={setState} />
      <Movies state={state} setState={setState} />
    </ApolloProvider>
  )
}
