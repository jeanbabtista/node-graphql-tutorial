import React from 'react'
import { useQuery, useLazyQuery, useMutation } from '@apollo/client'

import { GET_ALL_USERS, GET_USER_BY_ID, CREATE_USER } from './api'

export default function Display({ state = {}, setState = () => {} }) {
  /* useQuery displays data at page render */
  const { error: usersError, data: usersData, refetch: refetchUsers } = useQuery(GET_ALL_USERS)

  /* useLazyQuery displays data dinamically */
  const [fetchUser, { error: userError, data: userData, refetch: refetchUser }] = useLazyQuery(GET_USER_BY_ID)
  const [userId, setUserId] = React.useState(0)

  /* useMutation creates a mutation lazily by default */
  const [createUser, { error: createUserMutationError, data: createUserMutationData }] = useMutation(CREATE_USER)
  const [user, setUser] = React.useState({ name: '', age: 0 })

  /* fetch users */
  React.useEffect(() => {
    if (usersData) setState((prev) => ({ ...prev, users: usersData.users }))
  }, [usersData, setState])

  /* fetch user by id */
  React.useEffect(() => {
    fetchUser({ variables: { id: userId } })
  }, [userId, fetchUser])

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    await createUser({ variables: { user } })
    await refetchUsers()
    await refetchUser()
  }

  return (
    <div>
      <h3>Create user</h3>

      <form onSubmit={handleOnSubmit}>
        <label htmlFor="name">Name</label>
        <input id="name" value={user.name} onChange={(e) => setUser((prev) => ({ ...prev, name: e.target.value }))} />
        <br />
        <label htmlFor="age">Age</label>
        <input type="number" value={user.age} onChange={(e) => setUser((prev) => ({ ...prev, age: +e.target.value }))} />
        <br />
        <button type="submit">Submit</button>
      </form>
      {createUserMutationError && <p>Error loading user: {createUserMutationError.message}</p>}
      {createUserMutationData && <p>User created!</p>}

      <hr />

      <h3>User (fetched on input change with useLazyQuery)</h3>
      <input type="number" placeholder="Search user by id ..." onChange={(e) => setUserId(+e.target.value)} />
      {userError && <p>Error loading user: {userError.message}</p>}
      {userData?.user && (
        <div>
          {userData.user.name} ({userData.user.age} years old)
        </div>
      )}

      <hr />

      <h3>Users (fetched at every render automatically with useQuery)</h3>
      {usersError && <p>Error: {usersError.message}</p>}
      {!usersError &&
        state.users.map((user) => (
          <div key={user.id}>
            {user.name} ({user.age} years old)
          </div>
        ))}
    </div>
  )
}
