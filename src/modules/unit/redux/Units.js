import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../../../axiosInstance.js'

export const getParentUnits = createAsyncThunk(
  'units/getParentUnits',
  async () => {
    const apiUrl = `/admin/units/parent_units`
    const res = await defaultAPI.get(apiUrl)
    return res.data
  },
)
export const getSubUnits = createAsyncThunk(
  'units/getSubUnits',
  async (info) => {
    const apiUrl = `/admin/units/parent_units/${info.id}/sub_units`
    const res = await defaultAPI.get(apiUrl)
    return res.data
  },
)
export const removeParentUnits = createAsyncThunk(
  'units/removeParentUnits',
  async (id) => {
    const apiUrl = `/admin/units/parent_units/${id}`
    const res = await defaultAPI.delete(apiUrl)
    return res.data
  },
)
export const getSearchSubUnits = createAsyncThunk(
  'units/getSearchSubUnits',
  async (info) => {
    const apiUrl = `/admin/units/parent_units/${info.id}/sub_units?handle=${info.handle}`
    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)

export const getSearchUnits = createAsyncThunk(
  'units/getSearchUnits',
  async (info) => {
    const apiUrl = `admin/units/parent_units?handle=${info.handle}`
    try {
      const res = await defaultAPI.get(apiUrl)
      return res.data
    } catch (error) {
      throw error
    }
  },
)

// export const activeCurrencies = createAsyncThunk(
//   "currencies/activeCurrencies",
//   async (ID, { rejectWithValue }) => {
//       try {
//           const apiUrl = `currencies/${ID}`;

//           const { data } = await defaultAPI.patch(apiUrl);
//           return data;
//       } catch (error) {
//           return rejectWithValue(error.response.data); // Handle errors and return the error data
//       }
//   }
// );
export const deleteSubUnit = createAsyncThunk(
  'units/deleteSubUnit',
  async (id) => {
    const apiUrl = `/admin/units/sub_units/${id}`

    try {
      const res = await defaultAPI.delete(apiUrl)
      return res.data
    } catch (error) {}
  },
)

const unitsSlice = createSlice({
  name: 'units',
  initialState: {
    unitsParentData: [],
    unitsSubData: [],
    unitsLinks: {
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
    [getParentUnits.pending]: (state) => {
      state.loading = true
    },
    [getParentUnits.fulfilled]: (state, action) => {
      state.loading = false
      state.error = false
      state.unitsParentData = action.payload
      // state.unitsLinks.first = action.payload.links.first;
      // state.unitsLinks.last = action.payload.links.last;
      // state.unitsLinks.prev = action.payload.links.prev;
      // state.unitsLinks.next = action.payload.links.next;
      // state.currentPage = action.payload.meta.current_page;
    },
    [getSubUnits.pending]: (state) => {
      state.loading = true
    },
    [getSubUnits.fulfilled]: (state, action) => {
      state.loading = false
      state.error = false
      state.unitsSubData = action.payload
    
    },
    [getSearchSubUnits.fulfilled]: (state, action) => {
      state.loading = false
      state.error = false
      state.unitsSubData = action.payload
    
    },
    [getSearchUnits.fulfilled]: (state, action) => {
      state.loading = false
      state.error = false
      state.unitsParentData = action.payload
      // state.unitsLinks.first = action.payload.links.first;
      // state.unitsLinks.last = action.payload.links.last;
      // state.unitsLinks.prev = action.payload.links.prev;
      // state.unitsLinks.next = action.payload.links.next;
      // state.currentPage = action.payload.meta.current_page;
    },
    [getParentUnits.rejected]: (state) => {
      state.loading = false
      state.error = true
    },
  },
})
export const { setCurrentPage } = unitsSlice.actions

export default unitsSlice.reducer
