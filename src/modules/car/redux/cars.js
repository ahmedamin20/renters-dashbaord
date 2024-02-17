import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../../../axiosInstance.js'

export const getCarsData = createAsyncThunk(
  'cars/get',
  async ({ pageSize }) => {
    const apiUrl = `/cars?per_page=${pageSize}`
    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      console.error(error)
      throw error
    }
  },
)
export const SearchCars = createAsyncThunk('cars/Search', async (info) => {
  const { pageSize, handle } = info
  const apiUrl = `/cars?handle=${handle}&per_page=${pageSize}`
  try {
    const res = await defaultAPI.get(apiUrl)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
})
export const fetchCarsDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info
  try {
    dispatch(getCarsData.pending())
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`)
    const data = response.data
    dispatch(getCarsData.fulfilled(data))
    dispatch(setCurrentPage(state))
  } catch (error) {
    dispatch(getCarsData.rejected())
  }
}

export const addCar = createAsyncThunk(
  'Cars/add',
  async (values, { rejectWithValue, getState }) => {
    try {
      const apiUrl = '/cars'
      const res = await defaultAPI.post(apiUrl, values)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data) // Handle errors and return the error data
    }
  },
)

export const editCars = createAsyncThunk('cars/edit', async (carInfo) => {
  console.log(carInfo)
  try {
    const apiUrl = `/cars/${carInfo.id}`
    const response = await defaultAPI.put(apiUrl, carInfo.values)
    return response.data
  } catch (error) {
    return error
  }
})
export const deleteCars = createAsyncThunk(
  'cars/delete',
  async (id, { rejectWithValue, getState }) => {
    try {
      const apiUrl = `/cars/${id}`
      const { data } = await defaultAPI.delete(apiUrl)
      return data
    } catch (error) {
      return rejectWithValue(error.response.data) // Handle errors and return the error data
    }
  },
)

const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    carsData: [],
    carsLinks: {
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
  extraReducers: (builder) => {
    builder
      .addCase(getCarsData.pending, (state) => {
        state.loading = true
      })
      .addCase(getCarsData.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.carsData = action.payload
        state.carsLinks = action.payload.links
        state.carsLinks.first = action.payload.links.first
        state.carsLinks.last = action.payload.links.last
        state.carsLinks.prev = action.payload.links.prev
        state.carsLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })
      .addCase(SearchCars.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.carsData = action.payload
        state.carsLinks = action.payload.links
        state.carsLinks.first = action.payload.links.first
        state.carsLinks.last = action.payload.links.last
        state.carsLinks.prev = action.payload.links.prev
        state.carsLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })
      .addCase(getCarsData.rejected, (state) => {
        state.error = true
      })
  },
})
export const { setCurrentPage } = carsSlice.actions
export default carsSlice.reducer
