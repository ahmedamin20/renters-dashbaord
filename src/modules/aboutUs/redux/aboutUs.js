import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../../../axiosInstance.js'

export const getAbout_us = createAsyncThunk(
  'about_us/getAbout_us',
  async () => {
    const apiUrl = '/admin/about_us'

    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
export const editAboutUs = createAsyncThunk(
  'about_us/editAboutUs',
  async (values) => {
    const apiUrl = '/admin/about_us'

    try {
      const res = await defaultAPI.post(apiUrl, values)
      return res.data
    } catch (error) {
      throw error
    }
  },
)

const aboutUsSlice = createSlice({
  name: 'about_us',
  initialState: {
    aboutUsData: [],
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAbout_us.pending, (state) => {
        state.loading = true
      })
      .addCase(getAbout_us.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.aboutUsData = action.payload
      })
      .addCase(getAbout_us.rejected, (state) => {
        state.error = true
      })
  },
})
export default aboutUsSlice.reducer
