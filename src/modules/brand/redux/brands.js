import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../../../axiosInstance.js'

export const getBrands = createAsyncThunk(
  'brands/get',
  async ({ pageSize }) => {
    let apiUrl = `/admin/brands?per_page=${pageSize}`
    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
export const searchBrand = createAsyncThunk("Brand/search", async (info) => {
  let apiUrl = `/admin/brands?per_page=${info.pageSize}&handle=${info.handle}`;
  const res = await defaultAPI.get(apiUrl);
  return res.data;
});
export const fetchBrandsDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info
  try {
    dispatch(getBrands.pending())
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`)
    const data = response.data
    dispatch(getBrands.fulfilled(data))
    dispatch(setCurrentPage(state))
  } catch (error) {
    dispatch(getBrands.rejected())
  }
}

export const deleteBrand = createAsyncThunk(
  'school/delete/exam',
  async (id) => {
    const apiUrl = `admin/brands/${id}`
    try {
      const res = await defaultAPI.delete(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)

export const editbrand = createAsyncThunk('brand/edit', async (props) => {
  const apiUrl = `admin/brands/${props.id}`

  try {
    const res = await defaultAPI.post(apiUrl, props.values, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return res.data
  } catch (error) {
    throw error
  }
})

const brandsSlice = createSlice({
  name: 'brands',
  initialState: {
    brandsData: [],
    brandsLinks: {
      first: null,
      last: null,
      next: null,
      prev: null,
    },
    currentPage: null,
    subjects: [],
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.loading = true
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.brandsData = action.payload
        state.brandsLinks = action.payload.links
        state.brandsLinks.first = action.payload.links.first
        state.brandsLinks.last = action.payload.links.last
        state.brandsLinks.prev = action.payload.links.prev
        state.brandsLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })
      .addCase(searchBrand.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.brandsData = action.payload
        state.brandsLinks = action.payload.links
        state.brandsLinks.first = action.payload.links.first
        state.brandsLinks.last = action.payload.links.last
        state.brandsLinks.prev = action.payload.links.prev
        state.brandsLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })
      .addCase(getBrands.rejected, (state) => {
        state.error = true
      })
      .addCase(deleteBrand.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
      })
      .addCase(deleteBrand.rejected, (state) => {
        state.error = true
      })
  },
})
export const { setCurrentPage } = brandsSlice.actions

export default brandsSlice.reducer
