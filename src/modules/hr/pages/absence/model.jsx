import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import CustomDialogActions from "../../../../components/DialogActions/DialogActions.jsx";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import CustomTime from "../../../../components/CustomTimePiker/customTime.jsx";
import { t } from "i18next";
import { CustomFormikTextFeild } from "../../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import { Box } from "@mui/material";
import CustomSelectMenu from "../../../../components/CustomSelect/CustomSelect.jsx";
import { absenceTypes, absenceTypesEnum } from "./absenceTypes.js";
import { editAbsence, getAbsence } from "../../redux/absence.js";
import { StatuseCode } from "../../../../statuseCodes.js";
import CustomLable from "../../../../components/CustomLable.jsx";
import useMainHooks from "../../../../hooks/useMainHooks.jsx";

export default function AbsenceDialog({ handleOpen, open, id, date }) {
  const oneData =
    useSelector((state) => state.absence.oneAbsenceInfo.data) || [];
  const { sidebarRTL, isLoading, setIsLoading, dispatch } = useMainHooks();
  const formik = useFormik({
    initialValues: {
      attended_at: oneData?.attended_at || "",
      departure_at: oneData?.departure_at || "",
      rest_minutes: oneData?.rest_minutes || "",
      type: oneData?.type || "",
      created_at: date,
    },
    enableReinitialize: true,
    onSubmit: (values) => handleSubmit(values),
  });
  const handleSubmit = (values) => {
    setIsLoading(true);
    if (values.type == "absence") {
      values.rest_minutes = "";
    }
    dispatch(editAbsence({ id: id, values: { ...values } }))
      .then((res) => {
        if (res.payload.code === StatuseCode.OK) {
          handleOpen();
          setIsLoading(false);
          formik.resetForm();
          dispatch(getAbsence({ pageSize: 10 }));
        }
      })
      .catch(() => setIsLoading(false));
  };

  const handleTimeAttendedChange = (event) => {
    formik.setFieldValue("attended_at", event?.format("HH:mm"));
    console.log(event?.format("HH:mm"));
  };
  const handleTimeDepartureChange = (event) => {
    formik.setFieldValue("departure_at", event?.format("HH:mm"));
  };
  const textFields = [
    {
      name: "rest_minutes",
      value: formik.values.rest_minutes,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      disabled: formik.values.type == "absence" ? true : false,
      placeholder: t("rest_minutes"),
      error: !!formik.touched.rest_minutes && !!formik.errors.rest_minutes,
      helperText: formik.touched.rest_minutes && formik.errors.rest_minutes,
    },
  ];
  const handleTypeChange = (item) => {
    console.log(item);
    formik.setFieldValue("type", item?.id);
  };

  const disableTimePicker = ![
    absenceTypesEnum.ATTENDED,
    absenceTypesEnum.HOLIDAY,
    absenceTypesEnum.OCCASION,
  ].includes(formik.values.type);
  return (
    <Dialog
      sx={{
        "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
          width: `80%`,
        }
      }}
      open={open}
    >
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <CustomSelectMenu
            lable="type"
            // name="type"
            defaultData={formik.values.type}
            options={absenceTypes}
            onChange={handleTypeChange}
          />
          <CustomTime
            disabled={disableTimePicker}
            title="starts_at"
            defaultData={formik.values.attended_at}
            onChange={handleTimeAttendedChange}
          />
          <CustomTime
            disabled={disableTimePicker}
            title="ends_at"
            defaultData={formik.values.departure_at}
            onChange={handleTimeDepartureChange}
          />
          {textFields.map((item, index) => (
            <Box
              key={index}
              dir={sidebarRTL ? "rtl" : "ltr"}
              display="grid"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            >
              <CustomLable title={item.placeholder} />
              <CustomFormikTextFeild
                placeholder={t(item.placeholder)}
                onBlur={item.onBlur}
                onChange={item.handleChange}
                value={item.value}
                name={item.name}
                error={item.error}
                disabled={item.disabled}
                helperText={item.helperText}
              />
            </Box>
          ))}
        </form>
      </DialogContent>
      <CustomDialogActions
        onClickAction={formik.handleSubmit}
        text="edit"
        disabled={isLoading}
        onClick={handleOpen}
      />
    </Dialog>
  );
}
