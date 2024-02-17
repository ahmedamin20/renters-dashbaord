import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import defaultAPI from "../../../axiosInstance.js";

export const getExpenses = createAsyncThunk("expenses/get", async (info) => {
  let apiUrl = `/admin/expenses?per_page=${info.pageSize}&handle=${info.handle}`;
  try {
    const res = await defaultAPI.get(apiUrl);
    return res.data;
  } catch (error) {
    throw error;
  }
});
export const getSearchExpenses = createAsyncThunk(
  "expenses/Search",
  async (info) => {
    const apiUrl = `/admin/expenses?handle=${info.handle}`;
    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const OneExpenses = createAsyncThunk("expenses/getOne", async (id) => {
  let apiUrl = `/admin/expenses/${id}`;
  try {
    const res = await defaultAPI.get(apiUrl);
    // console.log(res.data.data)
    return res.data;
  } catch (error) {
    throw error;
  }
});
export const fetchExpensesDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info;
  try {
    dispatch(getExpenses.pending());
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`);
    const data = response.data;

    dispatch(getExpenses.fulfilled(data));
    dispatch(setCurrentPage(state));
  } catch (error) {
    dispatch(getExpenses.rejected());
  }
};
export const deleteExpenses = createAsyncThunk(
  "expenses/delete",
  async (id) => {
    const apiUrl = `/admin/expenses/${id}`;
    try {
      const res = await defaultAPI.delete(apiUrl);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const addExpenses = createAsyncThunk("expenses/add", async (values) => {
  const apiUrl = `/admin/expenses`;
  try {
    console.log
    const res = await defaultAPI.post(apiUrl, values);
    return res.data;
  } catch (error) {
    throw error;
  }
});
export const editExpenses = createAsyncThunk("expenses/edit", async ({id,values}) => {
  const apiUrl = `/admin/expenses/${id}`;
  try {
    const res = await defaultAPI.put(apiUrl, values);
    return res.data;
  } catch (error) {
    throw error;
  }
});

const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expensesData: [],
    OneExpensesData: [],
    expensesLinks: {
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
      .addCase(getExpenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.expensesData = action.payload;
        state.expensesLinks = action.payload.links;
        state.expensesLinks.first = action.payload.links.first;
        state.expensesLinks.last = action.payload.links.last;
        state.expensesLinks.prev = action.payload.links.prev;
        state.expensesLinks.next = action.payload.links.next;
        state.currentPage = action.payload.meta.current_page;
      })
      .addCase(getSearchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.expensesData = action.payload;
        state.expensesLinks = action.payload.links;
        state.expensesLinks.first = action.payload.links.first;
        state.expensesLinks.last = action.payload.links.last;
        state.expensesLinks.prev = action.payload.links.prev;
        state.expensesLinks.next = action.payload.links.next;
        state.currentPage = action.payload.meta.current_page;
      })
      .addCase(getExpenses.rejected, (state) => {
        state.error = true;
      })
      .addCase(deleteExpenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteExpenses.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(deleteExpenses.rejected, (state) => {
        state.error = true;
      })

      .addCase(OneExpenses.fulfilled, (state, action) => {
        state.OneExpensesData = action.payload;
        state.error = false;
      })
      .addCase(OneExpenses.rejected, (state) => {
        state.error = true;
      });
  },
});
export const { setCurrentPage } = expensesSlice.actions;

export default expensesSlice.reducer;
