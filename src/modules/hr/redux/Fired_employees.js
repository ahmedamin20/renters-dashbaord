import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../../../axiosInstance.js'

export const getFired_employeesData = createAsyncThunk(
  'fired_employees/get',
  async (info) => {
    const { pageSize } = info
    const apiUrl = `/admin/fired_employees?per_page=${pageSize}`
    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      console.error(error)
      throw error
    }
  },
)

export const fetchFired_employeesDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info
  try {
    dispatch(getFired_employeesData.pending())
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`)
    const data = response.data
    dispatch(getFired_employeesData.fulfilled(data))
    dispatch(setCurrentPage(state))
  } catch (error) {
    dispatch(getFired_employeesData.rejected())
  }
}

export const AddFired_employees = createAsyncThunk(
  'fired_employees/add',
  async (values, { rejectWithValue, getState }) => {
    try {
      const apiUrl = '/admin/fired_employees'
      const res = await defaultAPI.post(apiUrl, values)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data) // Handle errors and return the error data
    }
  },
)

export const deleteFired_employees = createAsyncThunk(
  'fired_employees/delete',
  async (id, { rejectWithValue, getState }) => {
    try {
      const apiUrl = `/admin/fired_employees/${id}`
      const { data } = await defaultAPI.delete(apiUrl)
      return data
    } catch (error) {
      return rejectWithValue(error.response.data) // Handle errors and return the error data
    }
  },
)

const Fired_employeesSlice = createSlice({
  name: 'fired_employees',
  initialState: {
    Fired_employeesData: [],
    Fired_employeesLinks: {
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
      .addCase(getFired_employeesData.pending, (state) => {
        state.loading = true
      })
      .addCase(getFired_employeesData.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.Fired_employeesData = action.payload
        state.Fired_employeesLinks = action.payload.links
        state.Fired_employeesLinks.first = action.payload.links.first
        state.Fired_employeesLinks.last = action.payload.links.last
        state.Fired_employeesLinks.prev = action.payload.links.prev
        state.Fired_employeesLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })

      .addCase(getFired_employeesData.rejected, (state) => {
        state.error = true
      })
  },
})
export const { setCurrentPage } = Fired_employeesSlice.actions
export default Fired_employeesSlice.reducer
