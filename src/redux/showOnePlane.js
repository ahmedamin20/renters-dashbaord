import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../axiosInstance'
export const showOnePlaneData = createAsyncThunk(
  'stuffPlane/showOnePlane',
  async (ID, { rejectWithValue, getState }) => {
    try {
      const apiUrl = `/study_planes/${ID}`
      const response = await defaultAPI.get(apiUrl)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)
const showOnePlaneSlice = createSlice({
  name: 'showOnePlaneSlice',
  initialState: {
    onePlane: [],
    loading: false,
    error: false,
  },
  reducers: {
    resetOnePlane: (state) => {
      state.onePlane.data = null
      state.onePlane.loading = false
      state.onePlane.error = false
    },
  },
  extraReducers: {
    [showOnePlaneData.pending]: (state) => {
      state.loading = true
    },
    [showOnePlaneData.fulfilled]: (state, action) => {
      state.loading = false
      state.error = false
      state.onePlane = action.payload
    },
    [showOnePlaneData.rejected]: (state) => {
      state.error = true
      state.onePlane = []
    },
  },
})
export const { resetOnePlane } = showOnePlaneSlice.actions

export default showOnePlaneSlice.reducer
