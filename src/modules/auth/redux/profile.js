import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../../../axiosInstance.js'
export const userProfile = createAsyncThunk('users/profile', async () => {
  const apiUrl = '/auth/profile'
  try {
    const res = await defaultAPI.get(apiUrl)
    return res.data
  } catch (error) {
    throw error
  }
})

export const editUserProfile = createAsyncThunk(
  'profile/edit',
  async (values, { rejectWithValue }) => {
    const apiUrl = 'auth/profile'
    try {
      const res = await defaultAPI.post(apiUrl, values)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    userInfo: [],
    avatar: '',
    profileLoading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userProfile.pending, (state) => {
        state.profileLoading = true
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        state.profileLoading = false
        state.error = false
        state.userInfo = action.payload
        state.avatar = action.payload.data.avatar
      })
      .addCase(userProfile.rejected, (state) => {
        state.error = true
      })
      .addCase(editUserProfile.pending, (state) => {
        state.profileLoading = true
      })
      .addCase(editUserProfile.fulfilled, (state) => {
        state.profileLoading = false
        state.error = false
      })
      .addCase(editUserProfile.rejected, (state) => {
        state.error = true
      })
  },
})

export default profileSlice.reducer
