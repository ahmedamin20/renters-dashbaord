import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../axiosInstance'

export const getCurrencies = createAsyncThunk(
  'currencies/getCurrencies',
  async () => {
    const apiUrl = `/currencies`
    const res = await defaultAPI.get(apiUrl)
    return res.data
  },
)
export const activeCurrencies = createAsyncThunk(
  'currencies/activeCurrencies',
  async (ID, { rejectWithValue }) => {
    try {
      const apiUrl = `currencies/${ID}`

      const { data } = await defaultAPI.patch(apiUrl)
      return data
    } catch (error) {
      return rejectWithValue(error.response.data) // Handle errors and return the error data
    }
  },
)

const currenciesSlice = createSlice({
  name: 'currencies',
  initialState: {
    currenciesData: [],
    currenciesLinks: {
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
    [getCurrencies.pending]: (state) => {
      state.loading = true
    },
    [getCurrencies.fulfilled]: (state, action) => {
      state.loading = false
      state.error = false
      state.currenciesData = action.payload
    },
    [getCurrencies.rejected]: (state) => {
      state.loading = false
      state.error = true
    },
  },
})
export const { setCurrentPage } = currenciesSlice.actions

export default currenciesSlice.reducer
