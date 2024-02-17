import { useEffect, useRef } from "react";

import { Box, TextField, Select, MenuItem } from "@mui/material";
import defaultAPI from "../../../../axiosInstance.js";
import { useSelector } from "react-redux";
import { getJob_announcementsData } from "../../redux/Job_announcements.js";
import CustomDateTime from "../../../../components/CustomDateTime/CustomDateTime.jsx";
import { getJobsMenu } from "../../../../redux/select_menus.js";
import Header from "../../../../components/Header.jsx";
import useMainHooks from "../../../../hooks/useMainHooks.jsx";
import DefaultButton from "../../../../components/defaultBtn.jsx";
import CustomLable from "./../../../../components/CustomLable";

const AddJobAnoucementPage = () => {
  const jobs = useSelector((state) => state.selectMenu.JobsMenu) || [];
  const { t, dispatch, isLoading, setIsLoading, sidebarRTL, navigate } =
    useMainHooks();
  const formRef = useRef();
  const handleApiCall = async () => {
    setIsLoading(true);
    const apiUrl = `/admin/job_announcements`;

    const data = {
      starts_at: formRef.current["starts_at"].value.replace("T", " "),
      ends_at: formRef.current["ends_at"].value.replace("T", " "),
      experience_years: formRef.current["experience_years"].value,
      requirements: formRef.current["requirements"].value,
      name: formRef.current["name"].value,
      job_id: formRef.current["job_id"].value,
    };
    await defaultAPI
      .post(apiUrl, {
        ...data,
      })
      .then((res) => {
        console.log("resresres", res);
        dispatch(getJob_announcementsData({ pageSize: 10 }));
        navigate(-1, { replace: true });

        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  useEffect(() => {
    dispatch(getJobsMenu());
  }, [dispatch]);

  return (
    <Box>
      <div className="container">
        <Header title={t("Add")}></Header>
        <form ref={formRef}>
          <div className="row">
            <div className="col-md-12 col-sm-12">
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

                <CustomLable title={"Job"} />

                <Select name="job_id" sx={{ width: "100%" }}>
                  {jobs.map((job) => (
                    <MenuItem key={job.id} value={job.id}>
                      {job.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              <div
                dir={sidebarRTL ? "rtl" : "ltr"}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                ></div>
              </div>
            </div>
            <div className="col-md-12 col-sm-12">
              <Box
                fullWidth
                dir={sidebarRTL ? "rtl" : "ltr"}
                display="flex"
                flexDirection="column"
                sx={{
                  margin: "1rem 0",
                }}
              >
                <CustomLable title={"starts_at"} />
                <CustomDateTime name="starts_at" />

                <CustomLable title={"ends_at"} />

                <CustomDateTime
                  name="ends_at"
                  inputProps={{
                    pattern: "\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}",
                  }}
                />
                <CustomLable title={"experience_years"} />
                <TextField
                  type="number"
                  name="experience_years"
                  inputProps={{
                    min: 0,
                    max: 40,
                  }}
                />
              </Box>
            </div>
            <div className="row">
              <CustomLable title={"requirements"} />
              <textarea
                dir={sidebarRTL ? "rtl" : "ltr"}
                className="border-1 shadow border-grey m-1 border p-3 bg-transparent"
                type="text"
                rows={5}
                name="requirements"
              />
            </div>
          </div>
        </form>
        <DefaultButton
          handleClick={handleApiCall}
          fullWidth={true}
          text={"add"}
          disabled={isLoading}
        />
      </div>
    </Box>
  );
};

export default AddJobAnoucementPage;
