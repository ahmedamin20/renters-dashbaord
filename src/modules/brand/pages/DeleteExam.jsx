import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, AlertTitle, useTheme } from "@mui/material";
import { tokens } from "../../../theme.js";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  getBrands,
} from "../../redux/ExamAssignment";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import { deleteBrand } from "../redux/brands.js";

const DeleteExam = ({ id, icon, sx, gradeId, classId, examId, subjectId, pageSize }) => {
  const { t } = useTranslation()
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
    await dispatch(deleteBrand({ id })).then(() => {
      dispatch(getBrands({ grade_id: gradeId, exam_id: examId, class_id: classId, subject_id: subjectId, pageSize }))
    })
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
        fullWidth={true}
        aria-labelledby="alert-dialog-title"
        dir={sidebarRTL?"rtl":"ltr"}
        aria-describedby="alert-dialog-description"
        fsx={{
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

export default DeleteExam;
