import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../../../axiosInstance.js'

export const getVacations = createAsyncThunk(
  'vacations/get',
  async ({ pageSize }) => {
    let apiUrl = `/admin/vacations?per_page=${pageSize}`
    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
export const getOneVisit = createAsyncThunk(
  'vacations/getOne',
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
export const addVacations = createAsyncThunk(
  'vacations/add',
  async (values) => {
    let apiUrl = `/admin/vacations`
    try {
      const res = await defaultAPI.post(apiUrl, values)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
export const fetchVacationsDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info
  try {
    dispatch(getVacations.pending())
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`)
    const data = response.data

    dispatch(getVacations.fulfilled(data))
    dispatch(setCurrentPage(state))
  } catch (error) {
    dispatch(getVacations.rejected())
  }
}
export const searchVacations = createAsyncThunk(
  'Vacations/search',
  async (info) => {
    const apiUrl = `/admin/vacations?handle=${info.handle}&per_page=${info.pageSize}`
    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      console.error(error)
      throw error
    }
  },
)
export const deleteVacations = createAsyncThunk(
  'Vacations/delete',
  async (id) => {
    const apiUrl = `/admin/vacations/${id}`
    try {
      const res = await defaultAPI.delete(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)

export const editVacations = createAsyncThunk(
  'Vacations/edit',
  async ({ id, values }) => {
    const apiUrl = `/admin/vacations/${id}`
    try {
      const res = await defaultAPI.put(apiUrl, values)
      return res.data
    } catch (error) {
      throw error
    }
  },
)

const vacationsSlice = createSlice({
  name: 'vacations',
  initialState: {
    vacationsData: [],
    oneVacationData: [],
    vacationsLinks: {
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
      .addCase(getVacations.pending, (state) => {
        state.loading = true
      })
      .addCase(getVacations.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.vacationsData = action.payload
        state.vacationsLinks = action.payload.links
        state.vacationsLinks.first = action.payload.links.first
        state.vacationsLinks.last = action.payload.links.last
        state.vacationsLinks.prev = action.payload.links.prev
        state.vacationsLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })
      .addCase(getVacations.rejected, (state) => {
        state.error = true
      })
      .addCase(getOneVisit.fulfilled, (state, action) => {
        state.error = false
        state.oneVacationData = action.payload
      })
      .addCase(getOneVisit.rejected, (state) => {
        state.error = true
      })
      .addCase(deleteVacations.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteVacations.fulfilled, (state) => {
        state.loading = false
        state.error = false
      })
      .addCase(deleteVacations.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(searchVacations.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.vacationsData = action.payload
        state.vacationsLinks = action.payload.links
        state.vacationsLinks.first = action.payload.links.first
        state.vacationsLinks.last = action.payload.links.last
        state.vacationsLinks.prev = action.payload.links.prev
        state.vacationsLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })
  },
})
export const { setCurrentPage } = vacationsSlice.actions

export default vacationsSlice.reducer
