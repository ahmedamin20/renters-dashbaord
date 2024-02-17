import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../../../axiosInstance.js'

export const getSections = createAsyncThunk(
  'sections/get',
  async ({ pageSize }) => {
    let apiUrl = `/admin/sections?per_page=${pageSize}`
    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
export const searchSections = createAsyncThunk(
  'sections/search',
  async ({ handle, pageSize }) => {
    let apiUrl = `/admin/sections?handle=${handle}&per_page=${pageSize}`
    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)

export const editSection = createAsyncThunk(
  'sections/edit',
  async ({ id, values }) => {
    const apiUrl = `/admin/sections/${id}`
    try {
      const res = await defaultAPI.put(apiUrl, values)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
export const deleteSection = createAsyncThunk('sections/delete', async (id) => {
  const apiUrl = `/admin/sections/${id}`
  try {
    const res = await defaultAPI.delete(apiUrl)
    return res.data
  } catch (error) {
    throw error
  }
})
export const addSection = createAsyncThunk('sections/add', async (values) => {
  const apiUrl = `/admin/sections`
  try {
    const res = await defaultAPI.post(apiUrl, values)
    return res.data
  } catch (error) {
    throw error
  }
})
export const fetchSectionsDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info
  try {
    dispatch(getSections.pending())
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`)
    const data = response.data

    dispatch(getSections.fulfilled(data))
    dispatch(setCurrentPage(state))
  } catch (error) {
    dispatch(getSections.rejected())
  }
}
const sectionSlice = createSlice({
  name: 'sections',
  initialState: {
    sectionsData: [],
    sectionsLinks: {
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
      .addCase(getSections.pending, (state) => {
        state.loading = true
      })
      .addCase(getSections.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.sectionsData = action.payload
        state.sectionsLinks = action.payload.links
        state.sectionsLinks.first = action.payload.links.first
        state.sectionsLinks.last = action.payload.links.last
        state.sectionsLinks.prev = action.payload.links.prev
        state.sectionsLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })
      .addCase(getSections.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(searchSections.pending, (state) => {
        state.loading = true
      })
      .addCase(searchSections.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.sectionsData = action.payload
      })
      .addCase(searchSections.rejected, (state) => {
        state.loading = false
        state.error = true
      })
  },
})
export const { setCurrentPage } = sectionSlice.actions

export default sectionSlice.reducer
