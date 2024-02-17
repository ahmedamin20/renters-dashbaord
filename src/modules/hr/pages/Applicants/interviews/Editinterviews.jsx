import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Box } from "@mui/material";
// import { tokens } from "../../../../../theme.js";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../../../../pages/global/sidebar/sidebarContext.js";
import { useState } from "react";
import { useFormik } from "formik";
import { CustomFormikTextFeild } from "../../../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import CustomLable from "../../../../../components/CustomLable.jsx";
import CustomDateTime from "../../../../../components/CustomDateTime/CustomDateTime.jsx";
import CustomSelectMenu from "../../../../../components/CustomSelect/CustomSelect.jsx";
import { useDispatch, useSelector } from "react-redux";
import CustomDialogActions from "../../../../../components/DialogActions/DialogActions.jsx";
import {
  editInterviews,
  getinterviewsData,
} from "../../../redux/interviews.js";
import { StatuseCode } from "../../../../../statuseCodes.js";
import EditButton from "./../../../../../components/editButton";
import PropTypes from "prop-types";

const EditInterviews = ({ applicant_id, name, id, starts_at, interviewer }) => {
  const dispatch = useDispatch();
  const { sidebarRTL } = useSidebarContext();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const employeeMenu = useSelector(
    (state) => state.selectMenu.MyManagermenu?.data
  );
  const formik = useFormik({
    initialValues: {
      name: name,
      starts_at: starts_at,
      interviewer_id: JSON.parse(interviewer),
      applicant_id: JSON.parse(applicant_id),
    },
    enableReinitialize: true,
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = (values) => {
    dispatch(editInterviews({ id: id, values: values })).then((res) => {
      if (res.payload.code === StatuseCode.OK) {
        dispatch(getinterviewsData({ pageSize: 10, id: applicant_id })).then(
          () => handleClose()
        );
      }
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };
  const textFieldArray = [
    {
      name: "name",
      value: formik.values.name,
      isMulti: true,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: "name",
      error: !!formik.touched.name && !!formik.errors.name,
      helperText: formik.touched.name && formik.errors.name,
    },
  ];
  const handleEmployeeChange = (item) => {
    formik.setFieldValue("interviewer_id", item?.id);
  };
  const handleDateChange = (date) => {
    formik.setFieldValue("starts_at", date?.format("YYYY-MM-DD HH:mm"));
  };
  return (
    <Box>
      <EditButton onClick={handleClickOpen} text={t("edit")} />
      <Dialog
        fullWidth={true}
        sx={{ width: { xs: "100%", md: "50%" }, margin: "auto", padding: "0" }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogContent>
          <Box
            fullWidth
            dir={sidebarRTL ? "rtl" : "ltr"}
            display="flex"
            flexDirection="column"
            sx={{
              margin: "1rem 0",
            }}
          >
            {textFieldArray.map((item, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <CustomLable title={item.name} />
                <CustomFormikTextFeild
                  placeholder={item.name}
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
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CustomLable title="starts_at" />
              <CustomDateTime
                defaultData={formik.values.starts_at}
                onChange={handleDateChange}
              />
            </Box>
            <Box sx={{ width: "100%" }}>
              <CustomSelectMenu
                defaultData={formik.values.interviewer_id}
                lable="select_interviewer"
                options={employeeMenu}
                onChange={handleEmployeeChange}
                name="starts_at"
              />
            </Box>
          </Box>
        </DialogContent>
        <CustomDialogActions
          onClickAction={formik.handleSubmit}
          text="edit"
          onClick={handleClose}
        />
      </Dialog>
    </Box>
  );
};
EditInterviews.propTypes = {
  applicant_id: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.any.isRequired,
  starts_at: PropTypes.string.isRequired,
  interviewer: PropTypes.any.isRequired,
};
export default EditInterviews;
