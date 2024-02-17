import { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import { Box, TextField, useTheme } from "@mui/material";
import { tokens } from "../../../../theme.js";
import { useSelector } from "react-redux";
import {
  editJob_announcements,
  getJob_announcementsData,
  getOneJob_announcementsData,
} from "../../redux/Job_announcements.js";
import { getJobsMenu } from "../../../../redux/select_menus.js";
import CustomDateTime from "../../../../components/CustomDateTime/CustomDateTime.jsx";
import { useParams } from "react-router-dom";
import Header from "../../../../components/Header.jsx";
import CustomSelectMenu from "../../../../components/CustomSelect/CustomSelect.jsx";
import useMainHooks from "../../../../hooks/useMainHooks.jsx";
import CustomLable from "../../../../components/CustomLable.jsx";
import DefaultButton from "../../../../components/defaultBtn.jsx";

const EditJob_announcements = () => {
  const jobs = useSelector((state) => state.selectMenu.JobsMenu) || [];
  const oneData = useSelector(
    (state) => state.Job_announcements.OneJobAnnouncementsData.data || []
  );
  const { id } = useParams();
  const { t, navigate, isLoading, setIsLoading, dispatch, sidebarRTL } =
    useMainHooks();

  const dataRef = useRef(true);
  useEffect(() => {
    dispatch(getOneJob_announcementsData(id));
  }, [dataRef]);
  const formik = useFormik({
    initialValues: {
      name: oneData?.name,
      job_id: oneData?.job_id,
      starts_at: oneData?.starts_at,
      ends_at: oneData?.ends_at,
      experience_years: oneData?.experience_years,
      requirements: oneData?.requirements,
      id: id,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      setIsLoading(true);

      const info = {
        values: values,
        name: values.name,
        job_id: values.job_id,
        starts_at: values.starts_at,
        ends_at: values.ends_at,
        experience_years: values.experience_years,
        requirements: values.requirements,
        id: id,
      };
      await dispatch(editJob_announcements(info))
        .then((res) => {
          if (res.payload.code === 200) {
            dispatch(getJob_announcementsData({ pageSize: 10 }));
            navigate(-1, { replace: true });
            setIsLoading(false);
          }
        })
        .catch(() => setIsLoading(false));
    },
  });

  const handleDateTimeChangeStart = (event) => {
    const momentObject = event;

    const formattedDateTime = momentObject.format("YYYY-MM-DD HH:mm");

    formik.setFieldValue("starts_at", formattedDateTime);
  };

  const handleDateTimeChangeEnd = (event) => {
    const momentObject = event;

    const formattedDateTime = momentObject.format("YYYY-MM-DD HH:mm");

    formik.setFieldValue("ends_at", formattedDateTime);
  };
  useEffect(() => {
    dispatch(getJobsMenu());
  }, [dispatch]);

  return (
    oneData && (
      <Box>
        <div className="container">
          <Header title={t("Edit")}></Header>
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

                <TextField
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={formik.touched.name && formik.errors.name}
                  helperText={formik.touched.name && formik.errors.name}
                />

                <CustomLable title={"starts_at"} />

                <CustomDateTime
                  defaultData={oneData?.starts_at}
                  onChange={handleDateTimeChangeStart}
                  name="starts_at"
                  value={formik.values.starts_at}
                  onBlur={formik.handleBlur}
                  error={formik.touched.starts_at && formik.errors.starts_at}
                  helperText={
                    formik.touched.starts_at && formik.errors.starts_at
                  }
                />
              </Box>
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
                <CustomLable title={"ends_at"} />

                <CustomDateTime
                  defaultData={oneData?.ends_at}
                  onChange={handleDateTimeChangeEnd}
                  name="ends_at"
                  value={formik.values.ends_at}
                  onBlur={formik.handleBlur}
                  error={formik.touched.ends_at && formik.errors.ends_at}
                  helperText={formik.touched.ends_at && formik.errors.ends_at}
                />
                <Box fullWidth>
                  <CustomSelectMenu
                    fullWidth={true}
                    lable="Job"
                    options={jobs}
                    defaultData={oneData?.job_id}
                    onChange={(item) =>
                      formik.setFieldValue("job_id", item?.id)
                    }
                  />
                </Box>
                <CustomLable title={"experience_years"} />

                <TextField
                  type="number"
                  name="experience_years"
                  inputProps={{
                    min: 0,
                    max: 40,
                  }}
                  value={formik.values.experience_years}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.experience_years &&
                    formik.errors.experience_years
                  }
                  helperText={
                    formik.touched.experience_years &&
                    formik.errors.experience_years
                  }
                />
              </Box>
            </div>
          </div>
          <div className="row p-1 pe-3">
            <CustomLable title={"requirements"} />

            <textarea
              className="border-2 shadow text-dark m-3  pt-3"
              type="text"
              dir={sidebarRTL ? "rtl" : "ltr"}
              rows={3}
              name="requirements"
              value={formik.values.requirements}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

          </div>
          <DefaultButton
            fullWidth={true}
            handleClick={formik.handleSubmit}
            disabled={isLoading}
            text={"edit"}
          />
        </div>
      </Box>
    )
  );
};

export default EditJob_announcements;
