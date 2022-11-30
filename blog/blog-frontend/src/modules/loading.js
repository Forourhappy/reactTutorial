// 요청을 위한 액션 타입을 payload로 설정

import { createSlice } from "@reduxjs/toolkit"

const initialState = {}

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading: (state, action) => {
      action.payload = true
    },
    finishLoading: (state, action) => {
      action.payload = false
    }
  }
})

export const { startLoading, finishLoading } = loadingSlice.actions

export default loadingSlice.reducer