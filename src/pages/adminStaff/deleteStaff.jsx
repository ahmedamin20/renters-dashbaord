import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, AlertTitle, Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useDispatch } from "react-redux";
import { deleteAdmin, stuffData } from "../../redux/stuff";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../global/sidebar/sidebarContext";

const RemoveStaffBtn = (props) => {
  const { sidebarRTL } = useSidebarContext();
  const { t } = useTranslation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleApiCall = async () => {
    try {
      let dataInfo = {
        pageSize: props.pageSize,
      };
      await dispatch(deleteAdmin(props.id));
      await dispatch(stuffData(dataInfo));
    } catch (error) {
    }
  };

  return (
    <Box m="20px">
      <Button
        variant="contained"
        sx={props.sx}
        endIcon={props.icon}
        onClick={handleClickOpen}
      >
        {t("Remove")}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        dir={sidebarRTL?"rtl":"ltr"}
      >
        <DialogTitle sx={{ fontWeight: "bold", fontSize: "22px" }} id="alert-dialog-title">
          <Alert severity="warning" sx={{ fontSize: "20px" }}>
            <AlertTitle sx={{ fontSize: "20px" }}>{t("Are you Sure?")}</AlertTitle>
            <p sx={{ fontSize: "14px" }}>
              {t("this Will be Removed")}
            </p>
          </Alert>
        </DialogTitle>
        <DialogActions sx={{ margin: "1rem auto",display:"flex",justifyContent:"space-between",width:"45%" }}>
        <Button
            variant="contained"
            sx={{ background: `${colors.redAccent[500]}` }}
            onClick={() => {
              handleApiCall();
              handleClose();
            }}
          >
            {t("Yes")}
          </Button>
          <Button variant="contained" onClick={handleClose}>
            {t("No")}
          </Button>
          
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RemoveStaffBtn;
