import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../../../axiosInstance.js'

export const getJobData = createAsyncThunk('Job/get', async (info) => {
  const { pageSize } = info
  const apiUrl = `/admin/jobs?per_page=${pageSize}`
  try {
    const res = await defaultAPI.get(apiUrl)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
})
export const searchJobsData = createAsyncThunk('Job/search', async (info) => {
  const { handle, pageSize } = info
  const apiUrl = `/admin/jobs?handle=${handle}&per_page=${pageSize}`
  try {
    const res = await defaultAPI.get(apiUrl)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
})

export const fetchJobDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info
  try {
    dispatch(getJobData.pending())
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`)
    const data = response.data
    dispatch(getJobData.fulfilled(data))
    dispatch(setCurrentPage(state))
  } catch (error) {
    dispatch(getJobData.rejected())
  }
}

export const addJob = createAsyncThunk(
  'Job/add',
  async (values, { rejectWithValue }) => {
    try {
      const apiUrl = '/admin/jobs'
      const res = await defaultAPI.post(apiUrl, values)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data) // Handle errors and return the error data
    }
  },
)

export const editJob = createAsyncThunk('Job/edit', async (props) => {
  try {
    const apiUrl = `/admin/jobs/${props.id}`
    const response = await defaultAPI.put(apiUrl, props.values)
    return response.data
  } catch (error) {
    return error
  }
})
export const deleteJob = createAsyncThunk(
  'Job/delete',
  async (id, { rejectWithValue }) => {
    try {
      const apiUrl = `/admin/jobs/${id}`
      const { data } = await defaultAPI.delete(apiUrl)
      return data
    } catch (error) {
      return rejectWithValue(error.response.data) // Handle errors and return the error data
    }
  },
)

const Joblice = createSlice({
  name: 'Job',
  initialState: {
    JobData: [],
    JobLinks: {
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
      .addCase(getJobData.pending, (state) => {
        state.loading = true
      })
      .addCase(getJobData.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.JobData = action.payload
        state.JobLinks = action.payload.links
        state.JobLinks.first = action.payload.links.first
        state.JobLinks.last = action.payload.links.last
        state.JobLinks.prev = action.payload.links.prev
        state.JobLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })
      .addCase(searchJobsData.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.JobData = action.payload
        state.JobLinks = action.payload.links
        state.JobLinks.first = action.payload.links.first
        state.JobLinks.last = action.payload.links.last
        state.JobLinks.prev = action.payload.links.prev
        state.JobLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })

      .addCase(getJobData.rejected, (state) => {
        state.error = true
      })
  },
})
export const { setCurrentPage } = Joblice.actions
export default Joblice.reducer
