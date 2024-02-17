import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../../../axiosInstance.js'
export const ADD_PRODUCT = createAsyncThunk(
  'product/ADD_PRODUCT',
  async (INFO) => {
    try {
      const apiUrl = `/products`
      const response = await defaultAPI.post(apiUrl, INFO)
      return response.data
    } catch (error) {
      return error.response.data
    }
  },
)
export const move_products = createAsyncThunk(
  'product/move_products',
  async (info) => {
    try {
      const apiUrl = `/products/${info.id}`
      const response = await defaultAPI.put(apiUrl, info)
      return response.data
    } catch (error) {
      return error.response.data
    }
  },
)
export const getOneProduct = createAsyncThunk(
  'product/oneproduct',
  async (id) => {
    try {
      const apiUrl = `/products/${id}`

      const response = await defaultAPI.get(apiUrl)
      return response.data
    } catch (error) {
      return error.response.data
    }
  },
)
export const getSelectMenuBrands = createAsyncThunk(
  'product/getSelectMenuBrands',
  async () => {
    try {
      const apiUrl = `/select_menu/brands`
      const response = await defaultAPI.get(apiUrl)
      return response.data
    } catch (error) {
      return error.response.data
    }
  },
)
export const getSelectCarModel = createAsyncThunk(
  'product/getSelectCarModel',
  async (id) => {
    try {
      const apiUrl = `/select_menu/car_models?brand_id=${id}`
      const response = await defaultAPI.get(apiUrl)
      return response.data
    } catch (error) {
      return error.response.data
    }
  },
)
export const getSelectUnits = createAsyncThunk(
  'product/getSelectUnits',
  async (id) => {
    try {
      const apiUrl = `/select_menu/units`
      const response = await defaultAPI.get(apiUrl)
      return response.data
    } catch (error) {
      return error.response.data
    }
  },
)
export const UPDATE_PRODUCT = createAsyncThunk(
  'product/UPDATE_PRODUCT',
  async (INFO) => {
    try {
      const apiUrl = `/products/${INFO.id}`
      const response = await defaultAPI.post(apiUrl, INFO.data)
      return response.data
    } catch (error) {
      return error.response.data
    }
  },
)
const oneProductSlice = createSlice({
  name: 'product',
  initialState: {
    oneProduct: [],
    selectCarModel: [],
    selectBransMenu: [],
    selectUnits: [],

    // examsLinks: {
    //     first: null,
    //     last: null,
    //     next: null,
    //     prev: null
    // },
    // currentPage: null,
    loading: false,
    error: false,
  },
  reducers: {
    resetOneProduct: (state) => {
      state.oneProduct.data = null
      state.oneProduct.loading = false
      state.oneProduct.error = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOneProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(getOneProduct.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.oneProduct = action.payload
      })
      .addCase(getOneProduct.rejected, (state) => {
        state.error = true
      })
      .addCase(getSelectUnits.pending, (state) => {
        state.loading = true
      })
      .addCase(getSelectUnits.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.selectUnits = action.payload
      })
      .addCase(getSelectUnits.rejected, (state) => {
        state.error = true
      })
      .addCase(getSelectMenuBrands.pending, (state) => {
        state.loading = true
      })
      .addCase(getSelectMenuBrands.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.selectBransMenu = action.payload
      })
      .addCase(getSelectMenuBrands.rejected, (state) => {
        state.error = true
      })
      .addCase(getSelectCarModel.pending, (state) => {
        state.loading = true
      })
      .addCase(getSelectCarModel.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.selectCarModel = action.payload
      })
      .addCase(getSelectCarModel.rejected, (state) => {
        state.error = true
      })
  },
})
export const { resetOneProduct } = oneProductSlice.actions
export default oneProductSlice.reducer
