import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../axiosInstance'

export const stuffData = createAsyncThunk('stuff/stuffData', async (info) => {
  const apiUrl = `/users/admin_employee?per_page=${info.pageSize}`

  try {
    const res = await defaultAPI.get(apiUrl)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
})
export const addAdmin = createAsyncThunk(
  'stuff/addAdmin',
  async (formData, { rejectWithValue, getState }) => {
    try {
      const apiUrl = '/users'
      const response = await defaultAPI.post(apiUrl, formData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data) // Handle errors and return the error data
    }
  },
)
export const editAdmin = createAsyncThunk('stuff/editAdmin', async (info) => {
  let { ID } = info
  try {
    const apiUrl = `/users/${ID}`
    const response = await defaultAPI.put(apiUrl, info.values)
    return response.data
  } catch (error) {
    return
  }
})
export const deleteAdmin = createAsyncThunk(
  'stuff/deleteAdmin',
  async (ID, { rejectWithValue, getState }) => {
    try {
      const apiUrl = `/users/admin_employee/${ID}`
      const response = await defaultAPI.delete(apiUrl)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data) // Handle errors and return the error data
    }
  },
)
export const fetchStuffDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info
  try {
    dispatch(stuffData.pending())
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`)
    const data = response.data

    dispatch(stuffData.fulfilled(data))
    dispatch(setCurrentPage(state))
  } catch (error) {
    dispatch(stuffData.rejected())
  }
}
export const ShowOneAdmin = createAsyncThunk(
  'stuff/ShowOneAdmin',
  async (ID, { rejectWithValue, getState }) => {
    try {
      const apiUrl = `/users/admin_employee/${ID}`
      const response = await defaultAPI.get(apiUrl)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

const stuffSlice = createSlice({
  name: 'stuff',
  initialState: {
    stuff: [],
    oneAdmin: [],
    stuffLinks: {
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
    resetOneAdmin: (state) => {
      state.oneAdmin.data = null
      state.oneAdmin.loading = false
      state.oneAdmin.error = false
    },
  },
  extraReducers: {
    [stuffData.pending]: (state) => {
      state.loading = true
    },
    [stuffData.fulfilled]: (state, action) => {
      state.loading = false
      state.error = false
      state.stuff = action.payload
      state.stuffLinks = action.payload.links
      state.stuffLinks.first = action.payload.links.first
      state.stuffLinks.last = action.payload.links.last
      state.stuffLinks.prev = action.payload.links.prev
      state.stuffLinks.next = action.payload.links.next
      state.currentPage = action.payload.meta.current_page
    },
    [stuffData.rejected]: (state) => {
      state.error = true
    },
    [ShowOneAdmin.pending]: (state) => {
      state.loading = true
    },
    [ShowOneAdmin.fulfilled]: (state, action) => {
      state.loading = false
      state.error = false
      state.oneAdmin = action.payload
    },
    [ShowOneAdmin.rejected]: (state) => {
      state.error = true
    },
  },
})
export const { setCurrentPage, resetOneAdmin } = stuffSlice.actions
export default stuffSlice.reducer
