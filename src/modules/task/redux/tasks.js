import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../../../axiosInstance.js'

export const getTasks = createAsyncThunk('tasks/get', async (info) => {
  let apiUrl = `/api/admin/tasks?from=${info?.from}&to=${info?.to}&overdue_only=${info?.overdue_only}&per_page=${info.pageSize}`
  try {
    const res = await defaultAPI.get(apiUrl)
    return res.data
  } catch (error) {
    throw error
  }
})

export const searchTasks = createAsyncThunk('tasks/search', async (info) => {
  let apiUrl = `/api/admin/tasks?per_page=${info.pageSize}&handle=${info.handle}`
  try {
    const res = await defaultAPI.get(apiUrl)
    return res.data
  } catch (error) {
    throw error
  }
})
export const approveTasks = createAsyncThunk('tasks/Approve', async (id) => {
  let apiUrl = `/api/admin/tasks/${id}/finish`
  try {
    const res = await defaultAPI.patch(apiUrl)
    return res.data
  } catch (error) {
    throw error
  }
})

export const OneTask = createAsyncThunk('tasks/getOne', async (id) => {
  let apiUrl = `/api/admin/tasks/${id}`
  try {
    const res = await defaultAPI.get(apiUrl)
    return res.data
  } catch (error) {
    throw error
  }
})
export const fetchTasksDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info
  try {
    dispatch(getTasks.pending())
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`)
    const data = response.data

    dispatch(getTasks.fulfilled(data))
    dispatch(setCurrentPage(state))
  } catch (error) {
    dispatch(getTasks.rejected())
  }
}
export const deletetask = createAsyncThunk('tasks/delete', async (id) => {
  const apiUrl = `/api/admin/tasks/${id}`
  try {
    const res = await defaultAPI.delete(apiUrl)
    return res.data
  } catch (error) {
    throw error
  }
})
export const addTask = createAsyncThunk('tasks/add', async (values) => {
  const apiUrl = `/api/admin/tasks`
  try {
    const res = await defaultAPI.post(apiUrl, values)
    return res.data
  } catch (error) {
    throw error
  }
})
export const writeNote = createAsyncThunk('tasks/writeNote', async (info) => {
  console.log(info)
  const apiUrl = `/api/tasks/my_tasks/${info.id}/notes`
  try {
    const res = await defaultAPI.post(apiUrl, { description: info.values })
    return res.data
  } catch (error) {
    throw error
  }
})
export const editTask = createAsyncThunk('tasks/edit', async (info) => {
  const apiUrl = `/api/admin/tasks/${info.id}`
  try {
    const res = await defaultAPI.put(apiUrl, info.data)
    return res.data
  } catch (error) {
    throw error
  }
})

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasksData: [],
    OneTaskData: [],
    tasksLinks: {
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
      .addCase(getTasks.pending, (state) => {
        state.loading = true
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.tasksData = action.payload
        state.tasksLinks = action.payload.links
        state.tasksLinks.first = action.payload.links.first
        state.tasksLinks.last = action.payload.links.last
        state.tasksLinks.prev = action.payload.links.prev
        state.tasksLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })
      .addCase(searchTasks.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.tasksData = action.payload
        state.tasksLinks = action.payload.links
        state.tasksLinks.first = action.payload.links.first
        state.tasksLinks.last = action.payload.links.last
        state.tasksLinks.prev = action.payload.links.prev
        state.tasksLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })
      .addCase(getTasks.rejected, (state) => {
        state.error = true
      })
      .addCase(deletetask.pending, (state) => {
        state.loading = true
      })
      .addCase(deletetask.fulfilled, (state) => {
        state.loading = false
        state.error = false
      })
      .addCase(deletetask.rejected, (state) => {
        state.error = true
      })

      .addCase(OneTask.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(OneTask.fulfilled, (state, action) => {
        state.OneTaskData = action.payload
        state.error = false
      })
      .addCase(OneTask.rejected, (state) => {
        state.error = true
      })
  },
})
export const { setCurrentPage } = tasksSlice.actions

export default tasksSlice.reducer
