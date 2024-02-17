import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import defaultAPI from "../../../axiosInstance.js";

export const getApplicantsData = createAsyncThunk(
  "Applicantss/get",
  async ({ pageSize }) => {
    const apiUrl = `/admin/applicants?per_page=${pageSize}`;
    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
export const searchApplicants = createAsyncThunk(
  "Applicantss/search",
  async (info) => {
    let apiUrl = `/admin/applicants?per_page=${info.pageSize}&handle=${info.handle}`;
    const res = await defaultAPI.get(apiUrl);
    return res.data;
  }
);
export const fetchApplicantsDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info;
  try {
    dispatch(getApplicantsData.pending());
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`);
    const data = response.data;
    dispatch(getApplicantsData.fulfilled(data));
    dispatch(setCurrentPage(state));
  } catch (error) {
    dispatch(getApplicantsData.rejected());
  }
};

export const AddApplicants = createAsyncThunk(
  "Applicantss/add",
  async (values, { rejectWithValue, getState }) => {
    try {
      const apiUrl = "/admin/applicants";
      const res = await defaultAPI.post(apiUrl, values);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors and return the error data
    }
  }
);

export const editApplicants = createAsyncThunk(
  "Applicantss/edit",
  async (props) => {
    try {
      const apiUrl = `/admin/applicants/${props.id}`;
      const response = await defaultAPI.patch(apiUrl, props.values);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const deleteApplicants = createAsyncThunk(
  "Applicantss/delete",
  async (id, { rejectWithValue, getState }) => {
    try {
      const apiUrl = `/admin/applicants/${id}`;
      const { data } = await defaultAPI.delete(apiUrl);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors and return the error data
    }
  }
);
export const changeToggles = createAsyncThunk(
  "Applicantss/changeToggles",
  async ({ id, status }) => {
    const apiUrl = `/admin/applicants/${id}?status=${status}`;
    return defaultAPI.patch(apiUrl);
  }
);
const ApplicantsSlice = createSlice({
  name: "Applicants",
  initialState: {
    ApplicantsData: [],
    ApplicantsLinks: {
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
      .addCase(getApplicantsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getApplicantsData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.ApplicantsData = action.payload;
        state.ApplicantsLinks = action.payload.links;
        state.ApplicantsLinks.first = action.payload.links.first;
        state.ApplicantsLinks.last = action.payload.links.last;
        state.ApplicantsLinks.prev = action.payload.links.prev;
        state.ApplicantsLinks.next = action.payload.links.next;
        state.currentPage = action.payload.meta.current_page;
      })
      .addCase(searchApplicants.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.ApplicantsData = action.payload;
        state.ApplicantsLinks = action.payload.links;
        state.ApplicantsLinks.first = action.payload.links.first;
        state.ApplicantsLinks.last = action.payload.links.last;
        state.ApplicantsLinks.prev = action.payload.links.prev;
        state.ApplicantsLinks.next = action.payload.links.next;
        state.currentPage = action.payload.meta.current_page;
      })

      .addCase(getApplicantsData.rejected, (state) => {
        state.error = true;
      });
  },
});
export const { setCurrentPage } = ApplicantsSlice.actions;
export default ApplicantsSlice.reducer;
