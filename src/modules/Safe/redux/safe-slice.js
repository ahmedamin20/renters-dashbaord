import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import defaultAPI from "../../../axiosInstance.js";

export const getSafe = createAsyncThunk(
  "safe/get",
  async ({ pageSize = 10 }) => {
    let apiUrl = `/safe?per_page=${pageSize}`;
    const res = await defaultAPI.get(apiUrl);
    return res.data;
  }
);
export const getInventories = createAsyncThunk(
  "safe/Inventories",
  async ({ pageSize, handle }) => {
    let apiUrl = `/safe/inventories?per_page=${pageSize}`;
    const res = await defaultAPI.get(apiUrl, { params: { handle } });
    return res.data;
  }
);
export const getBudget = createAsyncThunk("safe/getBudget", async () => {
  let apiUrl = `/budget`;
  const res = await defaultAPI.get(apiUrl);
  return res.data;
});

export const removeSafe = createAsyncThunk("safe/remove", async (id) => {
  let apiUrl = `/safe/${id}`;
  const res = await defaultAPI.delete(apiUrl);
  return res.data;
});
export const addSafe = createAsyncThunk("safe/add", async (values) => {
  let apiUrl = `/safe`;
  const res = await defaultAPI.post(apiUrl, values);
  return res.data;
});
export const addInventories = createAsyncThunk(
  "safe/addInventories",
  async (values) => {
    let apiUrl = `/safe/inventories`;
    const res = await defaultAPI.post(apiUrl, values);
    return res.data;
  }
);
export const editSafe = createAsyncThunk(
  "safe/edit",
  async ({ id, values }) => {
    let apiUrl = `/safe/${id}`;
    const res = await defaultAPI.put(apiUrl, values);
    return res.data;
  }
);
export const searchSafe = createAsyncThunk(
  "Safe/search",
  async ({ pageSize = 10, handle }) => {
    let apiUrl = `/safe?handle=${handle}&per_page=${pageSize}`;
    const res = await defaultAPI.get(apiUrl);
    return res.data;
  }
);
export const getOneSafe = createAsyncThunk("Safes/getOne", async (id) => {
  let apiUrl = `/safe/${id}`;
  const res = await defaultAPI.get(apiUrl);
  return res.data;
});

export const fetchInventoriesDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info;
  try {
    dispatch(getInventories.pending());
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`);
    const data = response.data;
    dispatch(getInventories.fulfilled(data));
    dispatch(setCurrentPage(state));
  } catch (error) {
    dispatch(getInventories.rejected());
  }
};
export const fetchSafeDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info;
  try {
    dispatch(getSafe.pending());
    const response = await defaultAPI.get(`${state}&per_page=${pageSize||10}`);
    const data = response.data;
    dispatch(getSafe.fulfilled(data));
    dispatch(setCurrentPage(state));
  } catch (error) {
    dispatch(getSafe.rejected());
  }
};

const safeSlice = createSlice({
  name: "safe",
  initialState: {
    safe: [],
    inventories: [],
    budget: null,
    error: null,
    currentPage: 1,
    pageSize: 10,
    total: 0,
    search: null,
    oneSafe: null,
    loading: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSafe.fulfilled, (state, action) => {
        state.safeData = action.payload;
        state.links = action.payload.links;
        state.currentPage = action.payload.meta.current_page;
      })
      .addCase(getInventories.fulfilled, (state, action) => {
        state.inventories = action.payload.data;
        state.links = action.payload.links;
        state.inventoriesMeta=action.payload.meta
        state.currentPage = action.payload.meta.current_page;
      })
      .addCase(getBudget.fulfilled, (state, action) => {
        state.budget = action.payload.data;
      })
      .addCase(addInventories.pending, (state) => {
        state.loading = true;
      })
      .addCase(addInventories.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addInventories.rejected, (state) => {
        state.loading = false;
      })
      .addCase(searchSafe.fulfilled, (state, action) => {
        state.safeData = action.payload;
        state.links = action.payload.links;
        state.currentPage = action.payload.meta.current_page;
      });
  },
});

export const { setCurrentPage } = safeSlice.actions;

export default safeSlice.reducer;
