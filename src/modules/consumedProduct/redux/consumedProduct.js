import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../../../axiosInstance.js'

export const getConsumedProduct = createAsyncThunk(
  'consumedProduct/get',
  async (info) => {
    // const {brand_id,color_id,visitor_id,pageSize} = info
    let apiUrl = `/admin/consumed_products?per_page=${info.pageSize}`
    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
export const addConsumedProduct = createAsyncThunk(
  'consumedProduct/add',
  async (values) => {
    let apiUrl = `/admin/consumed_products`
    try {
      const res = await defaultAPI.post(apiUrl, values)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
export const editConsumedProduct = createAsyncThunk(
  'consumedProduct/edit',
  async (info) => {
    let apiUrl = `/admin/consumed_products/${info.id}`
    try {
      const res = await defaultAPI.put(apiUrl, info.values)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
export const OneCosnumedProduct = createAsyncThunk(
  'consumedProduct/getOne',
  async (id) => {
    let apiUrl = `/admin/consumed_products/${id}`
    try {
      const res = await defaultAPI.get(apiUrl)
      // console.log(res.data.data)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
export const searchComsumedProducts = createAsyncThunk(
  'consumedProduct/search',
  async (info) => {
    const apiUrl = `/admin/consumed_products?handle=${info.handle}`
    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      console.error(error)
      throw error
    }
  },
)
export const fetchComsumedProductDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info
  try {
    dispatch(getConsumedProduct.pending())
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`)
    const data = response.data

    dispatch(getConsumedProduct.fulfilled(data))
    dispatch(setCurrentPage(state))
  } catch (error) {
    dispatch(getConsumedProduct.rejected())
  }
}

const consumedProductSlice = createSlice({
  name: 'consumedProduct',
  initialState: {
    consumedProductsData: [],
    OneConsumedProductData: [],
    consumedProductsLinks: {
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
      .addCase(getConsumedProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(getConsumedProduct.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.consumedProductsData = action.payload
        state.consumedProductsLinks = action.payload.links
        state.consumedProductsLinks.first = action.payload.links.first
        state.consumedProductsLinks.last = action.payload.links.last
        state.consumedProductsLinks.prev = action.payload.links.prev
        state.consumedProductsLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })
      .addCase(searchComsumedProducts.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.consumedProductsData = action.payload
        state.consumedProductsLinks = action.payload.links
        state.consumedProductsLinks.first = action.payload.links.first
        state.consumedProductsLinks.last = action.payload.links.last
        state.consumedProductsLinks.prev = action.payload.links.prev
        state.consumedProductsLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })
      .addCase(getConsumedProduct.rejected, (state) => {
        state.error = true
      })
      .addCase(OneCosnumedProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(OneCosnumedProduct.fulfilled, (state, action) => {
        state.loading = false
        state.OneConsumedProductData = action.payload
        state.error = false
      })
      .addCase(OneCosnumedProduct.rejected, (state) => {
        state.error = true
      })
  },
})
export const { setCurrentPage } = consumedProductSlice.actions

export default consumedProductSlice.reducer
