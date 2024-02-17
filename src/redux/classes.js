import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../axiosInstance'

export const getClasses = createAsyncThunk(
  'school/classes/main',
  async (info) => {
    const { pageSize } = info
    const apiUrl = `/classes?per_page=${pageSize}`

    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
export const getClassesSearch = createAsyncThunk(
  'school/getClassesSearch',
  async (info) => {
    const { pageSize, handle } = info
    const apiUrl = `/classes?handle=${handle}&per_page=${pageSize}`

    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
export const getClassessDataByPage = (info) => async (dispatch) => {
  try {
    dispatch(getClasses.pending())
    const response = await defaultAPI.get(
      `${info.state}&per_page=${info.pageSize}`,
    )
    const data = response.data

    dispatch(getClasses.fulfilled(data))
    dispatch(setCurrentPage(info.state))
  } catch (error) {
    dispatch(getClasses.rejected())
  }
}
export const EditClassName = createAsyncThunk(
  'school/classes/edit',
  async (info) => {
    const { id, name } = info
    const apiUrl = `/classes/${id}`

    try {
      const res = await defaultAPI.put(apiUrl, { name })
      return res.data
    } catch (error) {}
  },
)

const classesSlice = createSlice({
  name: 'classes',
  initialState: {
    classes: [],
    search: [],
    className: '',
    classesLinks: {
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
    [getClasses.pending]: (state) => {
      state.loading = true
    },
    [getClasses.fulfilled]: (state, action) => {
      state.loading = false
      state.error = false
      state.classes = action.payload
      state.classesLinks = action.payload.links
      state.classesLinks.first = action.payload.links.first
      state.classesLinks.last = action.payload.links.last
      state.classesLinks.prev = action.payload.links.prev
      state.classesLinks.next = action.payload.links.next
      state.currentPage = action.payload.meta.current_page
    },
    [getClasses.rejected]: (state) => {
      state.error = true
    },
    [getClassesSearch.fulfilled]: (state, action) => {
      state.classes = action.payload
    },
    [EditClassName.pending]: (state) => {
      state.loading = true
    },
    [EditClassName.fulfilled]: (state) => {
      state.loading = false
      state.error = false
    },
    [EditClassName.rejected]: (state) => {
      state.error = true
    },
  },
})
export const { setCurrentPage } = classesSlice.actions

export default classesSlice.reducer
