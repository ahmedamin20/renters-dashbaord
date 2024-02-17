import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import defaultAPI from "../../../axiosInstance.js";

export const getDepartmentData = createAsyncThunk(
  "departments/get",
  async (info) => {
    const { pageSize } = info;
    const apiUrl = `/admin/departments?per_page=${pageSize}`;
    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
export const searchDepartmentData = createAsyncThunk(
  "departments/search",
  async (info) => {
    const { handle, pageSize } = info;
    const apiUrl = `/admin/departments?handle=${handle}&per_page=${
      pageSize || 10
    }`;
    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
export const fetchDepartmentDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info;
  try {
    dispatch(getDepartmentData.pending());
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`);
    const data = response.data;
    dispatch(getDepartmentData.fulfilled(data));
    dispatch(setCurrentPage(state));
  } catch (error) {
    dispatch(getDepartmentData.rejected());
  }
};

export const addDepartment = createAsyncThunk(
  "departments/add",
  async (values, { rejectWithValue, getState }) => {
    try {
      const apiUrl = "/admin/departments";
      const res = await defaultAPI.post(apiUrl, values);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors and return the error data
    }
  }
);

export const editDepartment = createAsyncThunk(
  "departments/edit",
  async (props) => {
    try {
      const apiUrl = `/admin/departments/${props.id}`;
      const response = await defaultAPI.put(apiUrl, props.values);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const deleteDepartment = createAsyncThunk(
  "departments/delete",
  async (id, { rejectWithValue, getState }) => {
    try {
      const apiUrl = `/admin/departments/${id}`;
      const { data } = await defaultAPI.delete(apiUrl);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors and return the error data
    }
  }
);

const DepartmentSlice = createSlice({
  name: "Department",
  initialState: {
    DepartmentData: [],
    DepartmentLinks: {
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
      state.currentPage = action.payload.meta.current_page;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDepartmentData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDepartmentData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.DepartmentData = action.payload;
        state.DepartmentLinks = action.payload.links;
        state.DepartmentLinks.first = action.payload.links.first;
        state.DepartmentLinks.last = action.payload.links.last;
        state.DepartmentLinks.prev = action.payload.links.prev;
        state.DepartmentLinks.next = action.payload.links.next;
        state.currentPage = action.payload.meta.current_page;
      })
      .addCase(searchDepartmentData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.DepartmentData = action.payload;
        state.DepartmentLinks = action.payload.links;
        state.DepartmentLinks.first = action.payload.links.first;
        state.DepartmentLinks.last = action.payload.links.last;
        state.DepartmentLinks.prev = action.payload.links.prev;
        state.DepartmentLinks.next = action.payload.links.next;
        state.currentPage = action.payload.meta.current_page;
      })

      .addCase(getDepartmentData.rejected, (state) => {
        state.error = true;
      });
  },
});
export const { setCurrentPage } = DepartmentSlice.actions;
export default DepartmentSlice.reducer;
