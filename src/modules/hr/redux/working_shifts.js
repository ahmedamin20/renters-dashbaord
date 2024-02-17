import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../../../axiosInstance.js'

export const getworking_shiftsData = createAsyncThunk(
  'working_shifts/get',
  async (info) => {
    const { pageSize } = info
    const apiUrl = `/admin/working_shifts?per_page=${pageSize}`
    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      console.error(error)
      throw error
    }
  },
)
export const searchworking_shiftsData = createAsyncThunk(
  'working_shifts/search',
  async (info) => {
    const { handle, pageSize } = info
    const apiUrl = `/admin/working_shifts?handle=${handle}&per_page=${pageSize}`
    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      console.error(error)
      throw error
    }
  },
)
export const fetchworking_shiftsDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info
  try {
    dispatch(getworking_shiftsData.pending())
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`)
    const data = response.data
    dispatch(getworking_shiftsData.fulfilled(data))
    dispatch(setCurrentPage(state))
  } catch (error) {
    dispatch(getworking_shiftsData.rejected())
  }
}

export const Addworking_shifts = createAsyncThunk(
  'working_shifts/add',
  async (values, { rejectWithValue, getState }) => {
    try {
      const apiUrl = '/admin/working_shifts'
      const res = await defaultAPI.post(apiUrl, values)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data) // Handle errors and return the error data
    }
  },
)

export const editworking_shifts = createAsyncThunk(
  'working_shifts/edit',
  async (props) => {
    try {
      const apiUrl = `/admin/working_shifts/${props.id}`
      const response = await defaultAPI.put(apiUrl, props.values)
      return response.data
    } catch (error) {
      return error
    }
  },
)
export const deleteworking_shifts = createAsyncThunk(
  'working_shifts/delete',
  async (id, { rejectWithValue }) => {
    try {
      const apiUrl = `/admin/working_shifts/${id}`
      const { data } = await defaultAPI.delete(apiUrl)
      return data
    } catch (error) {
      return rejectWithValue(error.response.data) // Handle errors and return the error data
    }
  },
)

const working_shiftslice = createSlice({
  name: 'working_shifts',
  initialState: {
    working_shiftsData: [],
    working_shiftsLinks: {
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
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload.meta.current_page
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getworking_shiftsData.pending, (state) => {
        state.loading = true
      })
      .addCase(getworking_shiftsData.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.working_shiftsData = action.payload
        state.working_shiftsLinks = action.payload.links
        state.working_shiftsLinks.first = action.payload.links.first
        state.working_shiftsLinks.last = action.payload.links.last
        state.working_shiftsLinks.prev = action.payload.links.prev
        state.working_shiftsLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })
      .addCase(searchworking_shiftsData.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.working_shiftsData = action.payload
        state.working_shiftsLinks = action.payload.links
        state.working_shiftsLinks.first = action.payload.links.first
        state.working_shiftsLinks.last = action.payload.links.last
        state.working_shiftsLinks.prev = action.payload.links.prev
        state.working_shiftsLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })

      .addCase(getworking_shiftsData.rejected, (state) => {
        state.error = true
      })
  },
})
export const { setCurrentPage } = working_shiftslice.actions
export default working_shiftslice.reducer
