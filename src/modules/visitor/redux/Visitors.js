import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../../../axiosInstance.js'

export const getVisitors = createAsyncThunk('visitors/get', async (info) => {
  // const {brand_id,color_id,visitor_id,pageSize} = info
  let apiUrl = `/api/visitors?&per_page=${info.pageSize}`
  try {
    const res = await defaultAPI.get(apiUrl)
    return res.data
  } catch (error) {
    throw error
  }
})
export const searchVistors = createAsyncThunk("Vistors/search", async (info) => {
  let apiUrl = `/api/visitors?per_page=${info.pageSize}&handle=${info.handle}`;
  const res = await defaultAPI.get(apiUrl);
  return res.data;
});
export const addVisitors = createAsyncThunk('visitors/add', async (values) => {
  let apiUrl = `/api/visitors`
  try {
    const res = await defaultAPI.post(apiUrl, values)
    return res.data
  } catch (error) {
    throw error
  }
})
export const OneVisitor = createAsyncThunk('visitors/getOne', async (id) => {
  let apiUrl = `/api/visitors/${id}`
  try {
    const res = await defaultAPI.get(apiUrl)
    // console.log(res.data.data)
    return res.data
  } catch (error) {
    throw error
  }
})
export const fetchVisitorsDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info
  try {
    dispatch(getVisitors.pending())
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`)
    const data = response.data

    dispatch(getVisitors.fulfilled(data))
    dispatch(setCurrentPage(state))
  } catch (error) {
    dispatch(getVisitors.rejected())
  }
}
export const deleteVisitor = createAsyncThunk(
  'visitorsCars/delete',
  async (id) => {
    const apiUrl = `/api/visitors/${id}`
    try {
      const res = await defaultAPI.delete(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
export const editVisitor = createAsyncThunk('visitors/edit', async (info) => {
  const apiUrl = `/api/visitors/${info.id}`
  try {
    const res = await defaultAPI.put(apiUrl, info.values)
    return res.data
  } catch (error) {
    throw error
  }
})

const visitorsSlice = createSlice({
  name: 'visitors',
  initialState: {
    VisitorsData: [],
    OneVisitorData: [],
    VisitorsLinks: {
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
      .addCase(getVisitors.pending, (state) => {
        state.loading = true
      })
      .addCase(getVisitors.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.VisitorsData = action.payload
        state.VisitorsLinks = action.payload.links
        state.VisitorsLinks.first = action.payload.links.first
        state.VisitorsLinks.last = action.payload.links.last
        state.VisitorsLinks.prev = action.payload.links.prev
        state.VisitorsLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      }).addCase(searchVistors.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.VisitorsData = action.payload
        state.VisitorsLinks = action.payload.links
        state.VisitorsLinks.first = action.payload.links.first
        state.VisitorsLinks.last = action.payload.links.last
        state.VisitorsLinks.prev = action.payload.links.prev
        state.VisitorsLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })
      .addCase(getVisitors.rejected, (state) => {
        state.error = true
      })
      .addCase(deleteVisitor.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteVisitor.fulfilled, (state) => {
        state.loading = false
        state.error = false
      })
      .addCase(deleteVisitor.rejected, (state) => {
        state.error = true
      })
      .addCase(OneVisitor.pending, (state) => {
        state.loading = true
      })
      .addCase(OneVisitor.fulfilled, (state, action) => {
        state.loading = false
        state.OneVisitorData = action.payload
        state.error = false
      })
      .addCase(OneVisitor.rejected, (state) => {
        state.error = true
      })
  },
})
export const { setCurrentPage } = visitorsSlice.actions

export default visitorsSlice.reducer
