import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../../../axiosInstance.js'

export const getcategories = createAsyncThunk('categories/get', async ({ pageSize }) => {
  let apiUrl = `/admin/categories?per_page=${pageSize}`
  try {
    const res = await defaultAPI.get(apiUrl)
    return res.data
  } catch (error) {
    throw error
  }
})
export const getOneCategory = createAsyncThunk('categories/getOne', async (id) => {
  let apiUrl = `/admin/categories/${id}`
  try {
    const res = await defaultAPI.get(apiUrl)
    return res.data
  } catch (error) {
    throw error
  }
})
export const addCategory = createAsyncThunk('categories/add', async (values) => {
  let apiUrl = `/admin/categories`
  try {
    const res = await defaultAPI.post(apiUrl, values)
    return res.data
  } catch (error) {
    throw error
  }
})
export const fetchcategoriesDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info
  try {
    dispatch(getcategories.pending())
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`)
    const data = response.data

    dispatch(getcategories.fulfilled(data))
    dispatch(setCurrentPage(state))
  } catch (error) {
    dispatch(getcategories.rejected())
  }
}
export const searchcategories = createAsyncThunk('categories/search', async (info) => {
  const apiUrl = `/admin/categories?handle=${info.handle}&&per_page=${info.pageSize}`
  try {
    const res = await defaultAPI.get(apiUrl)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
})
export const deleteCategory = createAsyncThunk('categories/delete', async (id) => {
  const apiUrl = `/admin/categories/${id}`
  try {
    const res = await defaultAPI.delete(apiUrl)
    return res.data
  } catch (error) {
    throw error
  }
})

export const editCategory = createAsyncThunk(
  'categories/edit',
  async ({ id, values }) => {
    const apiUrl = `/admin/categories/${id}`
    try {
      const res = await defaultAPI.post(apiUrl, values)
      return res.data
    } catch (error) {
      throw error
    }
  },
)

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categoriesData: [],
    oneBlogData: [],
    categoriesLinks: {
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
      .addCase(getcategories.pending, (state) => {
        state.loading = true
      })
      .addCase(getcategories.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.categoriesData = action.payload
        state.categoriesLinks = action.payload.links
        state.categoriesLinks.first = action.payload.links.first
        state.categoriesLinks.last = action.payload.links.last
        state.categoriesLinks.prev = action.payload.links.prev
        state.categoriesLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })
      .addCase(getcategories.rejected, (state) => {
        state.error = true
      })
      .addCase(getOneCategory.fulfilled, (state, action) => {
        state.error = false
        state.oneBlogData = action.payload
      })
      .addCase(getOneCategory.rejected, (state) => {
        state.error = true
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.loading = false
        state.error = false
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(addCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(addCategory.fulfilled, (state) => {
        state.loading = false
        state.error = false
      })
      .addCase(addCategory.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(searchcategories.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.categoriesData = action.payload
        state.categoriesLinks = action.payload.links
        state.categoriesLinks.first = action.payload.links.first
        state.categoriesLinks.last = action.payload.links.last
        state.categoriesLinks.prev = action.payload.links.prev
        state.categoriesLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })
  },
})
export const { setCurrentPage } = categoriesSlice.actions

export default categoriesSlice.reducer
