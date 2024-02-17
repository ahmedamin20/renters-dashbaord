import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../../../axiosInstance.js'

export const getStoreHouses = createAsyncThunk(
  'storeHouse/get',
  async ({ pageSize }) => {
    let apiUrl = `/storehouses?per_page=${pageSize}`
    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
export const OneSotreHouse = createAsyncThunk(
  'storeHouse/getOne',
  async (id) => {
    let apiUrl = `/storehouses/${id}`
    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
export const fetchStoreHouseDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info
  try {
    dispatch(getStoreHouses.pending())
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`)
    const data = response.data

    dispatch(getStoreHouses.fulfilled(data))
    dispatch(setCurrentPage(state))
  } catch (error) {
    dispatch(getStoreHouses.rejected())
  }
}
export const searchStoreHouse = createAsyncThunk(
  'storeHouse/search',
  async (info) => {
    const apiUrl = `/storehouses?handle=${info.handle}`
    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      console.error(error)
      throw error
    }
  },
)
export const deleteStoreHouse = createAsyncThunk(
  'storeHouse/delete',
  async (id) => {
    const apiUrl = `/storehouses/${id}`
    try {
      const res = await defaultAPI.delete(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
export const addStoreHouse = createAsyncThunk(
  'storeHouse/add',
  async (values) => {
    const apiUrl = `/storehouses`
    try {
      const res = await defaultAPI.post(apiUrl, values)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
export const editStoreHouse = createAsyncThunk(
  'storeHouse/edit',
  async (info) => {
    const { values, id } = info
    const apiUrl = `/storehouses/${id}`
    try {
      const res = await defaultAPI.put(apiUrl, values)
      return res.data
    } catch (error) {
      throw error
    }
  },
)

const storeHouseSlice = createSlice({
  name: 'storeHouse',
  initialState: {
    storeHouseData: [],
    OneSotreHouseData: [],
    storeHouseLinks: {
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
      .addCase(getStoreHouses.pending, (state) => {
        state.loading = true
      })
      .addCase(getStoreHouses.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.storeHouseData = action.payload
        state.storeHouseLinks = action.payload.links
        state.storeHouseLinks.first = action.payload.links.first
        state.storeHouseLinks.last = action.payload.links.last
        state.storeHouseLinks.prev = action.payload.links.prev
        state.storeHouseLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })
      .addCase(getStoreHouses.rejected, (state) => {
        state.error = true
      })
      .addCase(deleteStoreHouse.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteStoreHouse.fulfilled, (state) => {
        state.loading = false
        state.error = false
      })
      .addCase(deleteStoreHouse.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(OneSotreHouse.pending, (state) => {
        state.loading = true
      })
      .addCase(OneSotreHouse.fulfilled, (state, action) => {
        state.loading = false
        state.OneSotreHouseData = action.payload
        state.error = false
      })
      .addCase(OneSotreHouse.rejected, (state) => {
        state.error = true
      })
      .addCase(searchStoreHouse.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.storeHouseData = action.payload
        state.storeHouseLinks = action.payload.links
        state.storeHouseLinks.first = action.payload.links.first
        state.storeHouseLinks.last = action.payload.links.last
        state.storeHouseLinks.prev = action.payload.links.prev
        state.storeHouseLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })
  },
})
export const { setCurrentPage } = storeHouseSlice.actions

export default storeHouseSlice.reducer
