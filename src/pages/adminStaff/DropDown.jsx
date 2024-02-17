import React, { useState, useEffect } from 'react';
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
import { t } from 'i18next';

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
//     "& .MuiButton-root": {
//       width: "30rem !important",
//     }
//   },
// }));

const DropDownRoles = ({ onSelect }) => {
  const roles = useSelector((state) => state.roles.getRoles.data) || [];
  const dispatch = useDispatch();
  console.log(roles)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = async (event) => {
    setAnchorEl(event.currentTarget);
    await dispatch(getRoles());
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [selectedRole_ID, setselectedRole_ID] = useState();
  const [selectedRole_String, setselectedRole_String] = useState();
  const handleSelectChange = (event, name) => {
    const selectedValue = event.target.value;
    setselectedRole_ID(selectedValue);
    setselectedRole_String(name);
    // Call the prop function passed from Form.jsx with the selected value
    onSelect(selectedValue);
    setAnchorEl(null)
  };
  useEffect(() => {
    dispatch(getRoles())
  }, [dispatch]);

  const { sidebarRTL } = useSidebarContext();

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
        value={selectedRole_ID}
        sx={{ gridColumn: "span 4", direction: sidebarRTL ? "rtl" : "ltr"}}
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

export default DropDownRoles;
