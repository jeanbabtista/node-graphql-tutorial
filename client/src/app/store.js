import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../features/users/usersSlice'
import moviesReducer from '../features/movies/moviesSlice'

const store = configureStore({
  reducer: { users: usersReducer, movies: moviesReducer },
})

export default store
