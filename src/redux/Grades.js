import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../axiosInstance'

export const getGrades = createAsyncThunk('school/grades', async (info) => {
  const { pageSize } = info
  const apiUrl = `/grades?per_page=${pageSize}`
  try {
    const res = await defaultAPI.get(apiUrl)
    return res.data
  } catch (error) {
    throw error
  }
})
export const getSearchGrades = createAsyncThunk(
  'school/getSearchGrades',
  async (info) => {
    console.log(info)
    const apiUrl = `/grades?handle=${info.handle}`
    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)

export const getGradeInfo = createAsyncThunk(
  'school/gradeInfo',
  async (info) => {
    const { id } = info
    const apiUrl = `/grades/${id}`

    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)

export const getGradeExpenses = createAsyncThunk(
  'school/getGradeExpenses',
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
export const getClasses = createAsyncThunk('school/classes', async () => {
  const apiUrl = '/select_menu/classes'
  try {
    const res = await defaultAPI.get(apiUrl)
    return res.data
  } catch (error) {
    throw error
  }
})
export const getGradesMenu = createAsyncThunk('school/Grades', async () => {
  const apiUrl = '/select_menu/grades'
  try {
    const res = await defaultAPI.get(apiUrl)
    return res.data
  } catch (error) {
    throw error
  }
})
export const addGrade = createAsyncThunk('school/addGrade', async (info) => {
  const { name, classes } = info
  const apiUrl = '/grades'
  try {
    const res = await defaultAPI.post(apiUrl, { name, classes })
    return res.data
  } catch (error) {
    return error.response.data.data
  }
})

export const editGrade = createAsyncThunk('school/editGrade', async (info) => {
  const { name, classes, id } = info
  const apiUrl = `/grades/${id}`

  try {
    const res = await defaultAPI.put(apiUrl, { name, classes })
    return res.data
  } catch (error) {
    throw error
  }
})

export const deleteGrade = createAsyncThunk(
  'school/deleteGrade',
  async (info) => {
    const { id } = info
    const apiUrl = `/grades/${id}`

    try {
      const res = await defaultAPI.delete(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
export const fetchGradesDataByPage = (info) => async (dispatch) => {
  let { state, pageSize } = info
  try {
    dispatch(getGrades.pending())
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`)
    const data = response.data

    dispatch(getGrades.fulfilled(data))
    dispatch(setCurrentPage(state))
  } catch (error) {
    dispatch(getGrades.rejected())
  }
}
const GradesSlice = createSlice({
  name: 'grades',
  initialState: {
    grades: [],
    gradesMenu: [],
    gradeInfo: [],
    studentGradeExpenses: [],
    classes: [],
    gradesLinks: {
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
      .addCase(getGrades.pending, (state) => {
        state.loading = true
      })
      .addCase(getGrades.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.grades = action.payload
        state.gradesLinks.first = action.payload.links.first
        state.gradesLinks.last = action.payload.links.last
        state.gradesLinks.prev = action.payload.links.prev
        state.gradesLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })
      .addCase(getGrades.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(getGradesMenu.pending, (state) => {
        state.loading = true
      })
      .addCase(getGradesMenu.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.gradesMenu = action.payload
      })
      .addCase(getSearchGrades.fulfilled, (state, action) => {
        state.grades = action.payload
      })
      .addCase(getGradesMenu.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(getGradeInfo.pending, (state) => {
        state.loading = true
      })
      .addCase(getGradeInfo.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.gradeInfo = action.payload
      })
      .addCase(getGradeInfo.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(addGrade.pending, (state) => {
        state.loading = true
      })
      .addCase(addGrade.fulfilled, (state) => {
        state.loading = false
        state.error = false
      })
      .addCase(addGrade.rejected, (state) => {
        state.error = true
      })
      .addCase(getClasses.pending, (state) => {
        state.loading = true
      })
      .addCase(getClasses.fulfilled, (state, action) => {
        state.loading = false
        state.classes = action.payload
        state.error = false
      })
      .addCase(getGradeExpenses.fulfilled, (state, action) => {
        state.studentGradeExpenses = action.payload
      })
      .addCase(getClasses.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(deleteGrade.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteGrade.fulfilled, (state, action) => {
        state.loading = false
        state.classes = action.payload
        state.error = false
      })
      .addCase(deleteGrade.rejected, (state) => {
        state.loading = false
        state.error = true
      })
  },
})
export const { setCurrentPage } = GradesSlice.actions

export default GradesSlice.reducer
