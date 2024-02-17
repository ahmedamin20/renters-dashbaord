import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import defaultAPI from "../../../axiosInstance.js";

export const getOurTeam = createAsyncThunk(
  "ourTeam/get",
  async ({ pageSize }) => {
    let apiUrl = `/admin/our_team?per_page=${pageSize}`;

    const res = await defaultAPI.get(apiUrl);
    return res.data;
  }
);
export const getOneTeam = createAsyncThunk("ourTeam/getOne", async (id) => {
  let apiUrl = `/admin/our_team/${id}`;
  try {
    const res = await defaultAPI.get(apiUrl);
    return res.data;
  } catch (error) {
    throw error;
  }
});
export const searchOurTeam = createAsyncThunk(
  "ourTeam/search",
  async (info) => {
    let apiUrl = `/admin/our_team?handle=${info.handle}&per_page=${info.pageSize}`;
    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const editOurTeam = createAsyncThunk(
  "ourTeam/edit",
  async ({ id, values }) => {
    const apiUrl = `/admin/our_team/${id}`;
    try {
      const res = await defaultAPI.post(apiUrl, values);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const deleteTeam = createAsyncThunk("ourTeam/delete", async (id) => {
  const apiUrl = `/admin/our_team/${id}`;
  try {
    const res = await defaultAPI.delete(apiUrl);
    return res.data;
  } catch (error) {
    throw error;
  }
});
export const addOurTeam = createAsyncThunk("ourTeam/add", async (values) => {
  const apiUrl = `/admin/our_team`;
  try {
    const res = await defaultAPI.post(apiUrl, values);
    return res.data;
  } catch (error) {
    throw error;
  }
});
export const fetchOurTeamDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info;
  try {
    dispatch(getOurTeam.pending());
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`);
    const data = response.data;

    dispatch(getOurTeam.fulfilled(data));
    dispatch(setCurrentPage(state));
  } catch (error) {
    dispatch(getOurTeam.rejected());
  }
};
const ourTeamSlice = createSlice({
  name: "ourTeam",
  initialState: {
    ourTeamData: [],
    oneTeam: [],
    ourTeamLinks: {
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
      .addCase(getOurTeam.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOurTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.ourTeamData = action.payload;
        state.ourTeamLinks = action.payload.links;
        state.ourTeamLinks.first = action.payload.links.first;
        state.ourTeamLinks.last = action.payload.links.last;
        state.ourTeamLinks.prev = action.payload.links.prev;
        state.ourTeamLinks.next = action.payload.links.next;
        state.currentPage = action.payload.meta.current_page;
      })
      .addCase(getOurTeam.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getOneTeam.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.oneTeam = action.payload;
      })
      .addCase(getOneTeam.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(searchOurTeam.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchOurTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.ourTeamData = action.payload;
      })
      .addCase(searchOurTeam.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});
export const { setCurrentPage } = ourTeamSlice.actions;

export default ourTeamSlice.reducer;
