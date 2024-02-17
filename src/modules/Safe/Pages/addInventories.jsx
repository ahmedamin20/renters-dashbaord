import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { CustomFormikTextFeild } from "./../../../components/CustomFormikTextFeild/customFormikTextFeild";
import CustomLable from "../../../components/CustomLable.jsx";
import CustomDialogActions from "./../../../components/DialogActions/DialogActions";
import useMainHooks from "../../../hooks/useMainHooks.jsx";
import DefaultButton from "../../../components/defaultBtn.jsx";
import {
  addInventories,
  getBudget,
  getInventories,
} from "../redux/safe-slice.js";
import hasPermission from "../../../utils/haspermission.js";

const AddInventories = () => {
  const { sidebarRTL, dispatch, t, isLoading, setIsLoading } = useMainHooks();
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      description: "",
      initial_amount: "",
    },
    enableReinitialize: true,
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = (values) => {
    setIsLoading(true);
    dispatch(
      addInventories({
        values,
      })
    ).then(() => {
      dispatch(getInventories({ pageSize: 10 })).then(() => {
        setOpen(false);
        setIsLoading(false);
        dispatch(getBudget());
      }).catch(()=> setIsLoading(false));
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
    formik.resetForm();
  };

  const textField = [
    {
      name: "description",
      title: "description",
      value: formik.values.description,
      isMulti: true,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: "description",
      error: !!formik.touched.description && !!formik.errors.description,
      helperText: formik.touched.description && formik.errors.description,
    },
    {
      name: "initial_amount",
      title: "initial_amount",
      value: formik.values.initial_amount,
      isMulti: false,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: "initial_amount",
      error: !!formik.touched.initial_amount && !!formik.errors.initial_amount,
      helperText: formik.touched.initial_amount && formik.errors.initial_amount,
    },
  ];
  const safeData = useSelector((state) => state.safeSlice),
    budget = safeData.budget;
  return (
    <Box>
      <DefaultButton handleClick={handleClickOpen} text={t("ADD")} />
      <Dialog
        fullWidth={true}
        sx={{ width: { xs: "100%", md: "50%" }, margin: "auto", padding: "0" }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogContent dir={sidebarRTL ? "rtl" : "ltr"}>
          <span
            style={{
              fontSize: "35px",
              fontWeight: "bold",
              color: budget?.amount > "0" ? "green" : "red",
            }}
          >
            {hasPermission("show-budget") && t("amount")} = {budget?.amount}
          </span>
          <form onSubmit={formik.handleSubmit}>
            <div style={{ display: "flex", justifyContent: "center" }}></div>
            {textField.map((item, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <CustomLable title={item.title} />
                <CustomFormikTextFeild
                  placeholder={item.placeholder}
                  isMulti={item.isMulti}
                  onBlur={item.onBlur}
                  fullWidth={true}
                  value={item.value}
                  onChange={formik.handleChange}
                  helperText={item.helperText}
                  error={item.error}
                  name={item.name}
                />
              </div>
            ))}
            <CustomDialogActions
              disabled={isLoading}
              onClick={() => setOpen(false)}
              text={isLoading ? "loading" : "add"}
            />
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AddInventories;
