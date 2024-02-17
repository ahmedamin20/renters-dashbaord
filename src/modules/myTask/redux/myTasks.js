import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../../../axiosInstance.js'

export const getMytasks = createAsyncThunk('myTasks/get', async (info) => {
  let apiUrl = `/api/tasks/my_tasks?from=${info?.from}&to=${info?.to}&overdue_only=${info?.overdue_only}&per_page=${info.pageSize}`
  const res = await defaultAPI.get(apiUrl)
  return res.data
})
export const approveMyTasks = createAsyncThunk(
  'myTasks/Approve',
  async (id) => {
    let apiUrl = `/api/tasks/my_tasks/${id}/finish`
    try {
      const res = await defaultAPI.patch(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)

const myTasksSlice = createSlice({
  name: 'myTasks',
  initialState: {
    myTasksData: [],
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMytasks.pending, (state) => {
        state.loading = true
      })
      .addCase(getMytasks.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.myTasksData = action.payload
      })
      .addCase(getMytasks.rejected, (state) => {
        state.error = true
      })
  },
})
export const { setCurrentPage } = myTasksSlice.actions

export default myTasksSlice.reducer
