import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, AlertTitle, useTheme } from "@mui/material";
import { tokens } from "../../../theme.js";
import defaultAPI from "../../../axiosInstance.js";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { getClasses } from "../../../redux/classes.js";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";

const RemoveClassBtn = ({ id, icon, sx, pageSize }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { sidebarRTL } = useSidebarContext();

  
  const info = {
    pageSize,
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApiCall = async () => {
    const apiUrl = `/classes/${id}`;
    try {
      await defaultAPI
        .delete(apiUrl)
        .then(() => {
          dispatch(getClasses(info));
        });
    } catch (error) {
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={sx}
        endIcon={icon}
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
        sx={{
          width: { xs: "100%", md: "50%" },
          margin: "auto",
          padding: "0",
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold", fontSize: "22px" }} id="alert-dialog-title">
          <Alert severity="warning" sx={{ fontSize: "20px" }}>
            <AlertTitle sx={{ fontSize: "20px" }}>
              {t("Are you Sure?")}
            </AlertTitle>
            <p sx={{ fontSize: "14px" }}>
              {t("this Will be Removed")}
            </p>
          </Alert>
        </DialogTitle>
        <DialogActions dir={sidebarRTL?"rtl":"ltr"} sx={{ margin: "1rem auto",dispaly:"flex", justifyContent:"space-evenly",width:"50%" }}>
        <Button
            variant="contained"
            sx={{ background: `${colors.redAccent[500]}` }}
            onClick={() => {
              handleApiCall();
            }}
            autoFocus
          >
            {t("Yes")}
          </Button>
          <Button variant="contained" onClick={handleClose}>
            {t("No")}
          </Button>
          
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RemoveClassBtn;
