import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AboutUs from "../modules/aboutUs/pages/aboutUs.jsx";
import AddAds from "../modules/ad/pages/addAds.jsx";
import AdsTable from "../modules/ad/pages/ads.jsx";
import EditAds from "../modules/ad/pages/editAds.jsx";
import Profile from "../modules/auth/pages/profile/profile";
import CarFix from "../modules/carFix/pages/carFix.jsx";
import AddCatgory from "../modules/categories/pages/add.jsx";
import CategoriesTable from "../modules/categories/pages/cateories.jsx";
import EditCategory from "../modules/categories/pages/edit.jsx";
import ContactUsInfo from "../modules/contactUs/pages/ContactUsInfo.jsx";
import ContactUs from "../modules/contactUs/pages/contactUs.jsx";
import Dashboard from "../modules/dashboard/pages/dashboard.jsx";
import Settings from "../modules/setting/pages/settings.jsx";
import TermsAndCondtions from "../modules/termsAndConditions/pages/termsAndCondtions.jsx";
import { Testimonials } from "../modules/testimonial/pages/Testimonials.jsx";
import TestimonialsInfoPage from "../modules/testimonial/pages/TestimonialsInfoPage.jsx";
import EditVisitors from "../modules/visitor/pages/EditVisitors.jsx";
import Visitors from "../modules/visitor/pages/Visitors.jsx";
import hasPermission from "../utils/haspermission";
import ShowCarFix from "../modules/carFix/pages/ShowOneCarFix.jsx";
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
        path: "users",
        element: <Visitors />,
      },
      {
        path: "orders",
        element: <CarFix />,
      },
      {
        path: "orders/:id/show",
        element: <ShowCarFix />,
      },
      {
        path: "users/:id",
        element: <EditVisitors />,
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
    ],
  },
]);
