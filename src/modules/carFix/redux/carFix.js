import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../../../axiosInstance.js'
import { fileDownload } from 'js-file-download'

export const getCarFix = createAsyncThunk(
  'carFix/get',
  async ({ pageSize, id }) => {
    let apiUrl = `/api/admin/garages/${id}/car_fixes?per_page=${pageSize}`
    // ! id ? apiUrl = `/api/admin/garages/${id}/car_fixes?per_page=${pageSize}`:`/api/admin/garages/${id}/car_fixes?per_page=${pageSize}`
    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
export const getOneCarFix = createAsyncThunk('carFix/getOne', async (info) => {
  console.log(info)
  let apiUrl = `/api/admin/garages/${info.garage_id}/car_fixes/${info.fix_id}`
  try {
    const res = await defaultAPI.get(apiUrl)
    return res.data
  } catch (error) {
    throw error
  }
})
export const addCarFix = createAsyncThunk('carFix/add', async (values) => {
  let apiUrl = `/api/admin/car_fixes`
  try {
    const res = await defaultAPI.post(apiUrl, values)
    return res.data
  } catch (error) {
    throw error
  }
})
export const editCarFix = createAsyncThunk(
  'carFix/edit',
  async ({ id, values }) => {
    let apiUrl = `/api/admin/car_fixes/${id}`
    try {
      const res = await defaultAPI.put(apiUrl, values)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
export const followUpRepair = createAsyncThunk(
  'carFix/follow',
  async (info) => {
    let apiUrl = `/api/admin/car_fixes/${info.id}/repair_follow_up`
    try {
      const res = await defaultAPI.post(apiUrl, info.values)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
export const payAmount = createAsyncThunk('carFix/pay', async (info) => {
  let apiUrl = `/api/admin/car_fixes/${info.id}/pay_amount?garage_id=${info.garage_id}&paid_amount=${info.pay}`
  try {
    const res = await defaultAPI.patch(apiUrl)
    return res.data
  } catch (error) {
    throw error
  }
})
export const finishCarFix = createAsyncThunk('carFix/finish', async (info) => {
  let apiUrl = `/api/admin/car_fixes/${info.id}/finish?garage_id=${info.garage_id}`
  try {
    const res = await defaultAPI.patch(apiUrl)
    return res.data
  } catch (error) {
    throw error
  }
})
export const fetchCarFixDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info
  try {
    dispatch(getCarFix.pending())
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`)
    const data = response.data

    dispatch(getCarFix.fulfilled(data))
    dispatch(setCurrentPage(state))
  } catch (error) {
    dispatch(getCarFix.rejected())
  }
}
export const searchCarFix = createAsyncThunk('carFix/search', async (info) => {
  const apiUrl = `/api/admin/garages/${info.id}/car_fixes?handle=${info.handle}&&per_page=${info.pageSize}`
  try {
    const res = await defaultAPI.get(apiUrl)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
})
export const deleteVisit = createAsyncThunk('carFix/delete', async (id) => {
  const apiUrl = `/api/admin/visits/${id}`
  try {
    const res = await defaultAPI.delete(apiUrl)
    return res.data
  } catch (error) {
    throw error
  }
})

export const editVisit = createAsyncThunk(
  'carFix/edit',
  async ({ id, values }) => {
    const apiUrl = `/api/admin/visits/${id}`
    try {
      const res = await defaultAPI.put(apiUrl, values)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
export const exportCarFix = createAsyncThunk('carFix/export', async (id) => {
  let apiUrl = `/api/exports/car_fixes/${id}`
  try {
    const res = await defaultAPI.get(apiUrl)
    return res.data
  } catch (error) {
    throw error
  }
})
const CarFixSlice = createSlice({
  name: 'carFix',
  initialState: {
    carFixData: [],
    oneFixData: [],
    carFixLinks: {
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
      .addCase(getCarFix.pending, (state) => {
        state.loading = true
      })
      .addCase(getCarFix.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.carFixData = action.payload
        state.carFixLinks = action.payload.links
        state.carFixLinks.first = action.payload.links.first
        state.carFixLinks.last = action.payload.links.last
        state.carFixLinks.prev = action.payload.links.prev
        state.carFixLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })
      .addCase(getCarFix.rejected, (state) => {
        state.error = true
      })
      .addCase(addCarFix.pending, (state) => {
        state.loading = true
      })
      .addCase(addCarFix.fulfilled, (state) => {
        state.loading = false
        state.error = false
      })
      .addCase(addCarFix.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(getOneCarFix.fulfilled, (state, action) => {
        state.error = false
        state.loading = false
        state.oneFixData = action.payload
      })
      .addCase(getOneCarFix.rejected, (state) => {
        state.error = true
      })
      .addCase(getOneCarFix.pending, (state) => {
        state.error = false
        state.loading = true
      })
      .addCase(deleteVisit.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteVisit.fulfilled, (state) => {
        state.loading = false
        state.error = false
      })
      .addCase(deleteVisit.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(searchCarFix.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.carFixData = action.payload
        state.carFixLinks = action.payload.links
        state.carFixLinks.first = action.payload.links.first
        state.carFixLinks.last = action.payload.links.last
        state.carFixLinks.prev = action.payload.links.prev
        state.carFixLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })
  },
})
export const { setCurrentPage } = CarFixSlice.actions

export default CarFixSlice.reducer
