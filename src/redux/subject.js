import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../axiosInstance'

export const subjectDataGradeId = createAsyncThunk(
  'select_menu/subjectData',
  async (id) => {
    const apiUrl = `select_menu/subjects?grade_id=${id}`

    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      console.error(error)
      throw error
    }
  },
)

const subjectSlice = createSlice({
  name: 'subject',
  initialState: {
    subject: [],
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [subjectDataGradeId.pending]: (state) => {
      state.loading = true
    },
    [subjectDataGradeId.fulfilled]: (state, action) => {
      state.loading = false
      state.error = false
      state.subject = action.payload
    },
    [subjectDataGradeId.rejected]: (state) => {
      state.error = true
    },
  },
})

export default subjectSlice.reducer
