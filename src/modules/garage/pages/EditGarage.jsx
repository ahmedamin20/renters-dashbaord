import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import {
  editGarage,
  getEmployeeMenu,
  getGarages,
  getOneGarage,
} from "../redux/garages.js";
import CustomMultiSelectMenu from "../../../components/CustomMultiSelectMenu/CustomMultiSelectMenu.jsx";
import CustomSelectMenu from "../../../components/CustomSelect/CustomSelect.jsx";
import { StatuseCode } from "../../../statuseCodes.js";
import { Box } from "@mui/material";
import CustomLable from "../../../components/CustomLable.jsx";
import { CustomFormikTextFeild } from "../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import { useFormik } from "formik";
import DefaultButton from "../../../components/defaultBtn.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";

const EditGarage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const oneGarageData = useSelector((state) => state.garages.oneGarage.data);
  const { t } = useTranslation();
  const { sidebarRTL } = useSidebarContext();
  const dispatch = useDispatch();
  const employeedata =
    useSelector((state) => state.garages.employeeMenu.data) || [];
  const oneGarageRef = useRef(true);
  useEffect(() => {
    dispatch(getOneGarage(id));
  }, [dispatch, id, oneGarageRef]);

  const EmpMenuRef = useRef(true);
  useEffect(() => {
    if (oneGarageData?.manager_id) {
      dispatch(getEmployeeMenu({ managerId: oneGarageData?.manager_id || "" }));
    }
  }, [dispatch, EmpMenuRef, oneGarageData]);

  const formik = useFormik({
    initialValues: {
      name: oneGarageData?.name,
      employees: oneGarageData?.garage_employees,
      manager_id:
        oneGarageData?.manager_id && parseInt(oneGarageData?.manager_id),
      address: oneGarageData?.address,
      phone: oneGarageData?.phone ? parseInt(oneGarageData?.phone) : null,
    },
    enableReinitialize: true,
    onSubmit: async (values) => handleSubmit(values),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    const info = {
      pageSize: 10,
      id: id,
      values: {
        ...values,
      },
    };
    try{

      await dispatch(editGarage(info)).then((res) => {
        if (res.payload.code === StatuseCode.OK) {
          dispatch(getGarages(info));
          navigate(-1, { replace: true });
        }
        setLoading(false);
      });
      }
    catch(err){
      setLoading(false);
    }
  };

  const handleSelectManager = (selectedOptions) => {
    formik.setFieldValue("manager_id", selectedOptions?.id);
  };
  const handleSelect = (selectedOptions) => {
    const selectedIds = selectedOptions.map((option) => option.id);
    formik.setFieldValue("employees", selectedIds);
  };

  const textFieldTest = [
    {
      name: "name",
      value: formik.values.name,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: "name",
      error: !!formik.touched.name && !!formik.errors.name,
      helperText: formik.touched.name && formik.errors.name,
    },
    {
      name: "phone",
      value: formik.values.phone,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: "phone",
      error: !!formik.touched.phone && !!formik.errors.phone,
      helperText: formik.touched.phone && formik.errors.phone,
    },
    {
      name: "address",
      value: formik.values.address,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: "address",
      error: !!formik.touched.address && !!formik.errors.address,
      helperText: formik.touched.address && formik.errors.address,
    },
  ];
  console.log(oneGarageData?.garage_employees)
  return (
    <div style={{ margin: "20px" }}>
      <Box dir={sidebarRTL ? "rtl" : "ltr"}>
        {textFieldTest.map((item, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <CustomLable title={t(item.name)} />
            <CustomFormikTextFeild
              placeholder={item.title}
              onChange={item.handleChange}
              helperText={item.helperText}
              error={item.error}
              onBlur={item.onBlur}
              fullWidth={true}
              value={item.value}
              name={item.name}
            />
          </div>
        ))}
        <CustomSelectMenu
          lable="select_manager"
          defaultData={oneGarageData?.manager_id}
          options={employeedata}
          onChange={handleSelectManager}
        />
        <CustomMultiSelectMenu
          lable="select_employee"
          defaultData={oneGarageData?.garage_employees}
          options={employeedata}
          onChange={handleSelect}
        />
      </Box>
      <DefaultButton
        text={loading ? "loading" : "Edit"}
        disabled={loading}
        fullWidth={true}
        handleClick={()=>{
          handleSubmit(formik.values)
        }}
      />
    </div>
  );
};

export default EditGarage;
