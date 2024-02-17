import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import defaultAPI from "../../../axiosInstance.js";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme.js";
import {  getSubUnits } from "../redux/Units.js";
import EditButton from "../../../components/editButton.jsx";
// import { useParams } from "react-router-dom";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  symbol: Yup.string().required("Name is required"),
});

const EditSubUnits = ({ icon, sx, id }) => {
    // const {parent_id} = useParams()
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = async () => {
    setOpen(true);
    const apiUrl = `/admin/units/sub_units/${id}`;
    try {
      const res = await defaultAPI.get(apiUrl);
      formik.setFieldValue("name", res.data.data.name);
      formik.setFieldValue("symbol", res.data.data.symbol);
    } catch (error) {}
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
        name: "",
        symbol: "",
        //parent_id:parent_id
    },
    validationSchema,
    onSubmit: (values) => handleSubmit(values),
  });

    const handleSubmit = async (values) => {
      const api = `/admin/units/sub_units/${id}`
      
    await defaultAPI
      .put(api, { name: values.name,symbol:values.symbol})
      .then((res) => {
        res.data.code === 200 && handleClose();
      })
      .then(() => {
        dispatch(getSubUnits());
      });
  };

  const { sidebarRTL } = useSidebarContext();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div>
      <EditButton onClick={handleClickOpen} text={'edit'} />
      
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
        sx={{
          width: { xs: "100%", md: "50%" },
          margin: "auto",
          padding: "0",
        }}
      >
        <DialogTitle
          sx={{ fontWeight: "bold", fontSize: "22px" }}
          align={sidebarRTL ? "right" : "left"}
        >
          {t("Edit")}
        </DialogTitle>
        <DialogContent dir={sidebarRTL ? "rtl" : "ltr"}>
          <label
            dir={sidebarRTL ? "rtl" : "ltr"}
            style={{ fontSize: "18px", fontWeight: "Bold" }}
          >
            {t("Name")}
          </label>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            placeholder={t("Name")}
            type="text"
            fullWidth
            variant="outlined"
            {...formik.getFieldProps("name")}
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
          <label
            dir={sidebarRTL ? "rtl" : "ltr"}
            style={{ fontSize: "18px", fontWeight: "Bold" }}
          >
            {t("symbol")}
          </label>
          <TextField
            autoFocus
            margin="dense"
            id="symbol"
            placeholder={t("symbol")}
            type="text"
            fullWidth
            variant="outlined"
            {...formik.getFieldProps("symbol")}
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
          <Button  sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              "&:hover": {
                color:'white',
              },
              padding: "10px 15px",
            }} variant="contained" onClick={handleClose}>
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
            variant="contained"
            onClick={formik.handleSubmit}
            disabled={formik.isSubmitting}
          >
            {t("Edit")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditSubUnits;
