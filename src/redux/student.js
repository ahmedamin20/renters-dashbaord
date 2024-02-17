import { createAsyncThunk } from "@reduxjs/toolkit";
import defaultAPI from "../axiosInstance";
import { createSlice } from "@reduxjs/toolkit";

const createAsyncThunkBuilder = (name, requestFn) => {
  return createAsyncThunk(`students/${name}`, async (info) => {
    const { studentId } = info;
    const apiUrl = `/students/${studentId}/${name}`;

    try {
      const res = await requestFn(apiUrl);
      return res.data;
    } catch (error) {
      throw error;
    }
  });
};

const createAsyncThunkBuilderDetailsStudent = (name, requestFn) => {
  return createAsyncThunk(`students/modifie/${name}`, async (id) => {
    const apiUrl = `/products/${id}`;

    try {
      const res = await requestFn(apiUrl);
      return res.data;
    } catch (error) {
      throw error;
    }
  });
};

export const getStudentExams = createAsyncThunk("students/exams", async () => {
  const apiUrl = `/select_menu/exams`;

  try {
    const res = await defaultAPI.get(apiUrl);
    return res.data;
  } catch (error) {
    throw error;
  }
});

export const getStudents = createAsyncThunk("students", async (info) => {
  const apiUrl = `/products?per_page=${info.pageSize}`;

  try {
    const res = await defaultAPI.get(apiUrl);
    return res.data;
  } catch (error) {
    throw error;
  }
});
export const SearchProducts = createAsyncThunk(
  "students/SearchProducts",
  async (info) => {
    const apiUrl = `/products?handle=${info.handle}&per_page=${info.pageSize}`;

    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getStudentInfo = createAsyncThunk("students/info", async () => {
  const apiUrl = `/select_menu/students`;

  try {
    const res = await defaultAPI.get(apiUrl);
    return res.data;
  } catch (error) {
    throw error;
  }
});
export const getStudentInfoByGrade = createAsyncThunk(
  "students/infoByGrade",
  async (id) => {
    const apiUrl = `/select_menu/students?grade_id=${id}`;

    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getStudentInfoByParent = createAsyncThunk(
  "students/getStudentInfoByParent",
  async (id) => {
    if (id) {
      const apiUrl = `/select_menu/students?parent_id=${id}`;
      try {
        const res = await defaultAPI.get(apiUrl);
        return res.data;
      } catch (error) {
        throw error;
      }
    }
    return [];
  }
);

export const addStudent = createAsyncThunk("students/add", async (values) => {
  const apiUrl = `/products`;
  try {
    const res = await defaultAPI.post(apiUrl, values);
    return res.data;
  } catch (error) {
    throw error;
  }
});

export const fetchStudentData = createAsyncThunk(
  "students/data",
  async ({ id }) => {
    const apiUrl = `/students/${id}`;

    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const fetchStudentsDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info;
  try {
    dispatch(getStudents.pending());
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`);
    const data = response.data;

    dispatch(getStudents.fulfilled(data));
    dispatch(setCurrentPage(state));
  } catch (error) {
    dispatch(getStudents.rejected());
  }
};
export const updateStudent = createAsyncThunk(
  "students/update",
  async (info) => {
    const { values, student_id } = info;
    const apiUrl = `/products/${student_id}`;
    try {
      const res = await defaultAPI.post(apiUrl, values);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const studentData = createAsyncThunkBuilder("details", defaultAPI.get);
export const getStudentReports = createAsyncThunkBuilder(
  "reports",
  defaultAPI.get
);
export const getStudentBans = createAsyncThunkBuilder("bans", defaultAPI.get);
export const getstudentAppreciations = createAsyncThunkBuilder(
  "appreciations",
  defaultAPI.get
);
export const getstudentGuardians = createAsyncThunkBuilder(
  "guardians",
  defaultAPI.get
);

export const removeReports = createAsyncThunkBuilderDetailsStudent(
  "reports",
  defaultAPI.delete
);
export const removeExams = createAsyncThunkBuilderDetailsStudent(
  "exams",
  defaultAPI.delete
);
export const removeBans = createAsyncThunkBuilderDetailsStudent(
  "bans",
  defaultAPI.delete
);
export const removeAppreciations = createAsyncThunkBuilderDetailsStudent(
  "appreciations",
  defaultAPI.delete
);
export const removeGuardians = createAsyncThunkBuilderDetailsStudent(
  "guardians",
  defaultAPI.delete
);
export const removeStudents = createAsyncThunkBuilderDetailsStudent(
  "students",
  defaultAPI.delete
);

const studentSlice = createSlice({
  name: "student",
  initialState: {
    students: [],
    studentInfo: [],
    studentReports: [],
    studentExams: [],
    studentBans: [],
    student_data: [],
    student_menu: [],
    studentParent_menu: [],
    studentAppreciations: [],
    studentGuardians: [],
    studentsInfo: [],
    studentsLinks: {
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
      .addCase(getStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.students = action.payload;
        state.studentsLinks = action.payload.links;
        state.studentsLinks.first = action.payload.links.first;
        state.studentsLinks.last = action.payload.links.last;
        state.studentsLinks.prev = action.payload.links.prev;
        state.studentsLinks.next = action.payload.links.next;
        state.currentPage = action.payload.meta.current_page;
      })
      .addCase(SearchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.students = action.payload;
        state.studentsLinks = action.payload.links;
        state.studentsLinks.first = action.payload.links.first;
        state.studentsLinks.last = action.payload.links.last;
        state.studentsLinks.prev = action.payload.links.prev;
        state.studentsLinks.next = action.payload.links.next;
        state.currentPage = action.payload.meta.current_page;
      })
      .addCase(getStudents.rejected, (state) => {
        state.error = true;
      })
      .addCase(studentData.pending, (state) => {
        state.loading = true;
      })
      .addCase(studentData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.studentInfo = action.payload;
      })
      .addCase(studentData.rejected, (state) => {
        state.error = true;
      })

      .addCase(getStudentInfoByGrade.fulfilled, (state, action) => {
        state.student_menu = action.payload;
      })
      .addCase(getStudentInfoByParent.fulfilled, (state, action) => {
        state.studentParent_menu = action.payload;
      })

      .addCase(getStudentReports.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudentReports.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.studentReports = action.payload;
      })
      .addCase(getStudentReports.rejected, (state) => {
        state.error = true;
      })
      .addCase(getStudentExams.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudentExams.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.studentExams = action.payload;
      })
      .addCase(getStudentExams.rejected, (state) => {
        state.error = true;
      })
      .addCase(getStudentBans.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudentBans.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.studentBans = action.payload;
      })
      .addCase(getStudentBans.rejected, (state) => {
        state.error = true;
      })
      .addCase(getstudentAppreciations.pending, (state) => {
        state.loading = true;
      })
      .addCase(getstudentAppreciations.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.studentAppreciations = action.payload;
      })
      .addCase(getstudentAppreciations.rejected, (state) => {
        state.error = true;
      })
      .addCase(getstudentGuardians.pending, (state) => {
        state.loading = true;
      })
      .addCase(getstudentGuardians.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.studentGuardians = action.payload;
      })
      .addCase(getstudentGuardians.rejected, (state) => {
        state.error = true;
      })
      .addCase(removeReports.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeReports.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(removeReports.rejected, (state) => {
        state.error = true;
      })
      .addCase(removeExams.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeExams.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(removeExams.rejected, (state) => {
        state.error = true;
      })
      .addCase(removeBans.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeBans.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(removeBans.rejected, (state) => {
        state.error = true;
      })
      .addCase(removeAppreciations.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeAppreciations.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(removeAppreciations.rejected, (state) => {
        state.error = true;
      })
      .addCase(removeGuardians.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeGuardians.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(removeGuardians.rejected, (state) => {
        state.error = true;
      })
      .addCase(getStudentInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudentInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.studentInfo = action.payload;
        state.error = false;
      })
      .addCase(getStudentInfo.rejected, (state) => {
        state.error = true;
      })
      .addCase(removeStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(removeStudents.rejected, (state) => {
        state.error = true;
      })
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(updateStudent.rejected, (state) => {
        state.error = true;
      })
      .addCase(fetchStudentData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudentData.fulfilled, (state, action) => {
        state.loading = false;
        state.student_data = action.payload;
        state.error = false;
      })
      .addCase(fetchStudentData.rejected, (state) => {
        state.error = true;
      });
  },
});
export const { setCurrentPage } = studentSlice.actions;

export default studentSlice.reducer;
