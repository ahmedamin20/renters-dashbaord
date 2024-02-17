import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../../../axiosInstance.js'

export const getSetting = createAsyncThunk('settings/get', async () => {
  let apiUrl = `/admin/settings`
  try {
    const res = await defaultAPI.get(apiUrl)
    return res.data
  } catch (error) {
    throw error
  }
})

export const editSetting = createAsyncThunk('settings/edit', async (values) => {
  const apiUrl = `/admin/settings`
  try {
    const res = await defaultAPI.put(apiUrl, values)
    return res.data
  } catch (error) {
    throw error
  }
})

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    settingsData: [],
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSetting.pending, (state) => {
        state.loading = true
      })
      .addCase(getSetting.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.settingsData = action.payload
      })
      .addCase(getSetting.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(editSetting.pending, (state) => {
        state.loading = true
      })
      .addCase(editSetting.fulfilled, (state) => {
        state.loading = false
        state.error = false
      })
      .addCase(editSetting.rejected, (state) => {
        state.loading = false
        state.error = true
      })
  },
})

export default settingsSlice.reducer
