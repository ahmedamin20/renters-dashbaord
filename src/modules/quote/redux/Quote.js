import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../../../axiosInstance.js'
export const QuoteData = createAsyncThunk('Quote/get', async (info) => {
  const { pageSize } = info
  const apiUrl = `/admin/quotes?per_page=${pageSize}`
  try {
    const res = await defaultAPI.get(apiUrl)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
})
export const searchQuote = createAsyncThunk('Quote/search', async (info) => {
  const apiUrl = `/admin/quotes?handle=${info.handle}`
  try {
    const res = await defaultAPI.get(apiUrl)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
})
export const deleteQuote = createAsyncThunk(
  'Qoute/delete',
  async (id, { rejectWithValue }) => {
    try {
      const apiUrl = `/admin/quotes/${id}`

      const { data } = await defaultAPI.delete(apiUrl)
      return data
    } catch (error) {
      return rejectWithValue(error.response.data) // Handle errors and return the error data
    }
  },
)
export const fetchQuotesDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info
  try {
    dispatch(QuoteData.pending())
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`)
    const data = response.data

    dispatch(QuoteData.fulfilled(data))
    dispatch(setCurrentPage(state))
  } catch (error) {
    dispatch(QuoteData.rejected())
  }
}
const QuoteSlice = createSlice({
  name: 'Quote',
  initialState: {
    getQuoteData: [],
    message: '',
    QuoteLinks: {
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
    [QuoteData.pending]: (state) => {
      state.loading = true
    },
    [QuoteData.fulfilled]: (state, action) => {
      state.loading = false
      state.error = false
      state.getQuoteData = action.payload
      state.QuoteLinks = action.payload.links
      state.QuoteLinks.first = action.payload.links.first
      state.QuoteLinks.last = action.payload.links.last
      state.QuoteLinks.prev = action.payload.links.prev
      state.QuoteLinks.next = action.payload.links.next
      state.currentPage = action.payload.meta.current_page
    },
    [searchQuote.fulfilled]: (state, action) => {
      state.loading = false
      state.error = false
      state.getQuoteData = action.payload
      state.QuoteLinks = action.payload.links
      state.QuoteLinks.first = action.payload.links.first
      state.QuoteLinks.last = action.payload.links.last
      state.QuoteLinks.prev = action.payload.links.prev
      state.QuoteLinks.next = action.payload.links.next
      state.currentPage = action.payload.meta.current_page
    },
    [fetchQuotesDataByPage.fulfilled]: (state, action) => {
      state.loading = false
      state.error = false
      state.getQuoteData = action.payload
      state.QuoteLinks = action.payload.links
      state.QuoteLinks.first = action.payload.links.first
      state.QuoteLinks.last = action.payload.links.last
      state.QuoteLinks.prev = action.payload.links.prev
      state.QuoteLinks.next = action.payload.links.next
      state.currentPage = action.payload.meta.current_page
    },
    [QuoteData.rejected]: (state) => {
      state.error = true
    },
  },
})
export const { setCurrentPage } = QuoteSlice.actions
export default QuoteSlice.reducer
