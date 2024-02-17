import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import defaultAPI from "../../../axiosInstance.js";

export const getAbsence = createAsyncThunk(
  "absence/get",
  async ({ pageSize, year, WorkingShift, week }) => {
    const apiUrl = `/admin/absence_vacations?per_page=${pageSize}&year=${
      year || ""
    }&working_shift_id=${WorkingShift || ""}&week=${week || ""}`;
    const res = await defaultAPI.get(apiUrl);
    return res.data;
  }
);
export const updateAbsences= createAsyncThunk(
  "absence/update",
  async (values) => {
    const apiUrl = `/admin/absence_vacations/update_employees_vacations`;
    const res = await defaultAPI.post(apiUrl,values);
    return res.data;
  }
)
export const getWeekInfo = createAsyncThunk("absence/WeekInfo", async () => {
  const apiUrl = `/admin/absence_vacations/week_info`;
  const res = await defaultAPI.get(apiUrl);
  return res.data;
});
export const absenceSearch = createAsyncThunk(
  "absence_vacations/Search",
  async (info) => {
    let apiUrl = `/admin/absence_vacations?per_page=${info.pageSize}&handle=${info.handle}`;
    const res = await defaultAPI.get(apiUrl);
    return res.data;
  }
);

export const getOneAbsence = createAsyncThunk("absence/getOne", async (id) => {
  const apiUrl = `/admin/absence_vacations/${id}`;
  try {
    const res = await defaultAPI.get(apiUrl);
    return res.data;
  } catch (error) {
    throw error;
  }
});
export const editAbsence = createAsyncThunk(
  "absence/edit",
  async ({ id, values }) => {
    const apiUrl = `/admin/employees/${id}/absence_vacation`;
    try {
      const res = await defaultAPI.post(apiUrl, values);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

const absenceSlice = createSlice({
  name: "absence",
  initialState: {
    absenceData: [],
    oneAbsenceInfo: [],
    weekInfoData: [],
    absenceLinks: {
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
      .addCase(getAbsence.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAbsence.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.absenceData = action.payload;
        state.absenceLinks = action.payload.links;
        state.absenceLinks.first = action.payload.links.first;
        state.absenceLinks.last = action.payload.links.last;
        state.absenceLinks.prev = action.payload.links.prev;
        state.absenceLinks.next = action.payload.links.next;
        state.currentPage = action.payload.meta.current_page;
      })
      .addCase(absenceSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.absenceData = action.payload;
        state.absenceLinks = action.payload.links;
        state.absenceLinks.first = action.payload.links.first;
        state.absenceLinks.last = action.payload.links.last;
        state.absenceLinks.prev = action.payload.links.prev;
        state.absenceLinks.next = action.payload.links.next;
        state.currentPage = action.payload.meta.current_page;
      })
      .addCase(getWeekInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWeekInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.weekInfoData = action.payload;
      })
      .addCase(getWeekInfo.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getOneAbsence.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneAbsence.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.oneAbsenceInfo = action.payload;
      })
      .addCase(getOneAbsence.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      .addCase(getAbsence.rejected, (state) => {
        state.error = true;
      });
  },
});

export const { setCurrentPage } = absenceSlice.actions;

export default absenceSlice.reducer;
