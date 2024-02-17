import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import defaultAPI from "../../../axiosInstance.js";

export const getEmployeesData = createAsyncThunk(
  "Employees/get",
  async (info) => {
    const { pageSize } = info;
    const apiUrl = `/admin/employees?per_page=${pageSize}`;
    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
export const searchEmployees = createAsyncThunk(
  "Employees/search",
  async (info) => {
    let apiUrl = `/admin/employees?per_page=${info.pageSize}&handle=${info.handle}`;
    const res = await defaultAPI.get(apiUrl);
    return res.data;
  }
);
export const getEmployeeInfo = createAsyncThunk(
  "Employees/getInfo",
  async ({ pageSize = "10", year = "", week = "" }) => {
    const apiUrl = `/admin/employees_details?year=${year}&week=${
      week || ""
    }&per_page=${pageSize}`;
    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
export const searchEmployeeInfo = createAsyncThunk(
  "Employees/searchEmpInfo",
  async ({ pageSize = "10", year = "", week = "", handle }) => {
    const apiUrl = `/admin/employees_details?year=${year}&week=${
      week || ""
    }&per_page=${pageSize}&handle=${handle}`;
    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const getOneEmployeesData = createAsyncThunk(
  "Employees/getOne",
  async (info) => {
    const apiUrl = `/admin/employees/${info.id}`;
    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const fetchEmployeesDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info;
  try {
    dispatch(getEmployeesData.pending());
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`);
    const data = response.data;
    dispatch(getEmployeesData.fulfilled(data));
    dispatch(setCurrentPage(state));
  } catch (error) {
    dispatch(getEmployeesData.rejected());
  }
};
export const fetchInfoEmployeesDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info;
  try {
    dispatch(getEmployeesData.pending());
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`);
    const data = response.data;
    dispatch(getEmployeesData.fulfilled(data));
    dispatch(setCurrentPage(state));
  } catch (error) {
    dispatch(getEmployeesData.rejected());
  }
};

export const AddEmployees = createAsyncThunk(
  "employees/add",
  async (values, { rejectWithValue }) => {
    try {
      const apiUrl = "/admin/employees";

      const res = await defaultAPI.post(apiUrl, values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors and return the error data
    }
  }
);

export const firedEmployees = createAsyncThunk(
  "employees/fire",
  async (props) => {
    try {
      const apiUrl = `/admin/employees/${props.id}/fire`;
      const response = await defaultAPI.post(apiUrl, props.values);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const editEmployees = createAsyncThunk(
  "employees/edit",
  async ({id, data}) => {
      const apiUrl = `/admin/employees/${id}`;
      const response = await defaultAPI.postForm(apiUrl, data
      );
      return response.data;
  
  }
);

export const deleteEmployees = createAsyncThunk(
  "employees/delete",
  async (id, { rejectWithValue }) => {
    try {
      const apiUrl = `/admin/employees/${id}`;
      const { data } = await defaultAPI.delete(apiUrl);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors and return the error data
    }
  }
);

const EmployeesSlice = createSlice({
  name: "Employees",
  initialState: {
    EmployeesData: [],
    employeesInfo: [],
    EmployeesDataOne: [],
    EmployeesLinks: {
      first: null,
      last: null,
      next: null,
      prev: null,
    },
    infoEmployeesLinks: {
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
      .addCase(getEmployeesData.pending, (state) => {
        state.loading = true;
      })
      .addCase(editEmployees.pending, (state, action) => {
        console.log(action);
      })
      .addCase(editEmployees.fulfilled, (state, action) => {
        console.log(action);
      })
      .addCase(editEmployees.rejected, (state, action) => {
        console.log(action);
      })
      .addCase(getEmployeesData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.EmployeesData = action.payload;
        state.EmployeesLinks = action.payload.links;
        state.EmployeesLinks.first = action.payload.links.first;
        state.EmployeesLinks.last = action.payload.links.last;
        state.EmployeesLinks.prev = action.payload.links.prev;
        state.EmployeesLinks.next = action.payload.links.next;
        state.currentPage = action.payload.meta.current_page;
      })
      .addCase(searchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.EmployeesData = action.payload;
        state.EmployeesLinks = action.payload.links;
        state.EmployeesLinks.first = action.payload.links.first;
        state.EmployeesLinks.last = action.payload.links.last;
        state.EmployeesLinks.prev = action.payload.links.prev;
        state.EmployeesLinks.next = action.payload.links.next;
        state.currentPage = action.payload.meta.current_page;
      })

      .addCase(getEmployeesData.rejected, (state) => {
        state.error = true;
      })
      .addCase(getEmployeeInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEmployeeInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.employeesInfo = action.payload;
        state.infoEmployeesLinks = action.payload.links;
        state.infoEmployeesLinks.first = action.payload.links.first;
        state.infoEmployeesLinks.last = action.payload.links.last;
        state.infoEmployeesLinks.prev = action.payload.links.prev;
        state.infoEmployeesLinks.next = action.payload.links.next;
        state.currentPage = action.payload.meta.current_page;
      })
      .addCase(searchEmployeeInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.employeesInfo = action.payload;
        state.infoEmployeesLinks = action.payload.links;
        state.infoEmployeesLinks.first = action.payload.links.first;
        state.infoEmployeesLinks.last = action.payload.links.last;
        state.infoEmployeesLinks.prev = action.payload.links.prev;
        state.infoEmployeesLinks.next = action.payload.links.next;
        state.currentPage = action.payload.meta.current_page;
      })

      .addCase(getEmployeeInfo.rejected, (state) => {
        state.error = true;
      })

      .addCase(getOneEmployeesData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneEmployeesData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.EmployeesDataOne = action.payload;
      })

      .addCase(getOneEmployeesData.rejected, (state) => {
        state.error = true;
      });
  },
});
export const { setCurrentPage } = EmployeesSlice.actions;
export default EmployeesSlice.reducer;
