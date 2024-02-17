import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../axiosInstance'

export const getSubjects = createAsyncThunk('school/subjects', async (info) => {
  const { pageSize } = info
  const apiUrl = `/subjects?per_page=${pageSize}`

  try {
    const res = await defaultAPI.get(apiUrl)
    return res.data
  } catch (error) {
    throw error
  }
})

export const getSubjectInfo = createAsyncThunk(
  'school/subjectInfo',
  async (info) => {
    const { id } = info
    const apiUrl = `/subjects/${id}`
    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
export const getSubjectSearch = createAsyncThunk(
  'school/getSubjectSearch',
  async (handle) => {
    console.log(handle)
    const apiUrl = `/subjects?handle=${handle.handle}&per_page=${handle.pageSize}`
    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)

export const getGrades = createAsyncThunk('school/subject/grades', async () => {
  const apiUrl = `/select_menu/grades`

  try {
    const res = await defaultAPI.get(apiUrl)
    return res.data
  } catch (error) {
    throw error
  }
})

export const editSubject = createAsyncThunk(
  'school/editSubject',
  async (info) => {
    const { name, grades, id } = info
    const apiUrl = `/subjects/${id}`

    try {
      const res = await defaultAPI.put(apiUrl, { name, grades })
      return res.data
    } catch (error) {
      throw error
    }
  },
)

export const deleteSubject = createAsyncThunk(
  'school/deleteSubject',
  async (info) => {
    const { id } = info
    const apiUrl = `/subjects/${id}`
    try {
      const res = await defaultAPI.delete(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
export const fetchSubjectsDataByPage = (info) => async (dispatch) => {
  let { state, pageSize } = info
  try {
    dispatch(getSubjects.pending())
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`)
    const data = response.data
    dispatch(getSubjects.fulfilled(data))
    dispatch(setCurrentPage(state))
  } catch (error) {
    dispatch(getSubjects.rejected())
  }
}
const SubjectsSlice = createSlice({
  name: 'subjects',
  initialState: {
    subjects: [],
    subjectInfo: [],
    grades: [],
    subjectsLinks: {
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
      .addCase(getSubjects.pending, (state) => {
        state.loading = true
      })
      .addCase(getSubjects.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.subjects = action.payload
        state.subjectsLinks.first = action.payload.links.first
        state.subjectsLinks.last = action.payload.links.last
        state.subjectsLinks.prev = action.payload.links.prev
        state.subjectsLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })
      .addCase(getSubjects.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(getSubjectInfo.pending, (state) => {
        state.loading = true
      })
      .addCase(getSubjectInfo.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.subjectInfo = action.payload
      })
      .addCase(getSubjectSearch.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.subjects = action.payload
      })
      .addCase(getSubjectInfo.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(getGrades.pending, (state) => {
        state.loading = true
      })
      .addCase(getGrades.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.grades = action.payload
      })
      .addCase(getGrades.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(deleteSubject.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteSubject.fulfilled, (state) => {
        state.loading = false
        state.error = false
      })
      .addCase(deleteSubject.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(editSubject.pending, (state) => {
        state.loading = true
      })
      .addCase(editSubject.fulfilled, (state) => {
        state.loading = false
        state.error = false
      })
      .addCase(editSubject.rejected, (state) => {
        state.error = true
      })
  },
})
export const { setCurrentPage } = SubjectsSlice.actions

export default SubjectsSlice.reducer
