import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useDispatch, useSelector } from 'react-redux';
import { getRoles } from '../../modules/role/redux/responsibility.js';
import { Box, FormControl, Select } from '@mui/material';
import { useSidebarContext } from '../global/sidebar/sidebarContext';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

// const StyledMenu = styled((props) => (
//   <Menu
//     elevation={0}
//     anchorOrigin={{
//       vertical: "bottom",
//       horizontal: "right",
//     }}
//     transformOrigin={{
//       vertical: "top",
//       horizontal: "right",
//     }}
//     {...props}
//   />
// ))(({ theme }) => ({
//   "& .MuiPaper-root": {
//     borderRadius: 6,
//     marginTop: theme.spacing(1),
//     minWidth: 180,
//     color:
//       theme.palette.mode === "light"
//         ? "rgb(55, 65, 81)"
//         : theme.palette.grey[300],
//     boxShadow:
//       "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
//     "& .MuiMenu-list": {
//       padding: "4px 0",
//     },
//     "& .MuiMenuItem-root": {
//       "& .MuiSvgIcon-root": {
//         fontSize: 18,
//         color: theme.palette.text.secondary,
//         marginRight: theme.spacing(1.5),
//       },
//       "&:active": {
//         backgroundColor: alpha(
//           theme.palette.primary.main,
//           theme.palette.action.selectedOpacity
//         ),
//       },
//     },
//   },
// }));
const DropDownRolesEdit = ({ onSelect, formik, oldRole }) => {
  const { t } = useTranslation()
  const roles = useSelector((state) => state.roles.getRoles.data) || [];

  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = async (event) => {
    setAnchorEl(event.currentTarget);

  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    dispatch(getRoles());
  }, [])
  // Update selected role in Formik state using the provided formik prop
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    formik.setFieldValue("role", selectedValue); // Update 'role' field in Formik
    setAnchorEl(null); // Close the menu
  };

  const { sidebarRTL } = useSidebarContext();
  console.log(oldRole.name)
  return (
  
    <FormControl variant="outlined"
      dir={sidebarRTL ? "rtl" : "ltr"}
      sx={{ gridColumn: "span 4", direction: sidebarRTL ? "rtl" : "ltr" }}
      inputProps={{
        style: { direction: sidebarRTL ? "rtl" : "ltr", fontSize: "18px", fontWeight: "bold" },
      }}
    >
      <label style={{ fontWeight: "bold", fontSize: "22px", margin: ".5rem" }}>{t("Role")}</label>
      <Select
        fullWidth
        variant="outlined"
        dir={sidebarRTL ? "rtl" : "ltr"}
        onChange={(e) => handleSelectChange(e)}
        value={oldRole.id}
        sx={{ gridColumn: "span 4", direction: sidebarRTL ? "rtl" : "ltr" }}
        inputProps={{
          style: { direction: sidebarRTL ? "rtl" : "ltr", fontSize: "18px", fontWeight: "bold" },
        }}
      >
        {roles.length > 0 && roles.map((option) => (
          <MenuItem dir={sidebarRTL ? "rtl" : "ltr"} key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

  );
};

export default DropDownRolesEdit;
