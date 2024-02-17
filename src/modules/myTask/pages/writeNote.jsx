import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import CustomLable from "../../../components/CustomLable.jsx";
import { CustomFormikTextFeild } from '../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx';
import { useFormik } from "formik";
import CustomDialogActions from '../../../components/DialogActions/DialogActions.jsx';
import { noteSchema } from "../../../utils/ValidationSchema.js";
import { useDispatch } from "react-redux";
import { writeNote } from "../../task/redux/tasks.js";

const WriteNote = (props) => {
  const { sidebarRTL } = useSidebarContext();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()

    const formik = useFormik({
    initialValues: {
    description:""
    },
    enableReinitialize: true,
    validationSchema:noteSchema,
    onSubmit:values=>handleSubmit(values)
})
  const handleClickOpen = async () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false)
    formik.resetForm()
  }
  const handleSubmit = async (values) => {
    const info = {
      id: props.id,
      ...values
    }
    dispatch(writeNote(info))
  };
  return (
    <Box>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={props.sx}
        endIcon={props.icon}
      >
        {t("write_note")}
      </Button>
      <Dialog
        fullWidth={true}
        sx={{ width: { xs: "100%", md: "50%" }, margin: "auto", padding: "0" }}
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
          <form onSubmit={formik.handleSubmit}></form>
          <Box
            fullWidth
            dir={sidebarRTL ? "rtl" : "ltr"}
            display="flex"
            flexDirection="column"
            sx={{
              margin: "1rem 0",
            }}
          >
            <CustomLable title="description" />
            <CustomFormikTextFeild
              name="description" onBlur={formik.handleBlur} isMulti={true}
              placeholder="description" onChange={formik.handleChange}
              value={formik.values.description}
              error={!!formik.touched.description && !!formik.errors.description}
              helperText={formik.touched.description && formik.errors.description}
            />
          </Box>
        </DialogContent>
        <CustomDialogActions text="add" onClickAction={formik.handleSubmit} onClick={handleClose} />
      </Dialog>
    </Box>
  );
};

export default WriteNote;
