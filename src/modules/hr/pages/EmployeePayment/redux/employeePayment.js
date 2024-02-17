import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import defaultAPI from "../../../../../axiosInstance";

export const getEmployeePayment = createAsyncThunk(
  "employeePayment/get",
  async ({
    pageSize = 10,
    handle,
    from,
    working_shift_id,
    employee_id,
    to,
    job_id,
  }) => {
    let apiUrl = `/admin/employees_payments?per_page=${pageSize}`;
    const res = await defaultAPI.get(apiUrl, {
      params: {
        handle,
        from,
        to,
        employee_id,
        job_id,
        working_shift_id,
      },
    });
    return res.data;
  }
);
export const oneEmployeePayment = createAsyncThunk(
  "employeePayment/getOne",
  async (id) => {
    let apiUrl = `/admin/employees_payments/${id}`;
    const res = await defaultAPI.get(apiUrl);
    return res.data;
  }
);
export const editEmployeePayment = createAsyncThunk(
  "employeePayment/edit",
  async ({ values, id }) => {
    let apiUrl = `/admin/employees_payments/${id}`;
    const res = await defaultAPI.put(apiUrl, values);
    return res.data;
  }
);
export const removeEmployeePayment = createAsyncThunk(
  "employeePayment/remove",
  async (id) => {
    let apiUrl = `/admin/employees_payments/${id}`;
    const res = await defaultAPI.delete(apiUrl);
    return res.data;
  }
);
export const addEmployeePayment = createAsyncThunk(
  "employeePayment/add",
  async (values) => {
    let apiUrl = `/admin/employees_payments`;
    const res = await defaultAPI.post(apiUrl, values);
    return res.data;
  }
);

export const fetchEmployeePaymentDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info;
  try {
    dispatch(getEmployeePayment.pending());
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`);
    const data = response.data;

    dispatch(getEmployeePayment.fulfilled(data));
    dispatch(setCurrentPage(state));
  } catch (error) {
    dispatch(getEmployeePayment.rejected());
  }
};

const employeePaymentSlice = createSlice({
  name: "employeePayment",
  initialState: {
    employeePayment: [],
    budget: null,
    error: null,
    currentPage: 1,
    pageSize: 10,
    total: 0,
    search: null,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeePayment.fulfilled, (state, action) => {
        state.employeePayment = action.payload.data;
        state.links = action.payload.links;
        state.currentPage = action.payload.meta.current_page;
      })
      .addCase(oneEmployeePayment.fulfilled, (state, action) => {
        state.OneEmployeePayment = action.payload.data;
      });
  },
});

export const { setCurrentPage } = employeePaymentSlice.actions;

export default employeePaymentSlice.reducer;
