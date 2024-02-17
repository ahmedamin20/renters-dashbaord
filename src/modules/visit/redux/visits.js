import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../../../axiosInstance.js'

export const getVisits = createAsyncThunk(
  'visits/get',
  async ({ pageSize, id }) => {
    let apiUrl = `/garages/${id}/visits?per_page=${pageSize}`
    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
export const getOneVisit = createAsyncThunk(
  'visits/getOne',
  async ({ visitId, id }) => {
    let apiUrl = `/garages/${id}/visits/${visitId}`
    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
export const addVisits = createAsyncThunk('visits/add', async (values) => {
  let apiUrl = `/api/admin/visits`
  try {
    const res = await defaultAPI.post(apiUrl, values)
    return res.data
  } catch (error) {
    throw error
  }
})
export const fetchVisitsDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info
  try {
    dispatch(getVisits.pending())
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`)
    const data = response.data

    dispatch(getVisits.fulfilled(data))
    dispatch(setCurrentPage(state))
  } catch (error) {
    dispatch(getVisits.rejected())
  }
}
export const searchVisits = createAsyncThunk('visits/search', async (info) => {
  const apiUrl = `/garages/${info.id}/visits?handle=${info.handle}&&per_page=${info.pageSize}`
  try {
    const res = await defaultAPI.get(apiUrl)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
})
export const deleteVisit = createAsyncThunk('visits/delete', async (id) => {
  const apiUrl = `/api/admin/visits/${id}`
  try {
    const res = await defaultAPI.delete(apiUrl)
    return res.data
  } catch (error) {
    throw error
  }
})

export const editVisit = createAsyncThunk(
  'visits/edit',
  async ({ id, values }) => {
    const apiUrl = `/api/admin/visits/${id}`
    try {
      const res = await defaultAPI.put(apiUrl, values)
      return res.data
    } catch (error) {
      throw error
    }
  },
)

const visitsSlice = createSlice({
  name: 'visits',
  initialState: {
    VisitsData: [],
    oneVisitsData: [],
    VisitsLinks: {
      first: null,
      last: null,
      next: null,
      prev: null,
    },
    currentPage: null,
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVisits.pending, (state) => {
        state.loading = true
      })
      .addCase(getVisits.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.VisitsData = action.payload
        state.VisitsLinks = action.payload.links
        state.VisitsLinks.first = action.payload.links.first
        state.VisitsLinks.last = action.payload.links.last
        state.VisitsLinks.prev = action.payload.links.prev
        state.VisitsLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })
      .addCase(getVisits.rejected, (state) => {
        state.error = true
      })
      .addCase(getOneVisit.fulfilled, (state, action) => {
        state.error = false
        state.oneVisitsData = action.payload
      })
      .addCase(getOneVisit.rejected, (state) => {
        state.error = true
      })
      .addCase(deleteVisit.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteVisit.fulfilled, (state) => {
        state.loading = false
        state.error = false
      })
      .addCase(deleteVisit.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(searchVisits.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.VisitsData = action.payload
        state.VisitsLinks = action.payload.links
        state.VisitsLinks.first = action.payload.links.first
        state.VisitsLinks.last = action.payload.links.last
        state.VisitsLinks.prev = action.payload.links.prev
        state.VisitsLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })
  },
})
export const { setCurrentPage } = visitsSlice.actions

export default visitsSlice.reducer
