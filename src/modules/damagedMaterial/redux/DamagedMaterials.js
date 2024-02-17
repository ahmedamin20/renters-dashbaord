import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import defaultAPI from "../../../axiosInstance.js";

export const getDamagedMaterials = createAsyncThunk(
  "damagedMaterials/get",
  async ({ pageSize, dateFilter }) => {
    let apiUrl = `/api/admin/damaged_materials?date=${dateFilter}&per_page=${pageSize}`;
    const res = await defaultAPI.get(apiUrl);
    return res.data;
  }
);
export const OneDamagedMaterial = createAsyncThunk(
  "damagedMaterials/getOne",
  async (id) => {
    let apiUrl = `/api/admin/damaged_materials/${id}`;
    const res = await defaultAPI.get(apiUrl);
    return res.data;
  }
);
export const fetchDamagedMaterialsDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info;
  try {
    dispatch(getDamagedMaterials.pending());
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`);
    const data = response.data;

    dispatch(getDamagedMaterials.fulfilled(data));
    dispatch(setCurrentPage(state));
  } catch (error) {
    dispatch(getDamagedMaterials.rejected());
  }
};
export const searchDamagedMaterials = createAsyncThunk(
  "damagedMaterials/search",
  async (info) => {
    const apiUrl = `/api/admin/damaged_materials?handle=${info.handle}`;
    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const addDamagedMaterials = createAsyncThunk(
  "damagedMaterials/add",
  async (values) => {
    const apiUrl = `/api/admin/damaged_materials`;
    try {
      const res = await defaultAPI.post(apiUrl, values);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

const damagedMaterialsSlice = createSlice({
  name: "damagedMaterials",
  initialState: {
    damagedMaterialsData: [],
    OneDamagedMaterialData: [],
    damagedMaterialsLinks: {
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
      .addCase(getDamagedMaterials.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDamagedMaterials.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.damagedMaterialsData = action.payload;
        console.log(action.payload);
        state.damagedMaterialsLinks = action.payload.links;
        state.damagedMaterialsLinks.first = action.payload.links.first;
        state.damagedMaterialsLinks.last = action.payload.links.last;
        state.damagedMaterialsLinks.prev = action.payload.links.prev;
        state.damagedMaterialsLinks.next = action.payload.links.next;
        state.currentPage = action.payload.meta.current_page;
      })
      .addCase(getDamagedMaterials.rejected, (state) => {
        state.error = true;
      })
      .addCase(OneDamagedMaterial.pending, (state) => {
        state.loading = true;
      })
      .addCase(OneDamagedMaterial.fulfilled, (state, action) => {
        state.loading = false;
        state.OneDamagedMaterialData = action.payload;
        state.error = false;
      })
      .addCase(OneDamagedMaterial.rejected, (state) => {
        state.error = true;
      })
      .addCase(searchDamagedMaterials.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.damagedMaterialsData = action.payload;
        state.damagedMaterialsLinks = action.payload.links;
        state.damagedMaterialsLinks.first = action.payload.links.first;
        state.damagedMaterialsLinks.last = action.payload.links.last;
        state.damagedMaterialsLinks.prev = action.payload.links.prev;
        state.damagedMaterialsLinks.next = action.payload.links.next;
        state.currentPage = action.payload.meta.current_page;
      });
  },
});
export const { setCurrentPage } = damagedMaterialsSlice.actions;

export default damagedMaterialsSlice.reducer;
