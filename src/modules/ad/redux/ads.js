import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import defaultAPI from "../../../axiosInstance.js";

export const getAds = createAsyncThunk("ads/get", async (info) => {
  let apiUrl = `/admin/ads?per_page=${info.pageSize}`;
  const res = await defaultAPI.get(apiUrl);
  return res.data;
});
export const searchAds = createAsyncThunk("ads/search", async (info) => {
  let apiUrl = `/admin/ads?per_page=${info.pageSize}&handle=${info.handle}`;
  const res = await defaultAPI.get(apiUrl);
  return res.data;
});
export const addAds = createAsyncThunk("ads/add", async (values) => {
  let apiUrl = `/admin/ads`;
  const res = await defaultAPI.post(apiUrl, values);
  return res.data;
});
export const OneAds = createAsyncThunk("ads/getOne", async (id) => {
  let apiUrl = `/admin/ads/${id}`;
  const res = await defaultAPI.get(apiUrl);
  // console.log(res.data.data)
  return res.data;
});
export const fetchAdsDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info;

  dispatch(getAds.pending());
  const response = await defaultAPI.get(`${state}&per_page=${pageSize}`);
  const data = response.data;

  dispatch(getAds.fulfilled(data));
  dispatch(setCurrentPage(state));
};
export const deleteAds = createAsyncThunk("ads/delete", async (id) => {
  const apiUrl = `/admin/ads/${id}`;
  const res = await defaultAPI.delete(apiUrl);
  return res.data;
});
export const editAds = createAsyncThunk("ads/edit", async (info) => {
  const apiUrl = `/admin/ads/${info.id}`;
  const res = await defaultAPI.post(apiUrl, info.formData);
  return res.data;
});

const adsSlice = createSlice({
  name: "ads",
  initialState: {
    adsData: [],
    OneAdData: [],
    adsLinks: {
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
      .addCase(getAds.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAds.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.adsData = action.payload;
        console.log(action?.payload)
        
      })
      .addCase(searchAds.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.adsData = action.payload;
        state.adsLinks = action.payload.links;
        state.adsLinks.first = action.payload.links.first;
        state.adsLinks.last = action.payload.links.last;
        state.adsLinks.prev = action.payload.links.prev;
        state.adsLinks.next = action.payload.links.next;
        state.currentPage = action.payload.meta.current_page;
      })
      .addCase(getAds.rejected, (state) => {
        state.error = true;
      })
      .addCase(deleteAds.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAds.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(deleteAds.rejected, (state) => {
        state.error = true;
      })
      .addCase(OneAds.pending, (state) => {
        state.loading = true;
      })
      .addCase(OneAds.fulfilled, (state, action) => {
        state.loading = false;
        state.OneAdData = action.payload;
        state.error = false;
      })
      .addCase(OneAds.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});
export const { setCurrentPage } = adsSlice.actions;

export default adsSlice.reducer;
