import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
// import DefaultButton from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import CustomSelectMenu from "../../../components/CustomSelect/CustomSelect.jsx";
import CustomDialogActions from "../../../components/DialogActions/DialogActions.jsx";
import { StatuseCode } from "../../../statuseCodes.js";
// import { addVisits, getVisits } from "../../redux/visits";
import { useFormik } from "formik";
import CustomLable from "../../../components/CustomLable.jsx";
import { CustomFormikTextFeild } from "../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import { getMyEmployeeMenu } from "../../../redux/select_menus.js";
import EditButton from "../../../components/editButton.jsx";
import { Box, useTheme } from "@mui/material";
import { followUpRepair, getCarFix } from "../redux/carFix.js";
import { tokens } from "../../../theme.js";
import { paySchema } from "../../../utils/ValidationSchema.js";

const FollowupRepair = ({ id, disabled, pageSize, garage_id }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { sidebarRTL } = useSidebarContext();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const loading = useSelector((state) => state.visits.loading);
  const dispatch = useDispatch();
  const myGarageEmployeesMenu =
    useSelector((state) => state.selectMenu.myEmployeesMenu.data) || [];
  const garagesMenu =
    useSelector((state) => state.selectMenu.garagesMenu.data) || [];
  const [selectedGarage, setSelectedGarage] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleClickOpen = () => {
    if (!myGarageEmployeesMenu.length && selectedGarage) {
      dispatch(getMyEmployeeMenu(selectedGarage));
    }
    setOpen(true);
  };

  const handleGarageChange = (value) => {
    setSelectedGarage(value?.id);
  };

  const formik = useFormik({
    initialValues: {
      paid_amount: "",
    },
    enableReinitialize: true,
    validationSchema: paySchema,
    onSubmit: (values) => handleSubmit(values),
  });
  const handleSubmit = async (values) => {
    const data = {
      id: id,
      values: {
        recipient_employee: selectedEmployee,
        paid_amount: values.paid_amount,
        garage_id: garage_id || selectedGarage,
      },
    };
    await dispatch(followUpRepair(data)).then((res) => {
      res.payload.code === StatuseCode.CREATED
        ? dispatch(getCarFix({ id: garage_id, pageSize: pageSize })) &&
          handleClose()
        : setOpen(true);
    });
  };
  const handleSelectEmployee = (selectedOptions) => {
    setSelectedEmployee(selectedOptions?.id);
  };

  const handleClose = () => {
    setSelectedEmployee(null);
    formik.resetForm();
    setOpen(false);
  };
  const textFieldTest = [
    {
      name: "paid_amount",
      value: formik.values.paid_amount,
      isMulti: true,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: "paid_amount",
      error: !!formik.touched.paid_amount && !!formik.errors.paid_amount,
      helperText: formik.touched.paid_amount && formik.errors.paid_amount,
    },
  ];
  return (
    <Box>
      <EditButton
        disabled={disabled}
        backGround={colors.primary[600]}
        onClick={handleClickOpen}
        text={t("follow_up_repair")}
      />
      <Dialog
        fullWidth={true}
        sx={{ width: { xs: "100%", md: "50%" }, margin: "auto", padding: "0" }}
        open={open}
        onClose={() => handleClose}
      >
        <DialogContent
          dir={sidebarRTL ? "rtl" : "ltr"}
          sx={{ height: "400px" }}
        >
          <form onSubmit={formik.handleSubmit}>
            {textFieldTest.map((item, index) => (
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

            <CustomSelectMenu
              isDisabled={selectedGarage === null}
              lable="Select_garage"
              options={garagesMenu}
              placeholder={t("Select_garage")}
              onChange={handleGarageChange}
            />

            <CustomSelectMenu
              lable="Select_employee"
              options={myGarageEmployeesMenu}
              placeholder={t("Select_employee")}
              onChange={handleSelectEmployee}
            />
          </form>
        </DialogContent>
        <CustomDialogActions
          text="add"
          onClick={handleClose}
          disabled={loading}
          onClickAction={formik.handleSubmit}
        />
      </Dialog>
    </Box>
  );
};

export default FollowupRepair;
