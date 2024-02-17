import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DefaultButton from "./defaultBtn.jsx";
import CustomDialogActions from "../../../components/DialogActions/DialogActions.jsx";
import { addTypeExpensess, getTypeExpensess } from "../redux/TypeExpensess.js";
import { StatuseCode } from "../../../statuseCodes.js";
import useMainHooks from "../../../hooks/useMainHooks.jsx";

const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),
});

const AddTypeExpensess = ({ icon, pageSize, show }) => {
  const [open, setOpen] = useState(false);
  const {t,colors,dispatch,sidebarRTL,isLoading, setIsLoading}= useMainHooks()

  const info = {
    pageSize,
  };

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    onSubmit: async (values) => {
    setIsLoading(true);

      await dispatch(addTypeExpensess(values)).then((res) =>
        res.payload.code === StatuseCode.CREATED
          ? dispatch(getTypeExpensess(info)) && handleClose()
          : setOpen(true)
      ).catch(()=>{
    setIsLoading(false);

      })
    },
  });
  const handleClickOpen = () => {
    setOpen(true);
    setIsLoading(false);

  };
  const handleClose = () => {
    setOpen(false);
    setIsLoading(false);
    formik.resetForm();
  };
  return (
    <div>
      <DefaultButton
        show={show}
        handleClick={handleClickOpen}
        text={t("Add")}
      />
      <Dialog
        fullWidth={true}
        sx={{ width: { xs: "100%", md: "50%" }, margin: "auto", padding: "0" }}
        open={open}
        onClose={handleClose}
      >
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
        </DialogContent>
        <CustomDialogActions
          onClick={handleClose}
          disabled={isLoading}
          onClickAction={formik.handleSubmit}
          text={isLoading ? t("Loading") : t("Add")}
        />
      </Dialog>
    </div>
  );
};
export default AddTypeExpensess;
