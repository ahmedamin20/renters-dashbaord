import { createBrowserRouter } from "react-router-dom";
import Department from "../modules/hr/pages/Department";
import ApplicantsTable from "../modules/hr/pages/Applicants/ApplicantsTable";
import App from "../App";
import ProductsTable from "../modules/product/pages/ProductTable.jsx";
import AddProduct from "../modules/product/pages/AddPruduct.jsx";
import EditProduct from "../modules/product/pages/EditProduct.jsx";
import EditJob_announcements from "../modules/hr/pages/Job_announcements/EditJob_announcements";
import AboutUs from "../modules/aboutUs/pages/aboutUs.jsx";
import ContactUs from "../modules/contactUs/pages/contactUs.jsx";
import Units from "../modules/unit/pages/index.jsx";
import Profile from "../modules/auth/pages/profile/profile";
import Colors from "../modules/color/pages/colors.jsx";
import JobTable from "../modules/hr/pages/Job/JobTable";
import Job_announcementsTable from "../modules/hr/pages/Job_announcements/Job_announcementsTable";
import Working_shiftsTable from "../modules/hr/pages/working_shifts/Working_shiftsTable";
import EmployeesTable from "../modules/hr/pages/Employees/EmployeesTable";
import InterviewsTable from "../modules/hr/pages/Applicants/interviews/InterviewsTable";
import Responsibility from "../modules/role/pages/index.jsx";
import TypeExpensessTable from "../modules/expenseType/pages/table.jsx";
import { Quote } from "../modules/quote/pages/Quote.jsx";
import StoreHouse from "../modules/storehouse/pages/storeHouse.jsx";
import Settings from "../modules/setting/pages/settings.jsx";
import VisitorsCars from "../modules/visitorCar/pages/VisitorsCars.jsx";
import AddVisitorsCars from "../modules/visitorCar/pages/AddVisitorsCars.jsx";
import EditVisitorsCars from "../modules/visitorCar/pages/EditVisitorsCars.jsx";
import Tasks from "../modules/task/pages/tasks.jsx";
import AddTasks from "../modules/task/pages/AddTasks.jsx";
import EditTasks from "../modules/task/pages/EditTasks.jsx";
import DamagedMaterials from "../modules/damagedMaterial/pages/damagedMaterials.jsx";
import TermsAndCondtions from "../modules/termsAndConditions/pages/termsAndCondtions.jsx";
import Visitors from "../modules/visitor/pages/Visitors.jsx";
import AddVisitors from "../modules/visitor/pages/AddVisitors.jsx";
import EditVisitors from "../modules/visitor/pages/EditVisitors.jsx";
import AdsTable from "../modules/ad/pages/ads.jsx";
import AddAds from "../modules/ad/pages/addAds.jsx";
import EditAds from "../modules/ad/pages/editAds.jsx";
import Visits from "../modules/visit/pages/Visits.jsx";
import ConsumedProducts from "../modules/consumedProduct/pages/consumedProducts.jsx";
import AddConsumedProduct from "../modules/consumedProduct/pages/AddcomsumedProduct.jsx";
import EditConsumedProduct from "../modules/consumedProduct/pages/editComsumedProduct.jsx";
import CarFix from "../modules/carFix/pages/carFix.jsx";
import AddCarFix from "../modules/carFix/pages/addCarFix.jsx";
import ShowCarFix from "../modules/carFix/pages/ShowOneCarFix.jsx";
import Expenses from "../modules/expense/pages/Expenses.jsx";
import AdminEmpolyee from "../modules/adminEmployee/pages/adminEmpolyee.jsx";
import AddAdmin from "../modules/adminEmployee/pages/addAdmin.jsx";
import EditAdmin from "../modules/adminEmployee/pages/editAdmin.jsx";
import MyTasks from "../modules/myTask/pages/myTasks.jsx";
import Blogs from "../modules/blog/pages/blogs.jsx";
import EditCarFix from "../modules/carFix/pages/editCarFix.jsx";
import AddRoles from "../modules/role/pages/AddRoles.jsx";
import EditRole from "../modules/role/pages/EditRoles.jsx";
import AddGarage from "../modules/garage/pages/AddGarage.jsx";
import EditGarage from "../modules/garage/pages/EditGarage.jsx";
import AddStoreHouse from "../modules/storehouse/pages/addStoreHouse.jsx";
import EditStoreHouse from "../modules/storehouse/pages/editStoreHouse.jsx";
import BrandsTable from "../modules/brand/pages/table.jsx";
import SubUnitsTbale from "../modules/unit/pages/subUnitsTbale.jsx";
import Cars from "../modules/car/pages/index.jsx";
import MoveProducts from "../modules/moveProduct/pages/moveProducts.jsx";
import Garages from "../modules/garage/pages/Garages.jsx";
import { Testimonials } from "../modules/testimonial/pages/Testimonials.jsx";
import AddJobAnoucementPage from "../modules/hr/pages/Job_announcements/AddJobAnoucementPage";
import AddEmployees from "../modules/hr/pages/Employees/AddEmployees";
import EditEmployee from "../modules/hr/pages/Employees/EditEmployees";
import PenaltyTable from "../modules/hr/pages/allowancePenaltyTypes/allowancePenaltyTypes";
import EmployeeAllowances from "../modules/hr/pages/employee_allowances/employee_allowances";
import EmployeePenalties from "../modules/hr/pages/employee_penalties/employee_Penalties";
import Vacations from "../modules/hr/pages/vacations/vacations";
import Absence from "../modules/hr/pages/absence/absence";
import hasPermission from "../utils/haspermission";
import Sections from "../modules/section/pages/sections.jsx";
import OurTeam from "../modules/ourTeam/pages/ourTeam.jsx";
import AddTeamMember from "../modules/ourTeam/pages/addTeamMember.jsx";
import EditTeamMember from "../modules/ourTeam/pages/editOurTeam.jsx";
import EmployeeInfo from "../modules/hr/pages/Employees/employeeInfo";
import ContractUpdate from "../modules/hr/pages/Employees/Contract/updateContract";
import Dashboard from "../modules/dashboard/pages/dashboard.jsx";
import EmployeeAccounting from "../modules/hr/pages/Accounting/EmployeeAccounting.jsx";
import AccountingPage from "../modules/hr/pages/Accounting/AccountingPage.jsx";
import AccountingStatistics from "../modules/hr/pages/Accounting/AccountingStatistics.jsx";
import SafePage from "./../modules/Safe/Pages/SafePage";
import SafeForm from "./../modules/Safe/Pages/safeForm";
import AddExpenses from "../modules/expense/pages/addExpenses.jsx";
import EditExpenses from "../modules/expense/pages/editExpenses.jsx";
import ContactUsInfo from "../modules/contactUs/pages/ContactUsInfo.jsx";
import TestimonialsInfoPage from "../modules/testimonial/pages/TestimonialsInfoPage.jsx";
import QuoteInfoPage from "../modules/quote/pages/QuoteInfoPage.jsx";
import AddBlog from "../modules/blog/pages/addBlog.jsx";
import EditBlogs from "../modules/blog/pages/editBlog.jsx";
import AddDepartment from "../modules/hr/pages/Department/AddDepartment.jsx";
import EditDepartment from "../modules/hr/pages/Department/EditDepartment.jsx";
import AddJob from "./../modules/hr/pages/Job/AddJob";
import EditJob from "../modules/hr/pages/Job/EditJob.jsx";
import AddWorkingShift from "./../modules/hr/pages/working_shifts/Addworking_shifts";
import EditWorkingShift from "./../modules/hr/pages/working_shifts/Editworking_shifts";
import AddPenalty from "./../modules/hr/pages/allowancePenaltyTypes/addPenalty";
import EditPenalty from "./../modules/hr/pages/allowancePenaltyTypes/editPenalty";
import AddAllowances from "../modules/hr/pages/employee_allowances/addAllowances.jsx";
import EditAllowances from "../modules/hr/pages/employee_allowances/editAllowances.jsx";
import AddEmployeesPenalties from "./../modules/hr/pages/employee_penalties/addPenalties";
import EditEmployeesPenalties from "./../modules/hr/pages/employee_penalties/editPenalties";
import AddVacation from "./../modules/hr/pages/vacations/Addvacations";
import EditVacation from "./../modules/hr/pages/vacations/EditVacations";
import AddVisit from "../modules/visit/pages/addVisit.jsx";
import EditVisit from "../modules/visit/pages/editVisit.jsx";
import Inventories from "./../modules/Safe/Pages/inventories";
import OneInventory from "./../modules/Safe/Pages/oneInventory";
import EmployeePaymentTable from "./../modules/hr/pages/EmployeePayment/Pages/employeePayment";
import EmployeePaymentForm from "../modules/hr/pages/EmployeePayment/Pages/employeePaymentForm.jsx";
import CategoriesTable from "../modules/categories/pages/cateories.jsx";
import AddCatgory from "../modules/categories/pages/add.jsx";
import EditCategory from "../modules/categories/pages/edit.jsx";
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      

      
      
      
      {
        path: "contact-us/info/:id",
        element: <ContactUsInfo />,
      },
      {
        path: "Testimonials/info/:id",
        element: <TestimonialsInfoPage />,
      },

      hasPermission("all-contact_us") && {
        path: "contact-us",
        element: <ContactUs />,
      },
      { path: "profile", element: <Profile /> },
      { path: "about-us", element: <AboutUs /> },
      
      { path: "terms-and-conditions", element: <TermsAndCondtions /> },

       {
        path: "Testimonials",
        element: <Testimonials />,
      },
       {
        path: "categories",
        element: <CategoriesTable />,
      },
       {
        path: "categories/add",
        element: <AddCatgory />,
      },
       {
        path: "categories/edit/:id",
        element: <EditCategory />,
      },
      
       {
        path: "settings",
        element: <Settings />,
      },
      { path: "ads", element: <AdsTable /> },
      { path: "ads/add-ads", element: <AddAds /> },
      { path: "ads/edit-ads/:ad_id", element: <EditAds /> },
      { path: "Blogs", element: <Blogs /> },
      { path: "Blogs/add", element: <AddBlog /> },
      { path: "Blogs/edit/:id", element: <EditBlogs /> },
      { path: "ourteam", element: <OurTeam /> },
      { path: "ourteam/add", element: <AddTeamMember /> },
      { path: "ourteam/edit/:id", element: <EditTeamMember /> },
    ],
  },
]);
