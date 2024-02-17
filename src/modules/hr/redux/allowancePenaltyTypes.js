import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../../../axiosInstance.js'

export const getPenalty = createAsyncThunk(
  'penalty/get',
  async ({ pageSize, currentPage }) => {
    currentPage = currentPage || 1

    let apiUrl = `/admin/allowance_penalty_types?per_page=${pageSize}&page=${currentPage}`
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
export const addPenalty = createAsyncThunk('penalty/add', async (values) => {
  let apiUrl = `/admin/allowance_penalty_types`
  try {
    const res = await defaultAPI.post(apiUrl, values)
    return res.data
  } catch (error) {
    throw error
  }
})
export const fetchPenaltyDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info
  try {
    dispatch(getPenalty.pending())
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`)
    const data = response.data

    dispatch(getPenalty.fulfilled(data))
    dispatch(setCurrentPage(state))
  } catch (error) {
    dispatch(getPenalty.rejected())
  }
}
export const searchPenalty = createAsyncThunk(
  'penalty/search',
  async (info) => {
    const apiUrl = `/admin/allowance_penalty_types?handle=${info.handle}&&per_page=${info.pageSize}`
    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      console.error(error)
      throw error
    }
  },
)
export const deletePenalty = createAsyncThunk('penalty/delete', async (id) => {
  const apiUrl = `/admin/allowance_penalty_types/${id}`
  try {
    const res = await defaultAPI.delete(apiUrl)
    return res.data
  } catch (error) {
    throw error
  }
})

export const editPenalty = createAsyncThunk(
  'penalty/edit',
  async ({ id, values }) => {
    const apiUrl = `admin/allowance_penalty_types/${id}`
    try {
      const res = await defaultAPI.put(apiUrl, values)
      return res.data
    } catch (error) {
      throw error
    }
  },
)

const penaltySlice = createSlice({
  name: 'penalty',
  initialState: {
    penaltyData: [],
    onePenaltyData: [],
    penaltyLinks: {
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
      .addCase(getPenalty.pending, (state) => {
        state.loading = true
      })
      .addCase(getPenalty.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.penaltyData = action.payload
        state.penaltyLinks = action.payload.links
        state.penaltyLinks.first = action.payload.links.first
        state.penaltyLinks.last = action.payload.links.last
        state.penaltyLinks.prev = action.payload.links.prev
        state.penaltyLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })
      .addCase(getPenalty.rejected, (state) => {
        state.error = true
      })
      .addCase(getOneVisit.fulfilled, (state, action) => {
        state.error = false
        state.onePenaltyData = action.payload
      })
      .addCase(getOneVisit.rejected, (state) => {
        state.error = true
      })
      .addCase(deletePenalty.pending, (state) => {
        state.loading = true
      })
      .addCase(deletePenalty.fulfilled, (state) => {
        state.loading = false
        state.error = false
      })
      .addCase(deletePenalty.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(searchPenalty.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.penaltyData = action.payload
        state.penaltyLinks = action.payload.links
        state.penaltyLinks.first = action.payload.links.first
        state.penaltyLinks.last = action.payload.links.last
        state.penaltyLinks.prev = action.payload.links.prev
        state.penaltyLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })
  },
})
export const { setCurrentPage } = penaltySlice.actions

export default penaltySlice.reducer
