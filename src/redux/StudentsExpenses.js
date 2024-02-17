import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../axiosInstance'

export const AllStudentsExpensesData = createAsyncThunk(
  'StudentsExpenses/AllStudentsExpensesData',
  async (info) => {
    const { pageSize } = info
    const apiUrl = `/students/students_grade_expenses?per_page=${pageSize}`

    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
export const studentsMenuExpenses = createAsyncThunk(
  'StudentsExpenses/studentsMenuExpenses',
  async (info) => {
    const { id } = info
    const apiUrl = `/students/${id}/students_grade_expenses`

    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
export const studentsMultiExpenses = createAsyncThunk(
  'StudentsExpenses/studentsMultiExpenses',
  async (studentId) => {
    const apiUrl = `/students/${studentId}/students_grade_expenses/details`

    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
export const getAllStudentsExpensesDataByPage = (info) => async (dispatch) => {
  try {
    dispatch(AllStudentsExpensesData.pending())
    const response = await defaultAPI.get(
      `${info.state}&per_page=${info.pageSize}`,
    )
    const data = response.data

    dispatch(AllStudentsExpensesData.fulfilled(data))
    dispatch(setCurrentPage(info.state))
  } catch (error) {
    dispatch(AllStudentsExpensesData.rejected())
  }
}

const StudentsExpenses = createSlice({
  name: 'StudentsExpenses',
  initialState: {
    AllStudentsExpensesData: [],
    studentsMenuExpenses: [],
    MutliSelectExpenses: [],
    AllStudentsExpensesLinks: {
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
  extraReducers: {
    [AllStudentsExpensesData.pending]: (state) => {
      state.loading = true
    },
    [AllStudentsExpensesData.fulfilled]: (state, action) => {
      state.loading = false
      state.error = false
      state.AllStudentsExpensesData = action.payload
      state.AllStudentsExpensesLinks = action.payload.links
      state.AllStudentsExpensesLinks.first = action.payload.links.first
      state.AllStudentsExpensesLinks.last = action.payload.links.last
      state.AllStudentsExpensesLinks.prev = action.payload.links.prev
      state.AllStudentsExpensesLinks.next = action.payload.links.next
      state.currentPage = action.payload.meta.current_page
    },
    [AllStudentsExpensesData.rejected]: (state) => {
      state.error = true
    },
    [studentsMenuExpenses.fulfilled]: (state, action) => {
      state.studentsMenuExpenses = action.payload
    },
    [studentsMultiExpenses.fulfilled]: (state, action) => {
      state.MutliSelectExpenses = action.payload
    },
  },
})
export const { setCurrentPage } = StudentsExpenses.actions

export default StudentsExpenses.reducer
