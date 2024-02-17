import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./i18n";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { Toaster } from "react-hot-toast";
import { disableInspect } from "./disableInspect";
import { axiosInterceptor } from "./axiosInterceptor";
import { routes } from "./routes";
const rootElement = document.getElementById("root");
// Check the current language and set a class for RTL layout
const lang = localStorage.getItem("i18nextLng");
// Disable right-click //
// disableInspect();
// Interceptor Handleing function //
axiosInterceptor();
const isRTL = lang === "ar";

// Apply the class based on the RTL status
if (isRTL) {
  rootElement.classList.add("rtl");
  rootElement.classList.remove("ltr");
} else {
  rootElement.classList.add("ltr");
  rootElement.classList.remove("rtl");
}

const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Toaster position="top-center" />
      <RouterProvider router={routes} />
    </PersistGate>
  </Provider>
);
