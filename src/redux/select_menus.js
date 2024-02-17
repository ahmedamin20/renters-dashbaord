import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import defaultAPI from "../axiosInstance";
export const getGaragesMenu = createAsyncThunk(
  "selectMenu/garagesMenu",
  async () => {
    let apiUrl = `/select_menu/garages?mine=1`;
    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getEmployeesMenu = createAsyncThunk(
  "selectMenu/getEmployeesMenu",
  async () => {
    let apiUrl = `/select_menu/employees`;
    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getMyManagermenu = createAsyncThunk(
  "selectMenu/getMyManagermenu",
  async () => {
    let apiUrl = `/hr/select_menu/employees`;
    const res = await defaultAPI.get(apiUrl);
    return res.data;
  }
);
export const getVisitorsMenu = createAsyncThunk(
  "selectMenu/getVisitorsMenu",
  async () => {
    let apiUrl = `/select_menu/visitors`;
    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getBrandsMenu = createAsyncThunk(
  "selectMenu/getBrandsMenu",
  async () => {
    let apiUrl = `/select_menu/brands`;
    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getColorsMenu = createAsyncThunk(
  "selectMenu/getColorsMenu",
  async () => {
    let apiUrl = `/select_menu/colors`;
    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getExpensesMenu = createAsyncThunk(
  "selectMenu/getExpensesMenu",
  async () => {
    let apiUrl = `/select_menu/expenses_types`;
    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getVisitorsCarsMenu = createAsyncThunk(
  "selectMenu/getVisitorsCarsMenu",
  async () => {
    let apiUrl = `/select_menu/visitors_cars`;
    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getMyEmployeeMenu = createAsyncThunk(
  "selectMenu/getMyEmployeeMenu",
  async () => {
    let apiUrl = `/select_menu/my_employees`;
    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getStoreHousesMenu = createAsyncThunk(
  "selectMenu/getStoreHousesMenu",
  async () => {
    let apiUrl = `/select_menu/storehouses`;
    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getRole = createAsyncThunk("selectMenu/getRole", async () => {
  let apiUrl = `/select_menu/roles`;
  try {
    const res = await defaultAPI.get(apiUrl);
    return res.data;
  } catch (error) {
    throw error;
  }
});
export const getStoreHousesProductMenu = createAsyncThunk(
  "selectMenu/getStoreHousesProductMenu",
  async (id) => {
    if (id) {
      let apiUrl = `/select_menu/storehouses/${id}/products`;
      try {
        const res = await defaultAPI.get(apiUrl);
        return res.data;
      } catch (error) {
        throw error;
      }
    }
  }
);
export const getMyProductMenu = createAsyncThunk(
  "selectMenu/getMyProductMenu",
  async () => {
    let apiUrl = `/select_menu/products/my_products`;
    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getSubUnit = createAsyncThunk(
  "selectMenu/getSubUnit",
  async (id) => {
    if (id) {
      let apiUrl = `/select_menu/units/parent_units/${id}/sub_units`;
      try {
        const res = await defaultAPI.get(apiUrl);
        return res.data;
      } catch (error) {
        throw error;
      }
    }
  }
);
export const getParentUnits = createAsyncThunk(
  "selectMenu/getParentUnits",
  async () => {
    let apiUrl = `/select_menu/units/parent_units`;
    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getMyGarageEmployees = createAsyncThunk(
  "selectMenu/getMyGarageEmployees",
  async (garageId) => {
    let apiUrl = `/select_menu/my_garage_employees?garage_id=${garageId}`;
    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getDepartmentsMenu = createAsyncThunk(
  "selectMenu/getDepartmentsMenu",
  async () => {
    let apiUrl = `/hr/select_menu/departments`;
    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getUsersMenu = createAsyncThunk(
  "selectMenu/getUsersMenu",
  async () => {
    let apiUrl = `/hr/select_menu/users`;
    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getJobsMenu = createAsyncThunk(
  "selectMenu/getJobsMenu",
  async () => {
    let apiUrl = `/hr/select_menu/jobs`;
    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getWorkingShiftsMenu = createAsyncThunk(
  "selectMenu/getWorkingShiftsMenu",
  async () => {
    let apiUrl = `/hr/select_menu/working_shifts`;
    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getEmployeeAllowancesMenu = createAsyncThunk(
  "selectMenu/getEmployeeAllowances",
  async () => {
    let apiUrl = `hr/select_menu/employee_allowances`;
    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getEmployeePenalties = createAsyncThunk(
  "selectMenu/getEmployeePenalties",
  async () => {
    let apiUrl = `hr/select_menu/employee_penalties`;
    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getApplicants = createAsyncThunk(
  "selectMenu/getApplicants",
  async () => {
    let apiUrl = `hr/select_menu/applicants`;
    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getWorkingShifts = createAsyncThunk(
  "selectMenu/getWorkingShifts",
  async () => {
    let apiUrl = `hr/select_menu/working_shifts`;
    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getOurTeamMenu = createAsyncThunk(
  "selectMenu/getOurTeamMenu",
  async () => {
    let apiUrl = `/select_menu/sections`;
    const res = await defaultAPI.get(apiUrl);
    // console.log(res);
    return res.data;
  }
);

const selectMenuSlice = createSlice({
  name: "selectMenu",
  initialState: {
    WorkingShiftsMenu: [],
    JobsMenu: [],
    UsersMenu: [],
    MyDepartmentmenu: [],
    EmployeeAllowances: [],
    MyManagermenu: [],
    garagesMenu: [],
    myGarageEmployeesMenu: [],
    workingShiftsmenu: [],
    employeesMenu: [],
    teamMenu: [],
    roles: [],
    myEmployeesMenu: [],
    ParentUnitsMenu: [],
    subUnitsMenu: [],
    storeHouseMenu: [],
    storeHouseProductsMenu: [],
    EmployeePenalties: [],
    brandsMenu: [],
    myProduct: [],
    VisitorsCarsMenu: [],
    expensesMenu: [],
    colorsMenu: [],
    visitorsMenu: [],
    applicantsMenu: [],
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWorkingShiftsMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWorkingShiftsMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.WorkingShiftsMenu = action.payload;
      })
      .addCase(getWorkingShiftsMenu.rejected, (state) => {
        state.error = true;
      })
      .addCase(getOurTeamMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOurTeamMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.teamMenu = action.payload;
        console.log("action", action.payload);
      })
      .addCase(getOurTeamMenu.rejected, (state) => {
        state.error = true;
      })
      .addCase(getEmployeePenalties.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEmployeePenalties.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.EmployeePenalties = action.payload;
      })
      .addCase(getEmployeePenalties.rejected, (state) => {
        state.error = true;
      })
      .addCase(getEmployeeAllowancesMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEmployeeAllowancesMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.EmployeeAllowances = action.payload;
      })
      .addCase(getEmployeeAllowancesMenu.rejected, (state) => {
        state.error = true;
      })
      .addCase(getDepartmentsMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDepartmentsMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.MyDepartmentmenu = action.payload;
      })
      .addCase(getDepartmentsMenu.rejected, (state) => {
        state.error = true;
      })
      .addCase(getWorkingShifts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWorkingShifts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.workingShiftsmenu = action.payload;
      })
      .addCase(getWorkingShifts.rejected, (state) => {
        state.error = true;
      })

      .addCase(getJobsMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(getJobsMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.JobsMenu = action.payload;
      })
      .addCase(getJobsMenu.rejected, (state) => {
        state.error = true;
      })
      //
      .addCase(getUsersMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsersMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.UsersMenu = action.payload;
      })
      .addCase(getUsersMenu.rejected, (state) => {
        state.error = true;
      })
      .addCase(getGaragesMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGaragesMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.garagesMenu = action.payload;
      })
      .addCase(getGaragesMenu.rejected, (state) => {
        state.error = true;
      })
      .addCase(getMyProductMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyProductMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.myProduct = action.payload;
      })
      .addCase(getMyProductMenu.rejected, (state) => {
        state.error = true;
      })
      .addCase(getRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRole.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.roles = action.payload;
      })
      .addCase(getRole.rejected, (state) => {
        state.error = true;
      })
      .addCase(getMyGarageEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyGarageEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.myGarageEmployeesMenu = action.payload;
      })
      .addCase(getMyGarageEmployees.rejected, (state) => {
        state.error = true;
      })
      .addCase(getSubUnit.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSubUnit.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.subUnitsMenu = action.payload;
      })
      .addCase(getSubUnit.rejected, (state) => {
        state.error = true;
      })
      .addCase(getParentUnits.pending, (state) => {
        state.loading = true;
      })
      .addCase(getParentUnits.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.ParentUnitsMenu = action.payload;
      })
      .addCase(getParentUnits.rejected, (state) => {
        state.error = true;
      })
      .addCase(getStoreHousesProductMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStoreHousesProductMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.storeHouseProductsMenu = action.payload;
      })
      .addCase(getStoreHousesProductMenu.rejected, (state) => {
        state.error = true;
      })
      .addCase(getStoreHousesMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStoreHousesMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.storeHouseMenu = action.payload;
      })
      .addCase(getStoreHousesMenu.rejected, (state) => {
        state.error = true;
      })
      .addCase(getMyEmployeeMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyEmployeeMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.myEmployeesMenu = action.payload;
      })
      .addCase(getMyEmployeeMenu.rejected, (state) => {
        state.error = true;
      })
      .addCase(getVisitorsCarsMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVisitorsCarsMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.VisitorsCarsMenu = action.payload;
      })
      .addCase(getVisitorsCarsMenu.rejected, (state) => {
        state.error = true;
      })
      .addCase(getExpensesMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(getExpensesMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.expensesMenu = action.payload;
      })
      .addCase(getExpensesMenu.rejected, (state) => {
        state.error = true;
      })
      .addCase(getEmployeesMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEmployeesMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.employeesMenu = action.payload;
      })
      .addCase(getEmployeesMenu.rejected, (state) => {
        state.error = true;
      })
      .addCase(getVisitorsMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVisitorsMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.visitorsMenu = action.payload;
      })
      .addCase(getVisitorsMenu.rejected, (state) => {
        state.error = true;
      })
      .addCase(getBrandsMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBrandsMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.brandsMenu = action.payload;
      })
      .addCase(getBrandsMenu.rejected, (state) => {
        state.error = true;
      })
      .addCase(getColorsMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(getColorsMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.colorsMenu = action.payload;
      })
      .addCase(getColorsMenu.rejected, (state) => {
        state.error = true;
      })

      .addCase(getMyManagermenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyManagermenu.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.MyManagermenu = action.payload;
      })
      .addCase(getMyManagermenu.rejected, (state) => {
        state.error = true;
      })
      .addCase(getApplicants.pending, (state) => {
        state.loading = true;
      })
      .addCase(getApplicants.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.applicantsMenu = action.payload;
      })
      .addCase(getApplicants.rejected, (state) => {
        state.error = true;
      });
  },
});
// export const { setCurrentPage } = selectMenuSlice.actions;

export default selectMenuSlice.reducer;
