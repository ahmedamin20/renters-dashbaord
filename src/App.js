import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { MyProSidebarProvider } from "./pages/global/sidebar/sidebarContext";
import { useEffect } from "react";
import Topbar from "./pages/global/Topbar";
import { Outlet } from "react-router-dom";
import withGuard from "./with_guard";
import Copyright from "./components/copywrite/copyWrite";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "./modules/auth/redux/profile.js";
import hasPermission from "./utils/haspermission";

const App = () => {
  hasPermission();
  const [theme, colorMode] = useMode();
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch, token]);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", colorMode.mode);
  }, [colorMode?.mode]);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyProSidebarProvider>
          <div style={{ height: "100%", width: "100%" }}>
            <main>
              <Topbar />
              <Outlet />
              <Copyright variant={"h3"} />
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
export default withGuard(App);
