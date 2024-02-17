import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../axiosInstance'

export const selectExpenses = createAsyncThunk(
  'gradeExpenses/selectExpenses',
  async () => {
    const apiUrl = `/select_menu/expenses`

    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
export const getOneGradeExpenses = createAsyncThunk(
  'gradeExpenses/getOneGradeExpenses',
  async (info) => {
    const { pageSize, id } = info
    if (id) {
      const apiUrl = `/grades/${id}/grade_expenses?per_page=${pageSize}`
      try {
        const res = await defaultAPI.get(apiUrl)
        return res.data
      } catch (error) {
        throw error
      }
    } else {
      throw Error // This is a default exception to make the request goes into rejected state
    }
  },
)
export const deleteGradeExpenses = createAsyncThunk(
  'gradeExpenses/deleteGradeExpenses',
  async (ID, { rejectWithValue }) => {
    try {
      const apiUrl = `/grade_expenses/${ID}`
      const { data } = await defaultAPI.delete(apiUrl)
      return data
    } catch (error) {
      return rejectWithValue(error.response.data) // Handle errors and return the error data
    }
  },
)
export const getOneGradeExpensesByPage = (info) => async (dispatch) => {
  let { state, pageSize } = info
  try {
    dispatch(getOneGradeExpenses.pending())
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`)
    const data = response.data

    dispatch(getOneGradeExpenses.fulfilled(data))
    dispatch(setCurrentPage(state))
  } catch (error) {
    dispatch(getOneGradeExpenses.rejected())
  }
}

export const addOneGradeExpenses = createAsyncThunk(
  'gradeExpenses/addOneGradeExpenses',
  async (values, { rejectWithValue }) => {
    try {
      const apiUrl = '/grade_expenses'
      const res = await defaultAPI.post(apiUrl, values)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data) // Handle errors and return the error data
    }
  },
)
export const EditOneGradeExpenses = createAsyncThunk(
  'gradeExpenses/EditOneGradeExpenses',
  async (info) => {
    const { id, value } = info
    try {
      const apiUrl = `/grade_expenses/${id}`
      const response = await defaultAPI.put(apiUrl, value)
      return response.data
    } catch (error) {
      return error
    }
  },
)

const gradeExpensesSlice = createSlice({
  name: 'gradeExpenses',
  initialState: {
    OnegradeExpensesData: [],
    selectMenuExpenses: [],
    OneGradeExpensesLinks: {
      first: null,
      last: null,
      next: null,
      prev: null,
    },
    OneGradeExpensesCurrentPage: null,
    OneGradeExpensesLoading: false,
    OneGradeExpensesError: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload.meta.current_page
    },
  },
  extraReducers: {
    [getOneGradeExpenses.pending]: (state) => {
      state.OneGradeExpensesLoading = true
    },
    [getOneGradeExpenses.fulfilled]: (state, action) => {
      console.log(action)
      state.OneGradeExpensesLoading = false
      state.OneGradeExpensesError = false
      state.OnegradeExpensesData = action.payload
      state.OneGradeExpensesLinks.first = action.payload.links.first
      state.OneGradeExpensesLinks.last = action.payload.links.last
      state.OneGradeExpensesLinks.prev = action.payload.links.prev
      state.OneGradeExpensesLinks.next = action.payload.links.next
      state.OneGradeExpensesCurrentPage = action.payload.meta.current_page
    },
    [getOneGradeExpenses.rejected]: (state) => {
      state.OneGradeExpensesLoading = false
      state.OneGradeExpensesError = true
    },
    [selectExpenses.fulfilled]: (state, action) => {
      console.log('Select Expense')
      state.selectMenuExpenses = action.payload
    },
  },
})
export const { setCurrentPage } = gradeExpensesSlice.actions

export default gradeExpensesSlice.reducer
