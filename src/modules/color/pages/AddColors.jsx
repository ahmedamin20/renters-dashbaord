import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme.js";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import DefaultButton from "./defaultBtn.jsx";
import ColorInput from "./colorInput.jsx";
import { addColors, getColors } from "../redux/colors.js";
import { StatuseCode } from "../../../statuseCodes.js";
import CustomDialogActions from "../../../components/DialogActions/DialogActions.jsx";

const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),
});

const AddColors = ({ icon, pageSize, show }) => {
  const { t } = useTranslation();
  const [colorValue, setColorValue] = useState("");
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { sidebarRTL } = useSidebarContext();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      code: colorValue,
    },
    validationSchema,
    onSubmit: async (values) => handleSubmit(values),
  });
  const handleSuccessClose = () => {
    dispatch(getColors({ pageSize }));
    setOpen(false);
    formik.resetForm();
  };
  const handleSubmit = async (values) => {
    setLoading(true);
    const data = {
      name: values.name,
      code: values.code,
    };
    try {
      await dispatch(addColors(data)).then((res) => {
        res.payload.code === StatuseCode.CREATED && handleSuccessClose();
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
    setLoading(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
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
        onClose={() => setOpen(false)}
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
          <ColorInput
            setValueFeild={formik.setFieldValue}
            setColorValue={setColorValue}
          />
        </DialogContent>
        <DialogActions>
          <CustomDialogActions
            onClickAction={() => {
              handleSubmit(formik.values);
            }}
            disabled={loading}
            text={!loading ? "add" : "loading"}
            loading={loading}
            handleClose={handleSuccessClose}
            formik={formik}
          />

        
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddColors;
