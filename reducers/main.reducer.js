import { createSlice } from '@reduxjs/toolkit'

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    login: false,
    user: null
  },
  reducers: {

    setLogin: (state, { payload }) => {
      state.login = payload
    },

    setUser: (state, { payload }) => {
      state.user = payload;
    }

  }
})

export const { setLogin, setUser } = mainSlice.actions

export default mainSlice.reducer