import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../axiosInstance'
export const socialSpecialistData = createAsyncThunk(
  'socialSpecialist/socialSpecialistData',
  async (info) => {
    const { pageSize } = info
    const apiUrl = `/users/social_specialist?per_page=${pageSize}`
    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      console.error(error)
      throw error
    }
  },
)
export const socialSpecialistSearch = createAsyncThunk(
  'socialSpecialist/socialSpecialistSearch',
  async (info) => {
    const apiUrl = `/users/social_specialist?handle=${info.handle}}&per_page=${info.pageSize}`
    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      console.error(error)
      throw error
    }
  },
)
export const ShowSocialSpecialist = createAsyncThunk(
  'socialSpecialist/showSocialSpecialist',
  async (ID, { getState }) => {
    try {
      const apiUrl = `/users/social_specialist/${ID}`
      const response = await defaultAPI.get(apiUrl)
      return response.data
    } catch (error) {
      return error.response.data
    }
  },
)
export const fetchSocialDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info
  try {
    dispatch(socialSpecialistData.pending())
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`)
    const data = response.data

    dispatch(socialSpecialistData.fulfilled(data))
    dispatch(setCurrentPage(state))
  } catch (error) {
    dispatch(socialSpecialistData.rejected())
  }
}
export const addSocial = createAsyncThunk(
  'socialSpecialist/addSocial',
  async (values, { rejectWithValue, getState }) => {
    try {
      const apiUrl = '/users'
      const response = await defaultAPI.post(apiUrl, values)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data) // Handle errors and return the error data
    }
  },
)

export const editSocial = createAsyncThunk(
  'socialSpecialist/editSocial',
  async (info) => {
    try {
      const apiUrl = `/users/${info.ID}`
      const response = await defaultAPI.put(apiUrl, info.values)
      return response.data
    } catch (error) {
      return
    }
  },
)
export const deleteSocial = createAsyncThunk(
  'socialSpecialist/deleteSocial',
  async (ID, { rejectWithValue }) => {
    try {
      const apiUrl = `/users/social_specialist/${ID}`
      const { data } = await defaultAPI.delete(apiUrl)
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

const socialSpecialistSlice = createSlice({
  name: 'socialSpecialist',
  initialState: {
    SocialSpecialist: [],
    ShowSocialSpecialist: [],
    SocialLinks: {
      first: null,
      last: null,
      next: null,
      prev: null,
    },
    currentPage: null,
    loading: false,
    error: false,
  },
  reducers: {
    resetShowSocialSpecialist: (state) => {
      state.ShowSocialSpecialist.data = null
      state.ShowSocialSpecialist.loading = false
      state.ShowSocialSpecialist.error = false
    },
  },
  extraReducers: {
    [socialSpecialistData.pending]: (state) => {
      state.loading = true
    },
    [socialSpecialistData.fulfilled]: (state, action) => {
      state.loading = false
      state.error = false
      state.SocialSpecialist = action.payload
      state.SocialLinks = action.payload.links
      state.SocialLinks.first = action.payload.links.first
      state.SocialLinks.last = action.payload.links.last
      state.SocialLinks.prev = action.payload.links.prev
      state.SocialLinks.next = action.payload.links.next
      state.currentPage = action.payload.meta.current_page
    },
    [socialSpecialistSearch.fulfilled]: (state, action) => {
      state.loading = false
      state.error = false
      state.SocialSpecialist = action.payload
      state.SocialLinks = action.payload.links
      state.SocialLinks.first = action.payload.links.first
      state.SocialLinks.last = action.payload.links.last
      state.SocialLinks.prev = action.payload.links.prev
      state.SocialLinks.next = action.payload.links.next
      state.currentPage = action.payload.meta.current_page
    },
    [socialSpecialistData.rejected]: (state) => {
      state.error = true
    },
    [ShowSocialSpecialist.pending]: (state) => {
      state.loading = true
    },
    [ShowSocialSpecialist.fulfilled]: (state, action) => {
      state.loading = false
      state.error = false
      state.ShowSocialSpecialist = action.payload
    },
    [ShowSocialSpecialist.rejected]: (state) => {
      state.error = true
    },
  },
})
export const { setCurrentPage, resetShowSocialSpecialist } =
  socialSpecialistSlice.actions
export default socialSpecialistSlice.reducer
