import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../../../axiosInstance.js'

export const getColors = createAsyncThunk('colors/get', async (info) => {
  const { pageSize } = info
  const apiUrl = `/admin/colors?per_page=${pageSize}`

  try {
    const res = await defaultAPI.get(apiUrl)
    return res.data
  } catch (error) {
    throw error
  }
})
export const addColors = createAsyncThunk('colors/add', async (values) => {
  const apiUrl = `/admin/colors`

  try {
    const res = await defaultAPI.post(apiUrl, values)
    return res.data
  } catch (error) {
    throw error
  }
})
export const getColorsSearch = createAsyncThunk(
  'colors/search',
  async (info) => {
    const { pageSize, handle } = info
    const apiUrl = `/admin/colors?handle=${handle}&per_page=${pageSize}`

    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)
export const deletecolor = createAsyncThunk(
  'colors/delete',
  async (ID, { rejectWithValue, getState }) => {
    try {
      const apiUrl = `/admin/colors/${ID}`
      const { data } = await defaultAPI.delete(apiUrl)
      return data
    } catch (error) {
      return rejectWithValue(error.response.data) // Handle errors and return the error data
    }
  },
)

export const getColorsDataByPage = (info) => async (dispatch) => {
  try {
    dispatch(getColors.pending())
    const response = await defaultAPI.get(
      `${info.state}&per_page=${info.pageSize}`,
    )
    const data = response.data

    dispatch(getColors.fulfilled(data))
    dispatch(setCurrentPage(info.state))
  } catch (error) {
    dispatch(getColors.rejected())
  }
}
// export const EditClassName = createAsyncThunk(
//   "school/classes/edit",
//   async (info) => {
//     const { id, name } = info;
//     const apiUrl = `/classes/${id}`;

//     try {
//       const res = await defaultAPI.put(apiUrl, { name });
//       return res.data;
//     } catch (error) {
//     }
//   }
// );

const colorsSlice = createSlice({
  name: 'colors',
  initialState: {
    colors: [],
    search: [],
    colorsLinks: {
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
  },
  extraReducers: {
    [getColors.pending]: (state) => {
      state.loading = true
    },
    [getColors.fulfilled]: (state, action) => {
      state.loading = false
      state.error = false
      state.colors = action.payload
      state.colorsLinks = action.payload.links
      state.colorsLinks.first = action.payload.links.first
      state.colorsLinks.last = action.payload.links.last
      state.colorsLinks.prev = action.payload.links.prev
      state.colorsLinks.next = action.payload.links.next
      state.currentPage = action.payload.meta.current_page
    },
    [getColors.rejected]: (state) => {
      state.error = true
    },
    [getColorsSearch.fulfilled]: (state, action) => {
      state.colors = action.payload
    },
    // [EditClassName.pending]: (state) => {
    //   state.loading = true;
    // },
    // [EditClassName.fulfilled]: (state) => {
    //   state.loading = false;
    //   state.error = false;
    // },
    // [EditClassName.rejected]: (state) => {
    //   state.error = true;
    // },
  },
})
export const { setCurrentPage } = colorsSlice.actions

export default colorsSlice.reducer
