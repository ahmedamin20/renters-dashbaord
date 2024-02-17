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
import { getSubUnits } from "../redux/Units.js";
import { useParams } from "react-router-dom";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  symbol: Yup.string().required("symbol is required"),
});

const AddSubUnit = ({ icon }) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { sidebarRTL } = useSidebarContext();

  const formik = useFormik({
    initialValues: {
      name: "",
      symbol: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const data = {
        ...values,
        parent_id: id,
      };
      try {
        await defaultAPI
          .post("/admin/units/sub_units", data)
          .then(
            (res) => res.status === 201 && dispatch(getSubUnits({ id: id }))
          )
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
      <DefaultButton handleClick={handleClickOpen} text={t("Add")} />
      <Dialog
        fullWidth={true}
        sx={{ width: { xs: "100%", md: "50%" }, margin: "auto", padding: "0" }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle
          sx={{ fontWeight: "bold", fontSize: "22px" }}
          align={sidebarRTL ? "right" : "left"}
        >
          {t("AddSubUnit")}
        </DialogTitle>
        <DialogContent dir={sidebarRTL ? "rtl" : "ltr"}>
          <label style={{ fontSize: "18px", fontWeight: "Bold" }}>
            {t("Name")}
          </label>
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
                },
            }}
            inputProps={{
              style: { fontSize: "18px", fontWeight: "bold" }, // Adjust the font size here
            }}
          />
          <label style={{ fontSize: "18px", fontWeight: "Bold" }}>
            {t("symbol")}
          </label>
          <TextField
            autoFocus
            margin="dense"
            placeholder={t("symbol")}
            type="text"
            fullWidth
            variant="outlined"
            id="symbol"
            name="symbol"
            value={formik.values.symbol}
            onChange={formik.handleChange}
            error={formik.touched.symbol && Boolean(formik.errors.symbol)}
            helperText={formik.touched.symbol && formik.errors.symbol}
            dir={sidebarRTL ? "rtl" : "ltr"}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: colors.blueAccent[700],
                },
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
              "&:hover": {
                color:'white',
              },
              padding: "10px 15px",
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
              "&:hover": {
                color:'white',
              },
              padding: "10px 15px",
            }}
            disabled={formik.isSubmitting}
            onClick={formik.handleSubmit}
            endIcon={icon}
          >
            {t("Add")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddSubUnit;
