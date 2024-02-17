import { useState } from "react";
import { Menu, SubMenu, MenuItem, Sidebar } from "react-pro-sidebar";
import { useSidebarContext } from "./sidebarContext";
import { tokens } from "../../../theme";
import { useTheme, Box, IconButton, Typography } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useTranslation } from "react-i18next";
import { MenuOutlined } from "@mui/icons-material";
import Item from "./sidebarMenuItem";
import RoutesArray from "./routesArray";
import "./sidebar.css";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
const MyProSidebar = () => {
  const { t } = useTranslation();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("brands");
  const { sidebarRTL } = useSidebarContext();
  const [collapsed, setCollapsed] = useState(true);
  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        minHeight: "100vh",
        top: 0,
        // bottom: 0,
        // zIndex: 10000,
        "& .sidebar": {
          border: "none",
        },
        "& .menu-icon": {
          backgroundColor: "transparent !important",
        },
        "& .menu-item": {
          backgroundColor: "transparent !important",
        },
        "& .menu-anchor": {
          color: "inherit !important",
          backgroundColor: "transparent !important",
        },
        "& .sub-menu-content": {
          color: "inherit !important",
          backgroundColor: `${colors.primary[400]} !important`,
        },

        "& .sc-pyfCe:hover": {
          color: `#0090ff !important`,
          backgroundColor: "transparent !important",
        },
        "& .menu-item.active": {
          color: `#0090ff !important`,
          backgroundColor: "transparent !important",
        },
      }}
    >
      <Sidebar
        className="parentSidebar"
        // breakPoint="md"
        rtl={sidebarRTL}
        collapsed={collapsed}
        width="350px"
        backgroundColor={colors.primary[400]}
      >
        <Menu iconshape="square">
          <MenuItem
            icon={
              collapsed && (
                <MenuOutlined onClick={() => setCollapsed(!collapsed)} />
              )
            }
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!collapsed && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "1rem auto",
                  width: "200px",
                  height: "200px",
                  marginTop:"5rem"
                }}
              >
                <img
                  src={
                    localStorage.getItem("color-mode") === "dark"
                      ? "/assets/logo.png"
                      : "/assets/logo.png"
                  }
                  alt="logo"
                  width="150px"
                  height="150px"
                  style={{
                    marginTop: "2rem",
                    // margin: "0px 10px",
                    "@media (maxWidth:600px)": { margin: "0px 12px" },
                  }}
                />
                {/* <Avatar scr="assets/KSBLOGOPNG.png"/> */}
                <IconButton
                  onClick={() => setCollapsed(!collapsed)}
                  // onClick={
                  sx={{marginLeft:"50%"}}
                  // }
                >
                  <CloseOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          <Box paddingLeft={collapsed ? undefined : "12%"}>
            <MenuItem
              active={selected === "Dashboard"}
              onClick={() => setSelected("Dashboard")}
              icon={<DashboardIcon />}
              routerLink={<Link to="/" />}
              style={{
                color: colors.grey[100],
              }}
            >
              <Typography sx={{ fontSize: "15px", fontWeight: 600 }}>
                {t("Dashboard")}
              </Typography>
            </MenuItem>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              <hr />
            </Typography>

            <Menu className="customFont" transitionDuration={2000}>
              {RoutesArray().map((item, index) => (
                <SubMenu
                  className="customFont"
                  icon={item.icon}
                  key={index}
                  label={t(item.lable)}
                >
                  {item.routes.map((menuItem) => (
                    <Item
                      key={menuItem.title}
                      title={t(menuItem.title)}
                      to={menuItem.to}
                      icon={menuItem.icon}
                      selected={selected}
                      setSelected={setSelected}
                      permission={menuItem.permission}
                      type={menuItem.type}
                    />
                  ))}
                </SubMenu>
              ))}
            </Menu>
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default MyProSidebar;
