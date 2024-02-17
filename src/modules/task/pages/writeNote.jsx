import  { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Box } from "@mui/material";
import CustomLable from "../../../components/CustomLable.jsx";
import { CustomFormikTextFeild } from '../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx';
import { useFormik } from "formik";
import CustomDialogActions from '../../../components/DialogActions/DialogActions.jsx';
import { noteSchema } from "../../../utils/ValidationSchema.js";
import { writeNote } from "../redux/tasks.js";
import useMainHooks from "../../../hooks/useMainHooks.jsx";

const WriteNote = (props) => {
  const [open, setOpen] = useState(false);
  const {t,dispatch,sidebarRTL,isLoading,setIsLoading} = useMainHooks()
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
    setIsLoading(false)
  }
  const handleSubmit = async (values) => {
    const info = {
      id: props.id,
      ...values
    }
    setIsLoading(true)
    dispatch(writeNote(info)).then(()=>{
      setIsLoading(false)
    }).catch(()=>{setIsLoading(false)})
  };
  return (
    <Box>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{
          background:'darkslateblue'
        }}
     
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
        <CustomDialogActions text="add" disabled={isLoading} onClickAction={formik.handleSubmit} onClick={handleClose} />
      </Dialog>
    </Box>
  );
};

export default WriteNote;
