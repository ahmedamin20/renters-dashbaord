import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, AlertTitle, Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../pages/global/sidebar/sidebarContext";
import { StatuseCode } from "../../statuseCodes";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const CustomDelete = (props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { sidebarRTL } = useSidebarContext();
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
    await dispatch(props.action(props.id)).then((res) => {
      let info = {};

      if (props.pageSize && props.id) {
        if (!props.info) {
          info = {
            pageSize: props.pageSize,
            handle: "",
          };
        } else {
          info = {
            ...props.info,
            handle: "",
          };
        }
      } else if (props.rerenderId && !props.pageSize) {
        info = { id: props.rerenderId, handle: "" };
      } else if (props.rerenderId && props.pageSize) {
        info = {
          id: props.rerenderId,
          pageSize: props.pageSize,
          handle: "",
        };
      }
      res.payload.code === StatuseCode.OK &&
        dispatch(props.rerenderAction(info));
    });
    setOpen(false);
  };

  return (
    <Box dir={sidebarRTL ? "rtl" : "ltr"}>
      <Button
        variant="contained"
        sx={{
          background: 'red',
        }}
        // endIcon={<DeleteForeverIcon />}
        disabled={!! props.disabled}
        onClick={handleClickOpen}
        dir="ltr"
      >
        {t("Remove")}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        sx={{
          width: { xs: "100%", md: "50%" },
          margin: "auto",
          padding: "0",
        }}
        dir={sidebarRTL ? "rtl" : "ltr"}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            fontSize: "22px",
          }}
          id="alert-dialog-title"
        >
          <Alert
            severity="warning"
            sx={{
              fontSize: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <AlertTitle sx={{ fontSize: "20px" }}>
              {t("Are you Sure?")}
            </AlertTitle>
            <p sx={{ fontSize: "14px" }}>{t("this Will be Removed")}</p>
          </Alert>
        </DialogTitle>
        <DialogActions
          sx={{
            margin: "1rem auto",
            dispaly: "flex",
            justifyContent: "space-evenly",
            width: "50%",
          }}
          dir={sidebarRTL?"rtl":"ltr"}
        >
          <Button
            variant="contained"
            sx={{ background: `${colors.redAccent[500]}` }}
            onClick={handleApiCall}
            autoFocus
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

export default CustomDelete;
