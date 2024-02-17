import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../../../axiosInstance.js'

export const getAdminEmployee = createAsyncThunk(
  'admin/get',
  async ({ pageSize }) => {
    let apiUrl = `/api/employees?per_page=${pageSize}`
    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
export const getOneAdmin = createAsyncThunk('admin/getOne', async (id) => {
  let apiUrl = `/api/employees/${id}`
  try {
    const res = await defaultAPI.get(apiUrl)
    return res.data
  } catch (error) {
    throw error
  }
})
export const addAdmin = createAsyncThunk('admin/add', async (values) => {
  let apiUrl = `/api/employees`
  try {
    const res = await defaultAPI.post(apiUrl, values)
    return res.data
  } catch (error) {
    throw error
  }
})
export const fetchAdminDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info
  try {
    dispatch(getAdminEmployee.pending())
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`)
    const data = response.data

    dispatch(getAdminEmployee.fulfilled(data))
    dispatch(setCurrentPage(state))
  } catch (error) {
    dispatch(getAdminEmployee.rejected())
  }
}
export const searchAdmin = createAsyncThunk('admin/search', async (info) => {
  const apiUrl = `/api/employees?handle=${info.handle}&&per_page=${info.pageSize}`
  try {
    const res = await defaultAPI.get(apiUrl)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
})
export const deleteAdmin = createAsyncThunk('admin/delete', async (id) => {
  const apiUrl = `/api/employees/${id}`
  try {
    const res = await defaultAPI.delete(apiUrl)
    return res.data
  } catch (error) {
    throw error
  }
})

export const editAdmin = createAsyncThunk(
  'admin/edit',
  async ({ id, values }) => {
    const apiUrl = `/api/employees/${id}`
    try {
      const res = await defaultAPI.put(apiUrl, values)
      return res.data
    } catch (error) {
      throw error
    }
  },
)

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    adminData: [],
    oneAdminData: [],
    adminLinks: {
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
      .addCase(getAdminEmployee.pending, (state) => {
        state.loading = true
      })
      .addCase(getAdminEmployee.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.adminData = action.payload
        state.adminLinks = action.payload.links
        state.adminLinks.first = action.payload.links.first
        state.adminLinks.last = action.payload.links.last
        state.adminLinks.prev = action.payload.links.prev
        state.adminLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })
      .addCase(getAdminEmployee.rejected, (state) => {
        state.error = true
      })
      .addCase(getOneAdmin.fulfilled, (state, action) => {
        state.error = false
        state.oneAdminData = action.payload
      })
      .addCase(getOneAdmin.rejected, (state) => {
        state.error = true
      })
      .addCase(deleteAdmin.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteAdmin.fulfilled, (state) => {
        state.loading = false
        state.error = false
      })
      .addCase(deleteAdmin.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(searchAdmin.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.adminData = action.payload
        state.adminLinks = action.payload.links
        state.adminLinks.first = action.payload.links.first
        state.adminLinks.last = action.payload.links.last
        state.adminLinks.prev = action.payload.links.prev
        state.adminLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })
  },
})
export const { setCurrentPage } = adminSlice.actions

export default adminSlice.reducer
