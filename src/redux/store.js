import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import auth from "../modules/auth/redux/auth.js";
import profile from "../modules/auth/redux/profile.js";
import roles from "../modules/role/redux/responsibility.js";
import interviews from "../modules/hr/redux/interviews";
import Job_announcements from "../modules/hr/redux/Job_announcements";
import Job from "../modules/hr/redux/Job";
import dashboard from "./dashboard";
import Contract from "../modules/hr/redux/Contract";
import subject from "./subject";
import Subjects from "./Subjects";
import showOnePlaneData from "./showOnePlane";
import changePassowrd from "../modules/auth/redux/changePassowrd.js";
import socialSpecialist from "./socialSpecialist";
import gradeExpenses from "./gradeExpenses";
import StudentsExpenses from "./StudentsExpenses";
import ExamSchedule from "./ExamSchedule";
import StudentInstallments from "./StudentInstallments";
import currencies from "./currencies";
import units from "../modules/unit/redux/Units.js";
import product from "../modules/product/redux/product.js";
import about_us from "../modules/aboutUs/redux/aboutUs.js";
import contact_us from "../modules/contactUs/redux/contact_us.js";
import colors from "../modules/color/redux/colors.js";
import garages from "../modules/garage/redux/garages.js";
import Applicants from "../modules/hr/redux/Applicants";
import Fired_employees from "../modules/hr/redux/Fired_employees.js";
import working_shifts from "../modules/hr/redux/working_shifts.js";
import Employees from "../modules/hr/redux/Employees";
import brands from "../modules/brand/redux/brands.js";
import TypeExpensess from "../modules/expenseType/redux/TypeExpensess.js";
import student from "./student";
import penalty from "../modules/hr/redux/allowancePenaltyTypes";
import Quote from "../modules/quote/redux/Quote.js";
import storeHouse from "../modules/storehouse/redux/storeHouse.js";
import select_menus from "./select_menus";
import settings from "../modules/setting/redux/settings.js";
import visitorsCars from "../modules/visitorCar/redux/visitorsCars.js";
import Department from "../modules/hr/redux/Department";
import Expenses from "../modules/expense/redux/Expenses.js";
import tasks from "../modules/task/redux/tasks.js";
import DamagedMaterials from "../modules/damagedMaterial/redux/DamagedMaterials.js";
import termsAndCondtions from "../modules/termsAndConditions/redux/termsAndCondtions.js";
import Visitors from "../modules/visitor/redux/Visitors.js";
import visits from "../modules/visit/redux/visits.js";
import consumedProducts from "../modules/consumedProduct/redux/consumedProduct.js";
import carFix from "../modules/carFix/redux/carFix.js";
import adminEmployee from "../modules/adminEmployee/redux/adminEmployee.js";
import notifications from "./notification";
import myTasks from "../modules/myTask/redux/myTasks.js";
import Blogs from "../modules/blog/redux/blogs.js";
import cars from "../modules/car/redux/cars.js";
import Testimonials from "../modules/testimonial/redux/Testimonials.js";
import employeeAllowances from "../modules/hr/redux/employee_allowances";
import EmployeePenalties from "../modules/hr/redux/EmployeePenalties";
import vacations from "../modules/hr/redux/vacations.js";
import absence from "../modules/hr/redux/absence.js";
import sections from "../modules/section/redux/sections.js";
import ourTeam from "../modules/ourTeam/redux/ourTeam.js";
import ads from "../modules/ad/redux/ads.js";
import statistics from "../modules/dashboard/redux/statistics.js";
import employeeAccountingReducer from "./emoloyee-accounting-Slice";
import accountingStatisticsReducer from "./accountingStatistics-slice.js";
import safeSlice from "../modules/Safe/redux/safe-slice";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
import employeePayment from "../modules/hr/pages/EmployeePayment/redux/employeePayment.js";

const persistedReducer = persistReducer(persistConfig, auth);

export const store = configureStore({
  reducer: {
    safeSlice,
    employeePayment,
    user: persistedReducer,
    profile: profile,
    dashboard: dashboard,
    roles: roles,
    subject: subject,
    student: student,
    subjects: Subjects,
    showOnePlane: showOnePlaneData,
    changePassword: changePassowrd,
    socialSpecialist: socialSpecialist,
    cars: cars,
    Department: Department,
    Job: Job,
    brands: brands,
    Expenses: Expenses,
    units: units,
    product: product,
    about_us: about_us,
    contactUs: contact_us,
    colors: colors,
    garages: garages,
    gradeExpenses: gradeExpenses,
    StudentsExpenses: StudentsExpenses,
    ExamSchedule: ExamSchedule,
    Installments: StudentInstallments,
    currencies: currencies,
    Job_announcements: Job_announcements,
    Contract: Contract,
    Applicants: Applicants,
    Fired_employees: Fired_employees,
    working_shifts: working_shifts,
    Employees: Employees,
    typeExpensess: TypeExpensess,
    interviews: interviews,
    Quote: Quote,
    storeHouse: storeHouse,
    selectMenu: select_menus,
    settings: settings,
    visitorsCars: visitorsCars,
    tasks: tasks,
    damagedMaterials: DamagedMaterials,
    termsAndCondtions: termsAndCondtions,
    visitors: Visitors,
    ads: ads,
    visits: visits,
    consumedProducts: consumedProducts,
    CarFix: carFix,
    admin: adminEmployee,
    notifications: notifications,
    myTasks: myTasks,
    Blogs: Blogs,
    Penalty: penalty,
    testimonials: Testimonials,
    employeeAllowances: employeeAllowances,
    employeePenalties: EmployeePenalties,
    vacations: vacations,
    absence: absence,
    section: sections,
    ourTeam: ourTeam,
    statistics: statistics,
    employeeAccountingReducer,
    accountingStatisticsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export let persistor = persistStore(store);
