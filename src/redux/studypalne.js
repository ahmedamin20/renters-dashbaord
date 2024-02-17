import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../axiosInstance'
export const studyPlaneData = createAsyncThunk(
  'Plane/studyPlaneData',
  async (pageSize) => {
    const apiUrl = `/study_planes?per_page=${pageSize}`
    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      console.error(error)
      throw error
    }
  },
)
export const addPlane = createAsyncThunk(
  'Plane/addStudyPlane',
  async (formData, { rejectWithValue, getState }) => {
    try {
      const apiUrl = '/study_planes'

      const response = await defaultAPI.post(apiUrl, formData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data) // Handle errors and return the error data
    }
  },
)
export const editPlane = createAsyncThunk(
  'Plane/EditStudyPlane',
  async (info) => {
    try {
      const apiUrl = `/study_planes/${info.ID}`

      const response = await defaultAPI.put(apiUrl, info.values)

      return response.data
    } catch (error) {}
  },
)
export const deletePlane = createAsyncThunk(
  'studyPlane/deletePlane',
  async (ID, { rejectWithValue, getState }) => {
    try {
      const apiUrl = `/study_planes/${ID}`

      const { data } = await defaultAPI.delete(apiUrl)
      return data
    } catch (error) {
      return rejectWithValue(error.response.data) // Handle errors and return the error data
    }
  },
)
export const fetchStudyPlaneDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info
  try {
    dispatch(studyPlaneData.pending())
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`)
    const data = response.data

    dispatch(studyPlaneData.fulfilled(data))
    dispatch(setCurrentPage(state))
  } catch (error) {
    dispatch(studyPlaneData.rejected())
  }
}
const studyPlaneSlice = createSlice({
  name: 'studyPlane',
  initialState: {
    studyPlane: [],
    message: '',
    studyPlaneLinks: {
      first: '',
      last: '',
      next: '',
      prev: '',
    },
    currentPage: null,
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [studyPlaneData.pending]: (state) => {
      state.loading = true
    },
    [studyPlaneData.fulfilled]: (state, action) => {
      state.loading = false
      state.error = false
      state.studyPlane = action.payload
      state.studyPlaneLinks = action.payload.links
      state.studyPlaneLinks.first = action.payload.links.first
      state.studyPlaneLinks.last = action.payload.links.last
      state.studyPlaneLinks.prev = action.payload.links.prev
      state.studyPlaneLinks.next = action.payload.links.next
      state.currentPage = action.payload.meta.current_page
    },
    [studyPlaneData.rejected]: (state) => {
      state.error = true
    },
  },
})
export const { setCurrentPage } = studyPlaneSlice.actions
export default studyPlaneSlice.reducer
