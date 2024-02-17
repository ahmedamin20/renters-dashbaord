import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../../../axiosInstance.js'

export const getTypeExpensess = createAsyncThunk(
  'TypeExpensess/get',
  async (info) => {
    const { pageSize } = info
    const apiUrl = `/admin/type_expenses?per_page=${pageSize}`
    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
export const fetchTypeExpensessByPage = (info) => async (dispatch) => {
  let { state, pageSize } = info
  try {
    dispatch(getTypeExpensess.pending())
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`)
    const data = response.data

    dispatch(getTypeExpensess.fulfilled(data))
    dispatch(setCurrentPage(state))
  } catch (error) {
    dispatch(getTypeExpensess.rejected())
  }
}
export const addTypeExpensess = createAsyncThunk(
  'TypeExpensess/add',
  async (info) => {
    const apiUrl = '/admin/type_expenses'
    try {
      const res = await defaultAPI.post(apiUrl, info)
      return res.data
    } catch (error) {
      return error.response.data.data
    }
  },
)
export const deleteTypeExpensess = createAsyncThunk(
  'TypeExpensess/delete',
  async (id) => {
    const apiUrl = `/admin/type_expenses/${id}`

    try {
      const res = await defaultAPI.delete(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
export const getSearchTypeExpensess = createAsyncThunk(
  'garages/Search',
  async (info) => {
    const apiUrl = `/admin/type_expenses?handle=${info.handle}`
    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
// export const getEmployeeMenu = createAsyncThunk("garages/EmployeeMenu", async () => {
//   const apiUrl = "/select_menu/employees";
//   try {
//     const res = await defaultAPI.get(apiUrl);
//     return res.data;
//   } catch (error) {
//     throw error;
//   }
// });

// export const getOneGarage = createAsyncThunk(
//   "garages/ShowOne",
//   async (id) => {
//     const apiUrl = `/garages/${id}`;

//     try {
//       const res = await defaultAPI.get(apiUrl);
//       return res.data;
//     } catch (error) {
//       throw error;
//     }
//   }
// );

// export const getGradeExpenses = createAsyncThunk(
//   "school/getGradeExpenses",
//   async (info) => {
//     const { id } = info;
//     const apiUrl = `/students/${id}/students_grade_expenses`;
//     try {
//       const res = await defaultAPI.get(apiUrl);
//       return res.data;
//     } catch (error) {
//       throw error;
//     }
//   }
// );
// export const getClasses = createAsyncThunk("school/classes", async () => {
//   const apiUrl = "/select_menu/classes";
//   try {
//     const res = await defaultAPI.get(apiUrl);
//     return res.data;
//   } catch (error) {
//     throw error;
//   }
// });

// export const editGarage = createAsyncThunk("school/editGrade", async (info) => {
//   const apiUrl = `/garages/${info.id}`;

//   try {
//     const res = await defaultAPI.put(apiUrl, info);
//     return res.data;
//   } catch (error) {
//     throw error;
//   }
// });

const TypeExpensessSlice = createSlice({
  name: 'TypeExpensess',
  initialState: {
    typeExpensessData: [],
    // oneGarage: [],
    typeExpensesLinks: {
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
      .addCase(getTypeExpensess.pending, (state) => {
        state.loading = true
      })
      .addCase(getTypeExpensess.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.typeExpensessData = action.payload
        state.typeExpensesLinks.first = action.payload.links.first
        state.typeExpensesLinks.last = action.payload.links.last
        state.typeExpensesLinks.prev = action.payload.links.prev
        state.typeExpensesLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })
      .addCase(getTypeExpensess.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(getSearchTypeExpensess.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.typeExpensessData = action.payload
        state.typeExpensesLinks.first = action.payload.links.first
        state.typeExpensesLinks.last = action.payload.links.last
        state.typeExpensesLinks.prev = action.payload.links.prev
        state.typeExpensesLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      })
    // .addCase(getOneGarage.pending, (state) => {
    //   state.loading = true;
    // })
    // .addCase(getOneGarage.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.error = false;
    //   state.oneGarage = action.payload;
    // })
    // .addCase(getOneGarage.rejected, (state) => {
    //   state.loading = false;
    //   state.error = true;
    // })
    // .addCase(getEmployeeMenu.pending, (state) => {
    //   state.loading = true;
    // })
    // .addCase(getEmployeeMenu.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.error = false;
    //   state.employeeMenu = action.payload;
    // })
    // .addCase(getEmployeeMenu.rejected, (state) => {
    //   state.loading = false;
    //   state.error = true;
    // })
  },
})
export const { setCurrentPage } = TypeExpensessSlice.actions

export default TypeExpensessSlice.reducer
