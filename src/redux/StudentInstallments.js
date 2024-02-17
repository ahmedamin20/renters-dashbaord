import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../axiosInstance'
export const getAllStudentInstallments = createAsyncThunk(
  'Installments/getAllStudentInstallments',
  async (info) => {
    if (info.id) {
      const apiUrl = `/students/${info.id}/installments?per_page=${info.pageSize}`
      try {
        const res = await defaultAPI.get(apiUrl)
        return res.data
      } catch (error) {
        console.error(error)
        throw error
      }
    }
  },
)
export const getAllInstallmentsData = createAsyncThunk(
  'Installments/getAllInstallmentsData',
  async (id) => {
    if (id) {
      const apiUrl = `/students/${id}/installments/student_details`
      try {
        const res = await defaultAPI.get(apiUrl)
        return res.data
      } catch (error) {
        console.error(error)
        throw error
      }
    }
  },
)
// export const parentSelectMenu = createAsyncThunk(
//     "parent/parentSelectMenu",
//     async () => {
//         const apiUrl = `select_menu/parents`;
//         try {
//             const res = await defaultAPI.get(apiUrl);
//             return res.data;
//         } catch (error) {
//             console.error(error);
//             throw error;
//         }
//     }
// );
export const fetchStudentInstallmentsByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info
  try {
    dispatch(getAllStudentInstallments.pending())
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`)
    const data = response.data

    dispatch(getAllStudentInstallments.fulfilled(data))
    dispatch(setCurrentPage(state))
  } catch (error) {
    dispatch(getAllStudentInstallments.rejected())
  }
}
export const addStudentInstallments = createAsyncThunk(
  'Installments/addStudentInstallments',
  async (values, { rejectWithValue, getState }) => {
    try {
      const apiUrl = '/installments'
      const response = await defaultAPI.post(apiUrl, values)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data) // Handle errors and return the error data
    }
  },
)
export const PayStudentInstallments = createAsyncThunk(
  'Installments/PayStudentInstallments',
  async (values, { rejectWithValue }) => {
    try {
      const apiUrl = `/installments/${values.id}/pay`
      const response = await defaultAPI.post(apiUrl, values)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data) // Handle errors and return the error data
    }
  },
)
// export const ShowParent = createAsyncThunk(
//     "parent/showParent",
//     async (ID, { getState }) => {
//         try {
//             const apiUrl = `/users/parent/${ID}`;
//             const response = await defaultAPI.get(apiUrl);
//             return response.data;
//         } catch (error) {
//             return (error.response.data);
//         }
//     }
// );
export const editStudentInstallments = createAsyncThunk(
  'Installments/editStudentInstallments',
  async (info) => {
    try {
      const apiUrl = `/installments/${info.id}`
      const response = await defaultAPI.patch(apiUrl, info)
      return response.data
    } catch (error) {
      return
    }
  },
)
// export const deleteParent = createAsyncThunk(
//     "parent/deletePlane",
//     async (ID, { rejectWithValue }) => {
//         try {
//             const apiUrl = `/users/parent/${ID}`;
//             const { data } = await defaultAPI.delete(apiUrl);
//             return data;
//         } catch (error) {
//             return rejectWithValue(error.response.data); // Handle errors and return the error data
//         }
//     }
// );
const InstallmentsSlice = createSlice({
  name: 'Installments',
  initialState: {
    StudentInstallments: [],
    InstallmentsData: [],
    // showParent: [],
    // ParentMenu: [],
    StudentInstallmentsLinks: {
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
    // }, resetShowParent: (state) => {
    //     state.showParent.data = null;
    //     state.showParent.loading = false;
    //     state.showParent.error = false;
    // },
  },
  extraReducers: {
    [getAllStudentInstallments.pending]: (state) => {
      state.loading = true
    },
    [getAllStudentInstallments.fulfilled]: (state, action) => {
      state.loading = false
      state.error = false
      state.StudentInstallments = action.payload
      state.StudentInstallmentsLinks = action.payload.links
      state.StudentInstallmentsLinks.first = action.payload.links.first
      state.StudentInstallmentsLinks.last = action.payload.links.last
      state.StudentInstallmentsLinks.prev = action.payload.links.prev
      state.StudentInstallmentsLinks.next = action.payload.links.next
      state.currentPage = action.payload.meta.current_page
    },
    [getAllStudentInstallments.rejected]: (state) => {
      state.loading = false
      state.error = true
    },
    [getAllInstallmentsData.fulfilled]: (state, action) => {
      state.loading = false
      state.InstallmentsData = action.payload
      state.error = false
    },
    // [parentSelectMenu.fulfilled]: (state, action) => {
    //     state.ParentMenu = action.payload;
    // },
    // [parentSelectMenu.pending]: (state) => {
    //     state.ParentMenu = [];
    // },
    // [getAllStudentInstallments.rejected]: (state) => {
    //     state.error = true;
    // },
    // [ShowParent.pending]: (state) => {
    //     state.loading = true;
    // },
    // [ShowParent.fulfilled]: (state, action) => {
    //     state.loading = false;
    //     state.error = false;
    //     state.showParent = action.payload;
    // },
    // [ShowParent.rejected]: (state) => {
    //     state.error = true;
    // }
  },
})
// export const { setCurrentPage, resetShowParent } = Installments.actions;
export const { setCurrentPage } = InstallmentsSlice.actions
export default InstallmentsSlice.reducer
