import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import defaultAPI from "../../../axiosInstance.js";

export const getVisitorsCars = createAsyncThunk(
  "visitorsCars/get",
  async (info) => {
    // const {brand_id,color_id,visitor_id,pageSize} = info
    let apiUrl = `/api/admin/visitors_cars?brand_id=${
      info.brand_id || ""
    }&color_id=${info.color_id || ""}&visitor_id=${
      info.visitor_id || ""
    }&per_page=${info.pageSize}&handle=${info.handle}`;
      const res = await defaultAPI.get(apiUrl);
      return res.data;
  }
);
export const searchVistorsCars = createAsyncThunk(
  "VistorsCars/search",
  async (info) => {
    let apiUrl = `/api/admin/visitors_cars?per_page=${info.pageSize}&handle=${info.handle}`;
    const res = await defaultAPI.get(apiUrl);
    return res.data;
  }
);
export const OneVisitorCar = createAsyncThunk(
  "visitorsCars/getOne",
  async (id) => {
    let apiUrl = `/api/admin/visitors_cars/${id}`;
    try {
      const res = await defaultAPI.get(apiUrl);
      // console.log(res.data.data)
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const fetchVisitorsCarsDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info;
  try {
    dispatch(getVisitorsCars.pending());
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`);
    const data = response.data;

    dispatch(getVisitorsCars.fulfilled(data));
    dispatch(setCurrentPage(state));
  } catch (error) {
    dispatch(getVisitorsCars.rejected());
  }
};
export const deleteVisitorCar = createAsyncThunk(
  "visitorsCars/delete",
  async (id) => {
    const apiUrl = `/api/admin/visitors_cars/${id}`;
    try {
      const res = await defaultAPI.delete(apiUrl);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const addVisitorCar = createAsyncThunk(
  "visitorsCars/add",
  async (values) => {
    const apiUrl = `/api/admin/visitors_cars`;
    try {
      const res = await defaultAPI.post(apiUrl, values);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const editVisitorCars = createAsyncThunk(
  "visitorsCars/edit",
  async (info) => {
    console.log(info.values);
    const apiUrl = `/api/admin/visitors_cars/${info.id}`;
    try {
      const res = await defaultAPI.put(apiUrl, info.values);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

const visitorsCarsSlice = createSlice({
  name: "visitorsCars",
  initialState: {
    VisitorsCarsData: [],
    OneVisitorCarData: [],
    VisitorsCarsLinks: {
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
      .addCase(getVisitorsCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVisitorsCars.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.VisitorsCarsData = action.payload;
        state.VisitorsCarsLinks = action.payload.links;
        state.VisitorsCarsLinks.first = action.payload.links.first;
        state.VisitorsCarsLinks.last = action.payload.links.last;
        state.VisitorsCarsLinks.prev = action.payload.links.prev;
        state.VisitorsCarsLinks.next = action.payload.links.next;
        state.currentPage = action.payload.meta.current_page;
      }).addCase(searchVistorsCars.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.VisitorsCarsData = action.payload;
        state.VisitorsCarsLinks = action.payload.links;
        state.VisitorsCarsLinks.first = action.payload.links.first;
        state.VisitorsCarsLinks.last = action.payload.links.last;
        state.VisitorsCarsLinks.prev = action.payload.links.prev;
        state.VisitorsCarsLinks.next = action.payload.links.next;
        state.currentPage = action.payload.meta.current_page;
      })
      .addCase(getVisitorsCars.rejected, (state) => {
        state.error = true;
      })
      .addCase(deleteVisitorCar.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteVisitorCar.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(deleteVisitorCar.rejected, (state) => {
        state.error = true;
      })
      .addCase(OneVisitorCar.pending, (state) => {
        state.loading = true;
      })
      .addCase(OneVisitorCar.fulfilled, (state, action) => {
        state.loading = false;
        state.OneVisitorCarData = action.payload;
        state.error = false;

        console.log(state.OneVisitorCarData);
      })
      .addCase(OneVisitorCar.rejected, (state) => {
        state.error = true;
      });
  },
});
export const { setCurrentPage } = visitorsCarsSlice.actions;

export default visitorsCarsSlice.reducer;
