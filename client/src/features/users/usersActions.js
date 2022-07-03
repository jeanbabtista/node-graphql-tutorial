import { getUsers, getUsersSuccess, getUsersFailure } from './usersSlice'

export const getUsersAsync = () => async (dispatch) => {
  dispatch(getUsers())

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await response.json()
    dispatch(getUsersSuccess(users))
  } catch (e) {
    dispatch(getUsersFailure(e))
  }
}
