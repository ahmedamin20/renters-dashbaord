import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import defaultAPI from "../../../axiosInstance.js";

export const getContractData = createAsyncThunk(
  "Contract/get",
  async (info) => {
    const { id } = info;
    const apiUrl = `/admin/employees/${id}/contract`;
    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const AddContract = createAsyncThunk(
  "Contract/add",
  async ({ values, id }) => {
    const apiUrl = `/admin/employees/${id}/contract`;
    const res = await defaultAPI.post(apiUrl, values);
    return res.data;
  }
);

export const editContract = createAsyncThunk(
  "Contract/edit",
  async ({ id, values }) => {
    const apiUrl = `/admin/employees/${id}/contract`;
    const response = await defaultAPI.put(apiUrl, values);
    return response;
  }
);

const Contractslice = createSlice({
  name: "Contract",
  initialState: {
    ContractData: [],
    ContractLinks: {
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
    resetContractData: (state) => {
      state.ContractData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContractData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getContractData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.ContractData = action.payload.data;
        state.currentPage = null; // Since there's no pagination info, set it to null
      })
      .addCase(getContractData.rejected, (state) => {
        state.error = true;
      })
      .addCase(AddContract.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.ContractData = action.payload.data;
        console.log(state.ContractData);
        state.currentPage = null;
      })
      .addCase(AddContract.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        console.error("Error adding contract:", action.error.message);
      });
  },
});
export const { setCurrentPage, resetContractData } = Contractslice.actions;
export default Contractslice.reducer;
