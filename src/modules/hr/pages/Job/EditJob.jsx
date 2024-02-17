import { useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";

import { useSelector } from "react-redux";
import { editJob, getJobData } from "../../redux/Job.js";
import Header from "../../../../components/Header.jsx";
import DefaultButton from "../../../../components/defaultBtn.jsx";
import useMainHooks from "../../../../hooks/useMainHooks.jsx";
import CustomSelectMenu from "../../../../components/CustomSelect/CustomSelect.jsx";
import { getDepartmentsMenu } from "../../../../redux/select_menus.js";
import { useParams } from "react-router-dom";

const EditJob = () => {
  const department = useSelector((state) => state.selectMenu.MyDepartmentmenu);
  let data = useSelector((state) => state.Job.JobData.data || []);
  const { id } = useParams();
  data = data.find((item) => item.id == id);
  const { navigate, t, sidebarRTL, dispatch, isLoading, setIsLoading } =
    useMainHooks();
  const [formData, setFormData] = useState({
    id: data?.id,
    name: data?.name,
    department_id: data?.department.id,
  });
  useEffect(() => {
    dispatch(getDepartmentsMenu());
  }, [dispatch]);
  console.log(data);
  const handleApiCall = async () => {
    const info = {
      values: formData,
      name: formData.name,
      department_id: formData.department_id,
      id: formData.id,
    };
    setIsLoading(true);
    await dispatch(editJob(info)).then(
      (res) =>
        res.payload.code === 200 &&
        dispatch(getJobData({ pageSize: 10 })).then(() => {
          navigate(-1, { replace: true });
          setIsLoading(false);
        })
        
    ).catch(()=> setIsLoading(false))
    setIsLoading(false);
  };
  const handleBrandChange = (value) => {
    console.log(value);
    setFormData({ ...formData, department_id: value?.id });
  };
  return (
    <Box m={"20px"}>
      <Header title={t("Edit")} />
      <CustomSelectMenu
        lable={"department"}
        options={department}
        defaultData={data?.department?.id}
        onChange={handleBrandChange}
      />
      <Box
        fullWidth
        dir={sidebarRTL ? "rtl" : "ltr"}
        display="flex"
        flexDirection="column"
        sx={{
          margin: "1rem 0",
        }}
      >
        <label
          style={{
            fontSize: "18px",
            marginBottom: ".5rem",
            fontWeight: "bold",
          }}
        >
          {t("name")}
        </label>
        <TextField
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </Box>

      <DefaultButton
        fullWidth={true}
        disabled={isLoading}
        text={t("Edit")}
        handleClick={() => handleApiCall()}
      />
    </Box>
  );
};

export default EditJob;
