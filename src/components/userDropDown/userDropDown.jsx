import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../modules/auth/redux/auth.js";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { StatuseCode } from "../../statuseCodes";

const UserDropDown = () => {
  const navigate = useNavigate();
  const avatarFetch = useSelector((state) => state.profile.avatar) || "";
  const { t } = useTranslation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await dispatch(userLogout()).then((res) => {
      if (res.payload.code === StatuseCode.OK) {
        localStorage.clear();
        navigate("/");
      }
    });
  };
  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar src={avatarFetch} alt="photo" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Link
          style={{ textDecoration: "none", color: colors.grey[100] }}
          to="/profile"
        >
          <MenuItem onClick={handleClose}>{t("Profile")}</MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>{t("Logout")}</MenuItem>
      </Menu>
    </>
  );
};
export default UserDropDown;
