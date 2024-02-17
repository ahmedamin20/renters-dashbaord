import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import defaultAPI from "../../../axiosInstance.js";

export const getEmployeeAllowancesData = createAsyncThunk(
  "employeeAllowances/get",
  async ({ pageSize }) => {
    let apiUrl = `/admin/employee_allowances?per_page=${pageSize}`;
    const res = await defaultAPI.get(apiUrl);
    return res.data;
  }
);
export const getOneVisit = createAsyncThunk(
  "visits/getOne",
  async ({ visitId, id }) => {
    let apiUrl = `/garages/${id}/visits/${visitId}`;
    const res = await defaultAPI.get(apiUrl);
    return res.data;
  }
);
export const addEmployeeAllowances = createAsyncThunk(
  "employeeAllowances/add",
  async (values) => {
    let apiUrl = `/admin/employee_allowances`;
    const res = await defaultAPI.post(apiUrl, values);
    return res.data;
  }
);
export const fetchEmployeeAllowancesDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info;
  try {
    dispatch(getEmployeeAllowancesData.pending());
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`);
    const data = response.data;

    dispatch(getEmployeeAllowancesData.fulfilled(data));
    dispatch(setCurrentPage(state));
  } catch (error) {
    dispatch(getEmployeeAllowancesData.rejected());
  }
};
export const searchEmployeeAllowances = createAsyncThunk(
  "employeeAllowances/search",
  async (info) => {
    const apiUrl = `/admin/employee_allowances?handle=${info.handle}&&per_page=${info.pageSize}`;
    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
export const deleteEmployeeAllowances = createAsyncThunk(
  "employeeAllowances/delete",
  async (id) => {
    const apiUrl = `/admin/employee_allowances/${id}`;
    const res = await defaultAPI.delete(apiUrl);
    return res.data;
  }
);

export const editEmployeeAllowances = createAsyncThunk(
  "employeeAllowances/edit",
  async ({ id, values }) => {
    const apiUrl = `admin/employee_allowances/${id}`;
    const res = await defaultAPI.put(apiUrl, values);
    return res.data;
  }
);

const employeeAllowancesSlice = createSlice({
  name: "employeeAllowances",
  initialState: {
    getemployeeAllowancesData: [],
    onePenaltyData: [],
    employeeAllowancesLinks: {
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
      .addCase(getEmployeeAllowancesData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEmployeeAllowancesData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.getemployeeAllowancesData = action.payload;
        state.employeeAllowancesLinks = action.payload.links;
        state.employeeAllowancesLinks.first = action.payload.links.first;
        state.employeeAllowancesLinks.last = action.payload.links.last;
        state.employeeAllowancesLinks.prev = action.payload.links.prev;
        state.employeeAllowancesLinks.next = action.payload.links.next;
        state.currentPage = action.payload.meta.current_page;
      })
      .addCase(getEmployeeAllowancesData.rejected, (state) => {
        state.error = true;
      })
      .addCase(getOneVisit.fulfilled, (state, action) => {
        state.error = false;
        state.onePenaltyData = action.payload;
      })
      .addCase(getOneVisit.rejected, (state) => {
        state.error = true;
      })
      .addCase(deleteEmployeeAllowances.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEmployeeAllowances.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(deleteEmployeeAllowances.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(searchEmployeeAllowances.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.getemployeeAllowancesData = action.payload;
        state.employeeAllowancesLinks = action.payload.links;
        state.employeeAllowancesLinks.first = action.payload.links.first;
        state.employeeAllowancesLinks.last = action.payload.links.last;
        state.employeeAllowancesLinks.prev = action.payload.links.prev;
        state.employeeAllowancesLinks.next = action.payload.links.next;
        state.currentPage = action.payload.meta.current_page;
      });
  },
});
export const { setCurrentPage } = employeeAllowancesSlice.actions;

export default employeeAllowancesSlice.reducer;
