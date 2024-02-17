import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../axiosInstance'

export const getExamSchedule = createAsyncThunk(
  'ExamSchedule/getExamSchedule',
  async (props) => {
    const apiUrl = `/exam_schedules?grade_id=${props.gradeId}&exam_type=${props.typeId}`

    if (props.gradeId) {
      try {
        const res = await defaultAPI.get(apiUrl)
        return res.data
      } catch (error) {
        throw error
      }
    } else {
      throw Error
    }
  },
)
export const SearchExamSchedule = createAsyncThunk(
  'ExamSchedule/SearchExamSchedule',
  async (props) => {
    const apiUrl = `/exam_schedules?handle=${props.handle}&grade_id=${props.gradeId}&exam_type=${props.typeId}`

    if (props.gradeId && props.typeId) {
      try {
        const res = await defaultAPI.get(apiUrl)
        return res.data
      } catch (error) {
        throw error
      }
    }
  },
)
// export const getOneGradeExpenses = createAsyncThunk(
//   "gradeExpenses/getOneGradeExpenses",
//   async (info) => {
//     const { pageSize,id } = info;
//     const apiUrl = `/grades/${id}/grade_expenses?per_page=${pageSize}`;

//     try {
//       const res = await defaultAPI.get(apiUrl);
//       return res.data;
//     } catch (error) {
//       throw error;
//     }
//   }
// );
export const DeleteSchedule = createAsyncThunk(
  'ExamSchedule/DeleteExamSchedule',
  async (ID, { rejectWithValue }) => {
    try {
      const apiUrl = `/exam_schedules/${ID}`
      const { data } = await defaultAPI.delete(apiUrl)
      return data
    } catch (error) {
      return rejectWithValue(error.response.data) // Handle errors and return the error data
    }
  },
)
export const getExamScheduleByPage = (info) => async (dispatch) => {
  let { state, pageSize } = info
  try {
    dispatch(getExamSchedule.pending())
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`)
    const data = response.data

    dispatch(getExamSchedule.fulfilled(data))
    dispatch(setCurrentPage(state))
  } catch (error) {
    dispatch(getExamSchedule.rejected())
  }
}

export const addExamSchedule = createAsyncThunk(
  'ExamSchedule/addExamSchedule',
  async (values, { rejectWithValue }) => {
    try {
      const apiUrl = '/exam_schedules'
      const res = await defaultAPI.post(apiUrl, values)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data) // Handle errors and return the error data
    }
  },
)
export const EditSchedule = createAsyncThunk(
  'ExamSchedule/editExamSchedule',
  async (values, { rejectWithValue }) => {
    try {
      const apiUrl = `/exam_schedules/${values.id}`
      const res = await defaultAPI.put(apiUrl, values)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data) // Handle errors and return the error data
    }
  },
)

// export const EditOneGradeExpenses = createAsyncThunk(
//     "gradeExpenses/EditOneGradeExpenses",
//     async ({ values, info }, { rejectWithValue }) => { // Combine values and info into a single object
//         try {
//             const apiUrl = `/grade_expenses/${info.id}`;
//             const res = await defaultAPI.put(apiUrl, values);
//             return res;
//         } catch (error) {
//             return rejectWithValue(error.response); // Handle errors and return the error data
//         }
//     }
// );
// export const EditOneGradeExpenses = createAsyncThunk(
//     "gradeExpenses/EditOneGradeExpenses",
//     async (info) => {
//         const {id,value}=info
//         try {
//             const apiUrl = `/grade_expenses/${id}`;
//             const response = await defaultAPI.put(apiUrl, value);
//             return response.data;
//         } catch (error) {
//             return error
//         }
//     }
// );

const ExamSchedule = createSlice({
  name: 'ExamSchedule',
  initialState: {
    ExamScheduleData: [],
    selectMenuExpenses: [],
    ExamScheduleLinks: {
      first: null,
      last: null,
      next: null,
      prev: null,
    },
    currentPage: null,
    loading: false,
    error: false,
    Loading: false,
    Error: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload.meta.current_page
    },
  },
  extraReducers: {
    [getExamSchedule.pending]: (state) => {
      state.Loading = true
    },
    [getExamSchedule.fulfilled]: (state, action) => {
      state.Loading = false
      state.Error = false
      state.ExamScheduleData = action.payload
      state.ExamScheduleLinks = action.payload.links
      state.ExamScheduleLinks.first = action.payload.links.first
      state.ExamScheduleLinks.last = action.payload.links.last
      state.ExamScheduleLinks.prev = action.payload.links.prev
      state.ExamScheduleLinks.next = action.payload.links.next
      state.currentPage = action.payload.meta.current_page
    },
    [SearchExamSchedule.fulfilled]: (state, action) => {
      state.Loading = false
      state.Error = false

      if (action.payload && action.payload.links) {
        state.ExamScheduleData = action.payload
        state.ExamScheduleLinks = action.payload.links
        state.ExamScheduleLinks.first = action.payload.links.first
        state.ExamScheduleLinks.last = action.payload.links.last
        state.ExamScheduleLinks.prev = action.payload.links.prev
        state.ExamScheduleLinks.next = action.payload.links.next
        state.currentPage = action.payload.meta.current_page
      }
    },
    // [getExamSchedule.rejected]: (state) => {
    //   state.Error = true;
    // },
    // [selectExpenses.fulfilled]: (state, action) => {
    //   state.selectMenuExpenses = action.payload;
    // }
  },
})
export const { setCurrentPage } = ExamSchedule.actions

export default ExamSchedule.reducer
