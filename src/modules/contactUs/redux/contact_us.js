import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../../../axiosInstance.js'

export const getContactUs = createAsyncThunk(
  'contactUs/getContactUs',
  async (pageSize) => {
    const apiUrl = `/admin/contact_us?per_page=${pageSize}`
      const res = await defaultAPI.get(apiUrl)
      console.log(res.data)
      return res.data
  },
)
export const deleteContactUs = createAsyncThunk(
  "contactUs/deleteContactUs",
  async (id) => {
    const apiUrl = `/admin/contact_us/${id}`;
    const res = await defaultAPI.delete(apiUrl);
    return res.data;
  })

export const fetchContactUsDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info
  try {
    dispatch(getContactUs.pending())
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`)
    const data = response.data

    dispatch(getContactUs.fulfilled(data))
    dispatch(setCurrentPage(state))
  } catch (error) {
    dispatch(getContactUs.rejected())
  }
}
// export const searchContactUs = createAsyncThunk("contactUs/searchContactUs", async (info) => {
//     const apiUrl = `/contact?handle=${info.handle}&per_page=${info.pageSize}`
//     try {
//         const res = defaultAPI.get(apiUrl)
//         return res.data
//     }catch(error){
//         throw error
//     }
// })
const contactUsSlice = createSlice({
  name: 'contactUs',
  initialState: {
    contactUs: [],
    contactLinks: {
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
      .addCase(getContactUs.pending, (state) => {
        state.loading = true
      })
      .addCase(getContactUs.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.contactUs = action.payload
        state.contactLinks.last = action.payload.links.last
        state.contactLinks.first = action.payload.links.first
        state.contactLinks.prev = action.payload.links.prev
        state.contactLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })

      .addCase(getContactUs.rejected, (state) => {
        state.error = true
      })
  },
})
export const { setCurrentPage } = contactUsSlice.actions
export default contactUsSlice.reducer
