import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import defaultAPI from "../../../axiosInstance.js";

export const Responsibility = createAsyncThunk(
  "roles/Responsibility",
  async (info) => {
    let { pageSize } = info;
    const apiUrl = `/roles?per_page=${pageSize || 10}`;
    try {
      const res = await defaultAPI.get(apiUrl);
      //console.log(res);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
export const ResponsibilitySearch = createAsyncThunk(
  "roles/ResponsibilitySearch",
  async (info) => {
    let { pageSize } = info;
    const apiUrl = `/roles?handle=${info.handle}&per_page=${pageSize}`;
    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const getOneRole = createAsyncThunk(
  "roles/getOneRole",
  async ({ id }) => {
    const apiUrl = `/roles/${id}`;
    const res = await defaultAPI.get(apiUrl);
    return res.data;
  }
);

export const deleteResponsibility = createAsyncThunk(
  "roles/deleteResponsibility",
  async (id) => {
    const apiUrl = `/roles/${id}`;
    try {
      const res = await defaultAPI.delete(apiUrl);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const editRoles = createAsyncThunk(
  "school/editRoles",
  async ({ name, permissions, id }) => {
    //console.log("hereeee");
    const apiUrl = `/roles/${id}`;
    try {
      const res = await defaultAPI.put(apiUrl, { name, permissions });

      return res.data;
    } catch (error) {
      return error.response.data.data;
    }
  }
);

export const getRoles = createAsyncThunk("roles/rolesMenu", async () => {
  const apiUrl = "select_menu/roles";
  const res = await defaultAPI.get(apiUrl);
  return res.data;
});
export const getPermission = createAsyncThunk(
  "roles/getPermission",
  async () => {
    const apiUrl = "/select_menu/permissions";
    const res = await defaultAPI.get(apiUrl);
    return res.data;
  }
);

export const addRole = createAsyncThunk("roles/addRole", async (info) => {
  const { name, permissions } = info;
  const apiUrl = "/roles";

  try {
    const res = await defaultAPI.post(apiUrl, { name, permissions });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
});

export const fetchRolesDataByPage = (info) => async (dispatch) => {
  let { state, pageSize } = info;
  try {
    dispatch(Responsibility.pending());
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`);
    const data = response.data;
    dispatch(Responsibility.fulfilled(data));
    dispatch(setCurrentPage(state));
  } catch (error) {
    //console.log(error);
    dispatch(Responsibility.rejected());
  }
};

const rolesSlice = createSlice({
  name: "roles",
  initialState: {
    roles: [],
    getRoles: [],
    responsibilityInfo: [],
    getPermission: [],
    RolesLinks: {
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
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Responsibility.pending, (state) => {
        state.loading = true;
      })
      .addCase(Responsibility.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.roles = action.payload;
        state.responsibilityInfo = [];
        state.RolesLinks.first = action.payload.links.first;
        state.RolesLinks.last = action.payload.links.last;
        state.RolesLinks.prev = action.payload.links.prev;
        state.RolesLinks.next = action.payload.links.next;
        state.currentPage = action.payload.meta.current_page;
      })
      .addCase(ResponsibilitySearch.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.roles = action.payload;
        state.RolesLinks.first = action.payload.links.first;
        state.RolesLinks.last = action.payload.links.last;
        state.RolesLinks.prev = action.payload.links.prev;
        state.RolesLinks.next = action.payload.links.next;
        state.currentPage = action.payload.meta.current_page;
      })
      .addCase(Responsibility.rejected, (state) => {
        state.error = true;
      })
      .addCase(getRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.getRoles = action.payload;
        // state.responsibilityInfo = [];
        state.error = false;
      })
      .addCase(getRoles.rejected, (state) => {
        state.error = true;
      })
      .addCase(getPermission.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPermission.fulfilled, (state, action) => {
        state.loading = false;
        state.getPermission = action.payload;
        state.error = false;
      })
      .addCase(getPermission.rejected, (state) => {
        state.error = true;
      })
      .addCase(getOneRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneRole.fulfilled, (state, action) => {
        state.loading = false;
        state.responsibilityInfo = action.payload;
        state.error = false;
      })
      .addCase(getOneRole.rejected, (state) => {
        state.error = true;
      })
      .addCase(editRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
      });
  },
});

export const { setCurrentPage } = rolesSlice.actions;
export default rolesSlice.reducer;
