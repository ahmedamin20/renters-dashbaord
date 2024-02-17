import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import defaultAPI from "../../../axiosInstance.js";
import { USER_TYPES_ENUM } from "../../../enums/userTypeEnum.js";
import { store } from "./../../../redux/store";
export const getStatistics = createAsyncThunk(
  "statistics/getAdmin",
  async ({ checkUserType }) => {
    if (checkUserType === USER_TYPES_ENUM.ADMIN) {
      const apiUrl = `/statistics/admin`;
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } else if (
      checkUserType ===
      (USER_TYPES_ENUM.MAIN_GARAGE || USER_TYPES_ENUM.SUB_GARAGE)
    ) {
      const apiUrl = `/statistics/garages`;
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    }
    console.log(checkUserType);
  }
);

// export const getGarageStatistics = createAsyncThunk(
//   "statistics/getGarage",
//   async () => {
//     const apiUrl = "/statistics/garages";
//     const res = await defaultAPI.get(apiUrl);
//     return res.data;
//   }
// );

const statisticsSlice = createSlice({
  name: "statistics",
  initialState: {
    statisticsData: [],
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStatistics.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.statisticsData = action.payload;
      })
      .addCase(getStatistics.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default statisticsSlice.reducer;
