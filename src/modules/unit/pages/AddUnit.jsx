import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme.js";
import DefaultButton from "./defaultBtn.jsx";
import defaultAPI from "../../../axiosInstance.js";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import { getParentUnits } from "../redux/Units.js";

const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),
});

const AddUnit = ({ icon, pageSize, show }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { sidebarRTL } = useSidebarContext();

  const info = {
    pageSize,
  };

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await defaultAPI
          .post("/admin/units/parent_units", values)
          .then((res) => res.status === 201 && dispatch(getParentUnits(info)))
          .then(() => {
            setOpen(false);
            formik.resetForm();
          });
      } catch (error) {
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <DefaultButton  handleClick={handleClickOpen} text={t("Add")} />
      <Dialog
        fullWidth={true}
        sx={{ width: { xs: "100%", md: "50%" }, margin: "auto", padding: "0" }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle sx={{ fontWeight: "bold", fontSize: "22px" }} align={sidebarRTL ? "right" : "left"}>
          {t("AddUnit")}
        </DialogTitle>
        <DialogContent dir={sidebarRTL?"rtl":"ltr"}>
              <label style={{fontSize:"18px",fontWeight: "Bold"}}>{t("Name")}</label>
          <TextField
            autoFocus
            margin="dense"
            placeholder={t("Name")}
            type="text"
            fullWidth
            variant="outlined"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            dir={sidebarRTL ? "rtl" : "ltr"}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: colors.blueAccent[700],
              }
            }}
            inputProps={{
              style: { fontSize: "18px", fontWeight: "bold" }, // Adjust the font size here
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => setOpen(false)}
          >
            {t("Cancel")}
          </Button>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 15px",
            }}
            disabled={!formik.isValid || formik.isSubmitting}
            onClick={formik.handleSubmit}
          >
            {t("Add")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddUnit;
