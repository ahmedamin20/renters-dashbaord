import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomSelectMenu from "../../../components/CustomSelect/CustomSelect.jsx";
import { StatuseCode } from "../../../statuseCodes.js";
import { editVisit, getOneVisit, getVisits } from "../redux/visits.js";
import { useFormik } from "formik";
import { visitSchema } from "../../../utils/ValidationSchema.js";
import CustomLable from "../../../components/CustomLable.jsx";
import { CustomFormikTextFeild } from "../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import { useParams } from "react-router-dom";
import useMainHooks from "../../../hooks/useMainHooks.jsx";
import DefaultButton from "../../../components/defaultBtn.jsx";
import { Box } from '@mui/material';
import Header from "../../../components/Header.jsx";

const EditVisit = () => {
  const { id, selectedGarage } = useParams();
  const [loading, setLoading] = useState(false);
  const { t, dispatch, navigateBack } = useMainHooks();
  const [SelectedGarage, setSelectedGarage] = useState(null);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const VisitorsData =
    useSelector((state) => state.selectMenu.visitorsMenu.data) || [];
  const garageData =
    useSelector((state) => state.selectMenu.garagesMenu.data) || [];
  const oneVisitData =
    useSelector((state) => state.visits.oneVisitsData.data) || [];

  useEffect(() => {
    dispatch(getOneVisit({ visitId: id, id: selectedGarage }));
  }, [dispatch, id, selectedGarage]);
  const formik = useFormik({
    initialValues: {
      reason: oneVisitData?.reason,
      garage_id: oneVisitData?.garage_id,
      visitor_id: oneVisitData?.visitor_id,
    },
    enableReinitialize: true,
    validationSchema: visitSchema,
    onSubmit: (values) => handleSubmit(values),
  });
  const handleSubmit = async (values) => {
    console.log(values);
    setLoading(true);
    const data = {
      id: id,
      values: {
        visitor_id: selectedVisitor || values.visitId,
        garage_id: SelectedGarage || values.garage_id,
        reason: values.reason,
      },
    };
    console.log(data);
    await dispatch(editVisit(data)).then((res) => {
      res.payload.code === StatuseCode.OK &&
        dispatch(getVisits({ id: selectedGarage, pageSize: 10 })) &&
        navigateBack();
    });
    setLoading(false);
  };
  const handleSelectVisitor = (selectedOptions) => {
    setSelectedVisitor(selectedOptions?.id);
  };
  const handleSelectGarage = (selectedOptions) => {
    setSelectedGarage(selectedOptions?.id);
  };

  const textFieldTest = [
    {
      name: "reason",
      value: formik.values.reason,
      isMulti: true,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: "reason",
      error: !!formik.touched.reason && !!formik.errors.reason,
      helperText: formik.touched.reason && formik.errors.reason,
    },
  ];
  return (
    <Box m={'20px'}>
      <Header title={t("edit")} />
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
          lable="select_visitor"
          options={VisitorsData}
          placeholder={t("select_visitor")}
          onChange={handleSelectVisitor}
          value={selectedVisitor}
          defaultData={oneVisitData?.visitor_id}
        />
        <CustomSelectMenu
          lable="select_garage"
          options={garageData}
          placeholder={t("Select_garage")}
          value={SelectedGarage}
          onChange={handleSelectGarage}
          defaultData={oneVisitData?.garage_id}
        />
      </form>
      <DefaultButton
        fullWidth={true}
        text={loading ? "loading" : "edit"}
        handleClick={() => {
          handleSubmit(formik.values);
        }}
        disabled={loading}
      />
      {/* <CustomDialogActions
        text="edit"
        onClick={handleClose}
        disabled={loading}
        onClickAction={formik.handleSubmit}
      /> */}
    </Box>
  );
};

export default EditVisit;
