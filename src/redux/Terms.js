import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../axiosInstance'
export const TermsData = createAsyncThunk('Terms/TermsData', async () => {
  const apiUrl = `/terms`
  try {
    const res = await defaultAPI.get(apiUrl)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
})
export const addTerm = createAsyncThunk(
  'Terms/addTerm',
  async (formData, { rejectWithValue, getState }) => {
    try {
      const apiUrl = '/terms'
      const response = await defaultAPI.post(apiUrl, formData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data) // Handle errors and return the error data
    }
  },
)
export const editTerm = createAsyncThunk('Terms/editTerm', async (info) => {
  const { formData, id } = info
  try {
    const apiUrl = `/terms/${id}`

    const response = await defaultAPI.put(apiUrl, formData)

    return response.data
  } catch (error) {}
})
export const deleteTerm = createAsyncThunk(
  'Terms/deletePlane',
  async (ID, { rejectWithValue }) => {
    try {
      const apiUrl = `/terms/${ID}`

      const { data } = await defaultAPI.delete(apiUrl)
      return data
    } catch (error) {
      return rejectWithValue(error.response.data) // Handle errors and return the error data
    }
  },
)
export const termActivation = createAsyncThunk(
  'Terms/termActivation',
  async (ID, { rejectWithValue }) => {
    try {
      const apiUrl = `terms/${ID}/make_active`

      const { data } = await defaultAPI.patch(apiUrl)
      return data
    } catch (error) {
      return rejectWithValue(error.response.data) // Handle errors and return the error data
    }
  },
)
// export const fetchStudyPlaneDataByPage = (info) => async (dispatch) => {
//     const { state, pageSize } = info
//     try {
//         dispatch(studyPlaneData.pending());
//         const response = await defaultAPI.get(`${state}&per_page=${pageSize}`);
//         const data = response.data;

//         dispatch(studyPlaneData.fulfilled(data));
//         dispatch(setCurrentPage(state));
//     } catch (error) {
//         dispatch(studyPlaneData.rejected());
//     }
// };
const TermsSlice = createSlice({
  name: 'Terms',
  initialState: {
    getTermsData: [],
    message: '',
    // termsLinks: {
    //     first: "",
    //     last: "",
    //     next: "",
    //     prev: ""
    // },
    //currentPage: null,
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [TermsData.pending]: (state) => {
      state.loading = true
    },
    [TermsData.fulfilled]: (state, action) => {
      state.loading = false
      state.error = false
      state.getTermsData = action.payload
      // state.termsLinks = action.payload.links;
      // state.termsLinks.first = action.payload.links.first;
      // state.termsLinks.last = action.payload.links.last;
      // state.termsLinks.prev = action.payload.links.prev;
      // state.termsLinks.next = action.payload.links.next;
      // state.currentPage = action.payload.meta.current_page;
    },
    [TermsData.rejected]: (state) => {
      state.error = true
    },
  },
})
// export const { setCurrentPage } = studyPlaneSlice.actions;
export default TermsSlice.reducer
