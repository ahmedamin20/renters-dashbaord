import { Box, Dialog, DialogContent } from "@mui/material";
import useMainHooks from "../../../hooks/useMainHooks";
import { PropTypes } from "prop-types";
import CustomDialogActions from "../../../components/DialogActions/DialogActions";
import { useFormik } from "formik";
import { CustomFormikTextFeild } from "../../../components/CustomFormikTextFeild/customFormikTextFeild";
import { useState } from "react";
import { editBudget, getBudget } from "../redux/employeePayment";
import EditButton from "../../../components/editButton";

const SafeBudget = ({ safeBudget }) => {
  const { dispatch, sidebarRTL, t } = useMainHooks();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      amount: safeBudget?.amount,
    },
    enableReinitialize: true,
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = (values) => {
    dispatch(editBudget(values))
      .unwrap()
      .then(() => {
        handleClose();
      });
  };
  const handleClickOpen = () => {
    setLoading(true);
    dispatch(getBudget()).then(() => {
      setLoading(false);
      setOpen(true);
    });
  };
  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
    dispatch(getBudget());
  };
  return (
    <Box>
      <EditButton
        disabled={loading}
        text={"theSafe"}
        onClick={handleClickOpen}
      />

      <Dialog
        sx={{
          width: { xs: "100%", md: "50%" },
          margin: "auto",
          padding: "0",
        }}
        open={open}
        onClose={handleClose}
      >
        <DialogContent dir={sidebarRTL ? "rtl" : "ltr"}>
          <form onSubmit={formik.handleSubmit} dir={sidebarRTL ? "ltr" : "rtl"}>
            <Box sx={{ mb: "1rem" }} dir={sidebarRTL ? "rtl" : "ltr"}>
              {/* <Switch checked={monyIn} onChange={() => setMonyIn(!monyIn)} /> */}
              <CustomFormikTextFeild
                title="amount"
                fullWidth={true}
                required={true}
                placeholder={t("amount")}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.amount}
                name="amount"
                error={!!formik.touched.amount && !!formik.errors.amount}
                helperText={formik.touched.amount && formik.errors.amount}
              />
            </Box>
            <CustomDialogActions
              onClickAction={formik.handleSubmit}
              onClick={handleClose}
              text={"edit"}
            />
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
SafeBudget.propTypes = {
  safeBudget: PropTypes.number,
};
export default SafeBudget;
