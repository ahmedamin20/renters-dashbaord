import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../../../axiosInstance.js'
export const getTermsAndCondtions = createAsyncThunk(
  'termsAndCondtions/get',
  async () => {
    const apiUrl = `/terms_and_conditions`
    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      console.error(error)
      throw error
    }
  },
)
export const updateTermsAndCondtions = createAsyncThunk(
  'termsAndCondtions/update',
  async (values) => {
    const apiUrl = `/terms_and_conditions`
    try {
      const res = await defaultAPI.put(apiUrl, values)
      return res.data
    } catch (error) {
      console.error(error)
      throw error
    }
  },
)

const TermsandCondtionSlice = createSlice({
  name: 'termsAndCondtions',
  initialState: {
    termsAndCondtionsData: [],
  },
  reducers: {},
  extraReducers: {
    [getTermsAndCondtions.pending]: (state) => {
      state.loading = true
    },
    [getTermsAndCondtions.fulfilled]: (state, action) => {
      state.loading = false
      state.error = false
      state.termsAndCondtionsData = action.payload
    },
    [getTermsAndCondtions.rejected]: (state) => {
      state.error = true
      state.loading = false
    },
  },
})
export default TermsandCondtionSlice.reducer
