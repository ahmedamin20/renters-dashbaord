import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../../../axiosInstance.js'

export const getBlogs = createAsyncThunk('Blogs/get', async ({ pageSize }) => {
  let apiUrl = `/admin/blogs?per_page=${pageSize}`
  try {
    const res = await defaultAPI.get(apiUrl)
    return res.data
  } catch (error) {
    throw error
  }
})
export const getOneBlog = createAsyncThunk('Blogs/getOne', async (id) => {
  let apiUrl = `/admin/blogs/${id}`
  try {
    const res = await defaultAPI.get(apiUrl)
    return res.data
  } catch (error) {
    throw error
  }
})
export const addBlog = createAsyncThunk('Blogs/add', async (values) => {
  let apiUrl = `/admin/blogs`
  try {
    const res = await defaultAPI.post(apiUrl, values)
    return res.data
  } catch (error) {
    throw error
  }
})
export const fetchBlogsDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info
  try {
    dispatch(getBlogs.pending())
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`)
    const data = response.data

    dispatch(getBlogs.fulfilled(data))
    dispatch(setCurrentPage(state))
  } catch (error) {
    dispatch(getBlogs.rejected())
  }
}
export const searchBlogs = createAsyncThunk('Blogs/search', async (info) => {
  const apiUrl = `/admin/blogs?handle=${info.handle}&&per_page=${info.pageSize}`
  try {
    const res = await defaultAPI.get(apiUrl)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
})
export const deleteBlog = createAsyncThunk('Blogs/delete', async (id) => {
  const apiUrl = `/admin/blogs/${id}`
  try {
    const res = await defaultAPI.delete(apiUrl)
    return res.data
  } catch (error) {
    throw error
  }
})

export const editBlog = createAsyncThunk(
  'Blogs/edit',
  async ({ id, values }) => {
    const apiUrl = `/admin/blogs/${id}`
    try {
      const res = await defaultAPI.post(apiUrl, values)
      return res.data
    } catch (error) {
      throw error
    }
  },
)

const BlogsSlice = createSlice({
  name: 'Blogs',
  initialState: {
    BlogsData: [],
    oneBlogData: [],
    BlogsLinks: {
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
      .addCase(getBlogs.pending, (state) => {
        state.loading = true
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.BlogsData = action.payload
        state.BlogsLinks = action.payload.links
        state.BlogsLinks.first = action.payload.links.first
        state.BlogsLinks.last = action.payload.links.last
        state.BlogsLinks.prev = action.payload.links.prev
        state.BlogsLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })
      .addCase(getBlogs.rejected, (state) => {
        state.error = true
      })
      .addCase(getOneBlog.fulfilled, (state, action) => {
        state.error = false
        state.oneBlogData = action.payload
      })
      .addCase(getOneBlog.rejected, (state) => {
        state.error = true
      })
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteBlog.fulfilled, (state) => {
        state.loading = false
        state.error = false
      })
      .addCase(deleteBlog.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(addBlog.pending, (state) => {
        state.loading = true
      })
      .addCase(addBlog.fulfilled, (state) => {
        state.loading = false
        state.error = false
      })
      .addCase(addBlog.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(searchBlogs.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.BlogsData = action.payload
        state.BlogsLinks = action.payload.links
        state.BlogsLinks.first = action.payload.links.first
        state.BlogsLinks.last = action.payload.links.last
        state.BlogsLinks.prev = action.payload.links.prev
        state.BlogsLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })
  },
})
export const { setCurrentPage } = BlogsSlice.actions

export default BlogsSlice.reducer
