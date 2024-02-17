import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import defaultAPI from "../axiosInstance";

const initialState = {
  data: [],
  meta: [],
  loading: true,
  error: false,
};

export const getEmployeeAccounting = createAsyncThunk(
  "employeeAccounting/getEmployeeAccounting",
  async ({ page = 0, from = "", to = "", employee_id = "" }) => {
    if (from === "") {
      from = "2000-01-01";
    }
    if (to === "") {
      to = "2100-01-01";
    }

    const res = await defaultAPI.get(`/admin/employees_accounting?
        per_page=${page}&from=${from}&to=${to}&employee_id=${
      employee_id || ""
    }`);
    return res.data;
  }
);
export const employeeAccountingSlice = createSlice({
  name: "employeeAccountingSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeAccounting.fulfilled, (state, action) => {
        console.log("employeeAccountingSlice", action.payload);
        console.log("state::", state);

        state.data = action.payload.data;
        state.meta = action.payload;
        state.loading = false;
      })
      .addCase(getEmployeeAccounting.rejected, (state, action) => {
        state.error = true;

        return action.payload;
      })
      .addCase(getEmployeeAccounting.pending, (state, action) => {
        console.log(action.payload);
      });
  },
});

export default employeeAccountingSlice.reducer;
