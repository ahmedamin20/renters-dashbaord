import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import defaultAPI from "../../../axiosInstance.js";

export const getEmployeePenaltiesData = createAsyncThunk(
  "employeePenalties/get",
  async ({ pageSize }) => {
    let apiUrl = `/admin/employee_penalties?per_page=${pageSize}`;
      const res = await defaultAPI.get(apiUrl);
      return res.data;
  }
);

export const addEmployeePenalties = createAsyncThunk(
  "employeePenalties/add",
  async (values) => {
    let apiUrl = `/admin/employee_penalties`;
      const res = await defaultAPI.post(apiUrl, values);
      return res.data;
  }
);
export const fetchEmployeePenaltiesDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info;
  try {
    dispatch(getEmployeePenaltiesData.pending());
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`);
    const data = response.data;

    dispatch(getEmployeePenaltiesData.fulfilled(data));
    dispatch(setCurrentPage(state));
  } catch (error) {
    dispatch(getEmployeePenaltiesData.rejected());
  }
};
export const searchEmployeePenalties = createAsyncThunk(
  "employeePenalties/search",
  async (info) => {
    const apiUrl = `/admin/employee_penalties?handle=${info.handle}&&per_page=${info.pageSize}`;
    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
export const deleteEmployeePenalties = createAsyncThunk(
  "employeePenalties/delete",
  async (id) => {
    const apiUrl = `/admin/employee_penalties/${id}`;
    const res = await defaultAPI.delete(apiUrl);
    return res.data;
  }
);

export const editEmployeePenalties = createAsyncThunk(
  "employeeAllowances/edit",
  async ({ id, values }) => {
    const apiUrl = `admin/employee_penalties/${id}`;
    const res = await defaultAPI.put(apiUrl, values);
    return res.data;
  }
);

const employeePenaltiesSlice = createSlice({
  name: "employeePenalties",
  initialState: {
    employeePenalties: [],
    onePenaltyData: [],
    employeePenaltiesLinks: {
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
      .addCase(getEmployeePenaltiesData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEmployeePenaltiesData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.employeePenalties = action.payload;
        state.employeePenaltiesLinks = action.payload.links;
        state.employeePenaltiesLinks.first = action.payload.links.first;
        state.employeePenaltiesLinks.last = action.payload.links.last;
        state.employeePenaltiesLinks.prev = action.payload.links.prev;
        state.employeePenaltiesLinks.next = action.payload.links.next;
        state.currentPage = action.payload.meta.current_page;
      })
      .addCase(searchEmployeePenalties.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.employeePenalties = action.payload;
        state.employeePenaltiesLinks = action.payload.links;
        state.employeePenaltiesLinks.first = action.payload.links.first;
        state.employeePenaltiesLinks.last = action.payload.links.last;
        state.employeePenaltiesLinks.prev = action.payload.links.prev;
        state.employeePenaltiesLinks.next = action.payload.links.next;
        state.currentPage = action.payload.meta.current_page;
      })
      .addCase(getEmployeePenaltiesData.rejected, (state) => {
        state.error = true;
      })
      .addCase(deleteEmployeePenalties.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEmployeePenalties.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(deleteEmployeePenalties.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});
export const { setCurrentPage } = employeePenaltiesSlice.actions;

export default employeePenaltiesSlice.reducer;
