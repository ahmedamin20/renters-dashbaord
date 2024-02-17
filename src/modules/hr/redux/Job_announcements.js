import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import defaultAPI from "../../../axiosInstance.js";

export const getJob_announcementsData = createAsyncThunk(
  "Job_announcements/get",
  async (info) => {
    const { pageSize } = info;
    const apiUrl = `/admin/job_announcements?per_page=${pageSize}`;
    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
export const searchJobAnnouncementData = createAsyncThunk("job_announcements/search", async (info) => {
  let apiUrl = `/admin/job_announcements?per_page=${info.pageSize}&handle=${info.handle}`;
  const res = await defaultAPI.get(apiUrl);
  return res.data;
});
export const getOneJob_announcementsData = createAsyncThunk(
  "Job_announcements/getOne",
  async (id) => {
    const apiUrl = `/admin/job_announcements/${id}`;
    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const fetchJob_announcementsDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info;
  try {
    dispatch(getJob_announcementsData.pending());
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`);
    const data = response.data;
    dispatch(getJob_announcementsData.fulfilled(data));
    dispatch(setCurrentPage(state));
  } catch (error) {
    dispatch(getJob_announcementsData.rejected());
  }
};
export const changeToggles = createAsyncThunk(
  "Job_announcements/changeToggles",
  async (Job_announcementsToUpdate) => {
    try {
      const responses = await Promise.all(
        Job_announcementsToUpdate.map(({ id, status }) => {
          const apiUrl = `/admin/job_announcements/${id}?status=${status}`;
          return defaultAPI.patch(apiUrl);
        })
      );

      // You might want to return something meaningful based on your API response
      return responses.map((response) => response.data);
    } catch (error) {
      return error;
    }
  }
);
export const AddJob_announcements = createAsyncThunk(
  "Job_announcements/add",
  async (values, { rejectWithValue, getState }) => {
    try {
      const apiUrl = "/admin/job_announcements";
      const res = await defaultAPI.post(apiUrl, values);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors and return the error data
    }
  }
);

export const editJob_announcements = createAsyncThunk(
  "Job_announcementss/edit",
  async (props) => {
    try {
      const apiUrl = `/admin/job_announcements/${props.id}`;
      const response = await defaultAPI.put(apiUrl, props.values);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const deleteJob_announcements = createAsyncThunk(
  "Job_announcementss/delete",
  async (id, { rejectWithValue, getState }) => {
    try {
      const apiUrl = `/admin/job_announcements/${id}`;
      const { data } = await defaultAPI.delete(apiUrl);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors and return the error data
    }
  }
);

const Job_announcementsSlice = createSlice({
  name: "Job_announcements",
  initialState: {
    Job_announcementsData: [],
    OneJobAnnouncementsData: [],
    Job_announcementsLinks: {
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
      .addCase(getJob_announcementsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getJob_announcementsData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.Job_announcementsData = action.payload;
        state.Job_announcementsLinks = action.payload.links;
        state.Job_announcementsLinks.first = action.payload.links.first;
        state.Job_announcementsLinks.last = action.payload.links.last;
        state.Job_announcementsLinks.prev = action.payload.links.prev;
        state.Job_announcementsLinks.next = action.payload.links.next;
        state.currentPage = action.payload.meta.current_page;
      })
      .addCase(searchJobAnnouncementData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.Job_announcementsData = action.payload;
        state.Job_announcementsLinks = action.payload.links;
        state.Job_announcementsLinks.first = action.payload.links.first;
        state.Job_announcementsLinks.last = action.payload.links.last;
        state.Job_announcementsLinks.prev = action.payload.links.prev;
        state.Job_announcementsLinks.next = action.payload.links.next;
        state.currentPage = action.payload.meta.current_page;
      })
      .addCase(getOneJob_announcementsData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.OneJobAnnouncementsData = action.payload;
      })

      .addCase(getJob_announcementsData.rejected, (state) => {
        state.error = true;
      });
  },
});
export const { setCurrentPage } = Job_announcementsSlice.actions;
export default Job_announcementsSlice.reducer;
