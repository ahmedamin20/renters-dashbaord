import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../../../axiosInstance.js'

export const getGarages = createAsyncThunk('garages/get', async (info) => {
  const { pageSize } = info
  const apiUrl = `/garages?per_page=${pageSize}`
  try {
    const res = await defaultAPI.get(apiUrl)
    return res.data
  } catch (error) {
    throw error
  }
})
export const deleteGarage = createAsyncThunk('garage/delete', async (id) => {
  const apiUrl = `/garages/${id}`

  try {
    const res = await defaultAPI.delete(apiUrl)
    return res.data
  } catch (error) {
    throw error
  }
})
export const getEmployeeMenu = createAsyncThunk(
  'garages/EmployeeMenu',
  async ({ managerId }) => {
    const apiUrl = `/select_menu/employees?excluded_employee=${managerId}`
    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
export const addGagrage = createAsyncThunk('garages/add', async (info) => {
  const apiUrl = '/garages'
  const { name, phone, address, manager_id, employees } = info
  try {
    const res = await defaultAPI.post(apiUrl, {
      name,
      phone,
      address,
      manager_id,
      employees,
    })
    return res.data
  } catch (error) {
    return error.response.data.data
  }
})
export const getOneGarage = createAsyncThunk('garages/ShowOne', async (id) => {
  const apiUrl = `/garages/${id}`

  try {
    const res = await defaultAPI.get(apiUrl)
    return res.data
  } catch (error) {
    throw error
  }
})
export const getSearchGarages = createAsyncThunk(
  'garages/Search',
  async (info) => {
    const apiUrl = `/garages?handle=${info.handle}`
    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
export const fetchGarageDataByPage = (info) => async (dispatch) => {
  let { state, pageSize } = info
  try {
    dispatch(getGarages.pending())
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`)
    const data = response.data

    dispatch(getGarages.fulfilled(data))
    dispatch(setCurrentPage(state))
  } catch (error) {
    dispatch(getGarages.rejected())
  }
}

export const editGarage = createAsyncThunk('garages/edit', async (info) => {
  const apiUrl = `/garages/${info.id}`

  try {
    const res = await defaultAPI.put(apiUrl, info.values)
    return res.data
  } catch (error) {
    throw error
  }
})

const garagesSlice = createSlice({
  name: 'garages',
  initialState: {
    garagesData: [],
    employeeMenu: [],
    oneGarage: [],
    studentGradeExpenses: [],
    garagesLinks: {
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
      .addCase(getGarages.pending, (state) => {
        state.loading = true
      })
      .addCase(getGarages.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.garagesData = action.payload
        state.garagesLinks.first = action.payload.links.first
        state.garagesLinks.last = action.payload.links.last
        state.garagesLinks.prev = action.payload.links.prev
        state.garagesLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })
      .addCase(getSearchGarages.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.garagesData = action.payload
        state.garagesLinks.first = action.payload.links.first
        state.garagesLinks.last = action.payload.links.last
        state.garagesLinks.prev = action.payload.links.prev
        state.garagesLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })
      .addCase(getGarages.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(getOneGarage.pending, (state) => {
        state.loading = true
      })
      .addCase(getOneGarage.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.oneGarage = action.payload
      })
      .addCase(getOneGarage.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(getEmployeeMenu.pending, (state) => {
        state.loading = true
      })
      .addCase(getEmployeeMenu.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.employeeMenu = action.payload
      })
      .addCase(getEmployeeMenu.rejected, (state) => {
        state.loading = false
        state.error = true
      })
    //   .addCase(getSearchGrades.fulfilled, (state, action) => {
    //     state.grades = action.payload;
    //   })
    //   .addCase(getGradeInfo.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(getGradeInfo.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.error = false;
    //     state.gradeInfo = action.payload;
    //   })
    //   .addCase(getGradeInfo.rejected, (state) => {
    //     state.loading = false;
    //     state.error = true;
    //   })
    //   .addCase(addGrade.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(addGrade.fulfilled, (state) => {
    //     state.loading = false;
    //     state.error = false;
    //   })
    //   .addCase(addGrade.rejected, (state) => {
    //     state.error = true;
    //   })
    //   .addCase(getClasses.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(getClasses.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.classes = action.payload;
    //     state.error = false;
    //   })
    //   .addCase(getGradeExpenses.fulfilled, (state, action) => {
    //     state.studentGradeExpenses = action.payload;
    //   })
    //   .addCase(getClasses.rejected, (state) => {
    //     state.loading = false;
    //     state.error = true;
    //   })
    //   .addCase(deleteGrade.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(deleteGrade.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.classes = action.payload;
    //     state.error = false;
    //   })
    //   .addCase(deleteGrade.rejected, (state) => {
    //     state.loading = false;
    //     state.error = true;
    //   });
  },
})
export const { setCurrentPage } = garagesSlice.actions

export default garagesSlice.reducer
