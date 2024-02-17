import { useRef } from "react";
import { Box, TextField } from "@mui/material";
import defaultAPI from "../../../../axiosInstance.js";
import { getworking_shiftsData } from "../../redux/working_shifts.js";
import Header from "../../../../components/Header.jsx";
import useMainHooks from "../../../../hooks/useMainHooks.jsx";
import DefaultButton from "../../../../components/defaultBtn.jsx";
import CustomLable from "../../../../components/CustomLable.jsx";
const AddWorkingShift = () => {
  const formRef = useRef();
  const { t, sidebarRTL, navigate, dispatch, isLoading, setIsLoading } =
    useMainHooks();
  const handleApiCall = async () => {
    setIsLoading(true);

    const apiUrl = `/admin/working_shifts`;

    const data = {
      name: formRef.current["name"].value,
      starts_at: formRef.current["starts_at"].value,
      ends_at: formRef.current["ends_at"].value,
      rest_hours: formRef.current["rest_hours"].value,
    };
    await defaultAPI
      .post(apiUrl, data)
      .then((res) => {
        if (res.status == 201) {
          dispatch(getworking_shiftsData({ pageSize: 10 }));
          navigate(-1, { replace: true });
          setIsLoading(false);
        }
      })
      .catch(() => setIsLoading(false));
  };

  return (
    <Box m={"20px"}>
      <Header title={t("working shifts")} />
      <form ref={formRef}>
        <Box
          fullWidth
          dir={sidebarRTL ? "rtl" : "ltr"}
          display="flex"
          flexDirection="column"
          sx={{
            margin: "1rem 0",
          }}
        >
          <CustomLable title={"name"} />

          <TextField type="text" name="name" />

          <CustomLable title={"starts_at"} />

          <TextField type="time" name="starts_at" />

          <CustomLable title={"ends_at"} />

          <TextField type="time" name="ends_at" />

          <CustomLable title={"rest_hours"} />

          <TextField type="number" name="rest_hours" inputProps={{ min: 0 }} />
        </Box>
        <DefaultButton
          text={"Add"}
          handleClick={handleApiCall}
          fullWidth={true}
          disabled={isLoading}
        />
      </form>
    </Box>
  );
};

export default AddWorkingShift;
