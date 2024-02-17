import { MenuItem } from "react-pro-sidebar";
import { useTheme, Typography } from "@mui/material";
import { tokens } from "../../../theme";
import { Link } from "react-router-dom";
import { getUserType } from "../../../utils/authorizedType";
import { useTranslation } from "react-i18next";
import hasPermission from "./../../../utils/haspermission";

const Item = ({ title, to, permission, icon, selected, setSelected, type }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();
  return (
    getUserType(type) &&
    hasPermission(permission) && (
      <MenuItem
        className="customFont"
        component={<button />}
        active={selected === title}
        style={{
          color: colors.grey[100],
          margin: "0 1.2rem",
        }}
        onClick={() => setSelected(title)}
        icon={icon}
        routerLink={<Link to={to} />}
      >
        <Typography
          className="customFont"
          sx={{ fontSize: "16px", fontWeight: 600 }}
        >
          {t(title)}
        </Typography>
      </MenuItem>
    )
  );
};
export default Item;
