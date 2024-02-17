import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../axiosInstance'

export const dashboardStatistics = createAsyncThunk(
  'dashboard/statistics',
  async () => {
    const apiUrl = '/dashboard/statistics'

    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)

export const dashboardGrades = createAsyncThunk(
  'dashboard/grades',
  async () => {
    const apiUrl = '/select_menu/grades'

    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
export const fetchDashboardDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info
  try {
    dispatch(dashboardStudents.pending())
    const response = await defaultAPI.get(`${state}&per_page${pageSize}`)
    const data = response.data

    dispatch(dashboardStudents.fulfilled(data))
    dispatch(setCurrentPage(state))
  } catch (error) {
    dispatch(dashboardStudents.rejected())
  }
}

export const dashboardClasses = createAsyncThunk(
  'dashboard/classes',
  async (info) => {
    const { id } = info
    const apiUrl = `/select_menu/classes?grade_id=${id}`

    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)

export const dashboardStudents = createAsyncThunk(
  'dashboard/student',
  async (info) => {
    const { id, pageSize } = info
    const apiUrl = `/classes/${id}/students?per_page=${pageSize}`

    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    statistics: [],
    grades: [],
    classes: [],
    students: [],
    dashboardLinks: {
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
      .addCase(dashboardStatistics.pending, (state) => {
        state.loading = true
      })
      .addCase(dashboardStatistics.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.statistics = action.payload.data
      })
      .addCase(dashboardStatistics.rejected, (state) => {
        state.error = true
      })
      .addCase(dashboardGrades.pending, (state) => {
        state.loading = true
      })
      .addCase(dashboardGrades.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.grades = action.payload.data
      })
      .addCase(dashboardGrades.rejected, (state) => {
        state.error = true
      })
      .addCase(dashboardClasses.pending, (state) => {
        state.loading = true
      })
      .addCase(dashboardClasses.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.classes = action.payload.data
      })
      .addCase(dashboardClasses.rejected, (state) => {
        state.error = true
      })
      .addCase(dashboardStudents.pending, (state) => {
        state.loading = true
      })
      .addCase(dashboardStudents.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.students = action.payload.data
        state.dashboardLinks = action.payload.links
        state.dashboardLinks.first = action.payload.links.first
        state.dashboardLinks.last = action.payload.links.last
        state.dashboardLinks.prev = action.payload.links.prev
        state.dashboardLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })
      .addCase(dashboardStudents.rejected, (state) => {
        state.error = true
      })
  },
})
export const { setCurrentPage } = dashboardSlice.actions

export default dashboardSlice.reducer
