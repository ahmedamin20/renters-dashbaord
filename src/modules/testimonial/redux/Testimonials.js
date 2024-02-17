import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../../../axiosInstance.js'
export const getTestimonialsData = createAsyncThunk(
  'Testimonials/get',
  async ({ pageSize }) => {
    const apiUrl = `/admin/testimonials?per_page=${pageSize}`
    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      console.error(error)
      throw error
    }
  },
)
export const searchTestimonials = createAsyncThunk("Testimonials/search", async (info) => {
  let apiUrl = `/admin/testimonials?per_page=${info.pageSize}&handle=${info.handle}`;
  const res = await defaultAPI.get(apiUrl);
  return res.data;
});
export const deleteTestimonials = createAsyncThunk(
  'Testimonials/delete',
  async (id, { rejectWithValue }) => {
    try {
      const apiUrl = `/admin/testimonials/${id}`

      const { data } = await defaultAPI.delete(apiUrl)
      return data
    } catch (error) {
      return rejectWithValue(error.response.data) // Handle errors and return the error data
    }
  },
)
export const fetchTestimonialsDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info
  try {
    dispatch(getTestimonialsData.pending())
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`)
    const data = response.data

    dispatch(getTestimonialsData.fulfilled(data))
    dispatch(setCurrentPage(state))
  } catch (error) {
    dispatch(getTestimonialsData.rejected())
  }
}
const TermsSlice = createSlice({
  name: 'Terms',
  initialState: {
    getTestimonialsData: [],
    message: '',
    TestimonialsLinks: {
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
    [getTestimonialsData.pending]: (state) => {
      state.loading = true
    },
    [getTestimonialsData.fulfilled]: (state, action) => {
      state.loading = false
      state.error = false
      state.getTestimonialsData = action.payload
      state.TestimonialsLinks = action.payload.links
      state.TestimonialsLinks.first = action.payload.links.first
      state.TestimonialsLinks.last = action.payload.links.last
      state.TestimonialsLinks.prev = action.payload.links.prev
      state.TestimonialsLinks.next = action.payload.links.next
      state.currentPage = action.payload.meta.current_page
    },
    [searchTestimonials.fulfilled]: (state, action) => {
      state.loading = false
      state.error = false
      state.getTestimonialsData = action.payload
      state.TestimonialsLinks = action.payload.links
      state.TestimonialsLinks.first = action.payload.links.first
      state.TestimonialsLinks.last = action.payload.links.last
      state.TestimonialsLinks.prev = action.payload.links.prev
      state.TestimonialsLinks.next = action.payload.links.next
      state.currentPage = action.payload.meta.current_page
    },
    [getTestimonialsData.rejected]: (state) => {
      state.error = true
      state.loading = false
    },
  },
})
export const { setCurrentPage } = TermsSlice.actions
export default TermsSlice.reducer
