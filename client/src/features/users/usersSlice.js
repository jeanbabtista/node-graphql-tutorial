import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    getUsers: (state) => {
      state.loading = true
      state.error = null
    },
    getUsersSuccess: (state, action) => {
      state.users = action.payload
      state.loading = false
      state.error = null
    },
    getUsersFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { getUsers, getUsersSuccess, getUsersFailure } = usersSlice.actions

export default usersSlice.reducer
