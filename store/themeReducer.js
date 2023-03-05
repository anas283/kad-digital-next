import { createSlice } from '@reduxjs/toolkit'

export const themeReducer = createSlice({
  name: 'theme',
  initialState: {
    theme: '',
    song: '',
    isCardOpen: false,
    isPause: false,
    isRefreshGuest: false,
  },
  reducers: {
    chooseTheme: (state, action) => {
      state.theme = action.payload
    },
    chooseSong: (state, action) => {
      state.song = action.payload
    },
    openCard: (state, action) => {
      state.isCardOpen = action.payload
    },
    pauseMusic: (state, action) => {
      state.isPause = action.payload
    },
    refreshGuest: (state, action) => {
      state.isRefreshGuest = action.payload
    }
  },
})

export const { chooseTheme, chooseSong, openCard, pauseMusic, refreshGuest } = themeReducer.actions

export default themeReducer.reducer