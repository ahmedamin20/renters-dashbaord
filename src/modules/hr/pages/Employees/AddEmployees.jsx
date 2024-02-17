import { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import { Box, TextField, Container } from "@mui/material";
import CustomSelect from "../../../../components/CustomSelect/CustomSelect.jsx";
import CustomSwitch from "../../../../components/CustomSwitch/CustomSwitch.jsx";
import defaultAPI from "../../../../axiosInstance.js";
import { useSelector } from "react-redux";
import { getEmployeesData } from "../../redux/Employees.js";
import {
  getWorkingShiftsMenu,
  getJobsMenu,
  getUsersMenu,
  getApplicants,
} from "../../../../redux/select_menus.js";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Header from "../../../../components/Header.jsx";
import CustomLable from "../../../../components/CustomLable.jsx";
import DefaultButton from "../../../../components/defaultBtn.jsx";
import useMainHooks from "../../../../hooks/useMainHooks.jsx";
import CustomSelectMenu from "../../../../components/CustomSelect/CustomSelect.jsx";
import { MilitaryServiceStatusType, SocialStatusType } from "./ENUM.js";
const AddEmployees = () => {
  const WorkingShiftData = useSelector(
    (state) => state.selectMenu.WorkingShiftsMenu?.data
  );
  const formRef = useRef();
  const JobsMenu = useSelector((state) => state.selectMenu.JobsMenu);
  const UsersMenu = useSelector((state) => state.selectMenu.UsersMenu?.data);
  const applicantsMenu =
    useSelector((state) => state.selectMenu.applicantsMenu?.data) || [];
  const { isLoading, setIsLoading, colors, t, sidebarRTL, navigate, dispatch } =
    useMainHooks();
  const [formData, setFormData] = useState({
    name: "",
    cv: null,
  });
  const isApplicantOnChange = (e) => {
    setIsApplicantChecked(e);
  };
  const [isApplicantChecked, setIsApplicantChecked] = useState(false);

  useEffect(() => {
    dispatch(getApplicants());
    dispatch(getWorkingShiftsMenu());
    dispatch(getJobsMenu());
    dispatch(getUsersMenu());
  }, [dispatch]);

  const handleApiCall = async () => {
    setIsLoading(true);

    const apiUrl = `/admin/employees`;
    try {
      await defaultAPI.post(apiUrl, formRef.current, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(getEmployeesData(10));
      navigate(-1);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  const isEmployeeType = formData.type === "employee";
  return (
    <form ref={formRef}>
      <Container>
        <Header title={t("Add")} />

        <CustomSelectMenu
          options={WorkingShiftData}
          name="working_shift_id"
          lable="working_shift_name"
        />

        <CustomSelectMenu options={JobsMenu} name="job_id" lable="job_name" />

        <Box
          dir={sidebarRTL ? "rtl" : "ltr"}
          display="flex"
          flexDirection="column"
        >
          <CustomLable title={"birth_date"} />
          <TextField type="date" name="birth_date" />
        </Box>

        <Box
          dir={sidebarRTL ? "rtl" : "ltr"}
          display="flex"
          flexDirection="column"
        >
          <CustomLable title={"certificate"} />

          <TextField type="text" name="certificate" />
        </Box>

        <CustomSelectMenu
          name={"military_service"}
          lable={"military_service"}
          options={MilitaryServiceStatusType()}
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
          <CustomLable title={"nationality"} />

          <TextField
            type="text"
            name="nationality"
            inputProps={{
              pattern: "[0-9]*",
            }}
          />
        </Box>

        <Box
          dir={sidebarRTL ? "rtl" : "ltr"}
          display="flex"
          flexDirection="column"
          sx={{
            margin: "1rem 0",
          }}
        >
          <CustomLable title={"passport_number"} />

          <TextField
            type="number"
            name="passport_number"
            inputProps={{
              pattern: "[0-9]*",
              min: 0,
              step: 1,
            }}
          />
        </Box>

        <Box
          dir={sidebarRTL ? "rtl" : "ltr"}
          display="flex"
          flexDirection="column"
          sx={{
            margin: "1rem 0",
          }}
        >
          <CustomLable title={"landline_number"} />

          <TextField
            type="text"
            name="landline_number"
            inputProps={{
              pattern: "[0-9]*",
            }}
          />
        </Box>

        <CustomSelectMenu
          options={SocialStatusType()}
          name="social_status"
          lable="social_status"
        />

        <Box
          dir={sidebarRTL ? "rtl" : "ltr"}
          display="flex"
          flexDirection="column"
        >
          <CustomLable title={"type"} />

          <RadioGroup
            row
            name="type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <FormControlLabel
              value="employee"
              control={<Radio />}
              label={t("Employee")}
            />
            <FormControlLabel
              value="new_employee"
              control={<Radio />}
              label={t("New Employee")}
            />
          </RadioGroup>
        </Box>

        <Box
          dir={sidebarRTL ? "rtl" : "ltr"}
          display="flex"
          flexDirection="column"
        >
          <CustomLable title={"email"} />

          <TextField
            disabled={formData.type === "employee"}
            type="email"
            name="email"
            required={isEmployeeType}
          />
        </Box>

        <Box
          dir={sidebarRTL ? "rtl" : "ltr"}
          display="flex"
          flexDirection="column"
        >
          <CustomLable title={"phone"} />

          <TextField
            disabled={formData.type === "employee"}
            type="number"
            name="phone"
            inputProps={{
              pattern: "[0-9]*",
            }}
          />
        </Box>

        <Box
          dir={sidebarRTL ? "rtl" : "ltr"}
          display="flex"
          flexDirection="column"
        >
          <CustomLable title={"name"} />

          <TextField
            disabled={formData.type === "employee"}
            type="text"
            name="name"
          />
        </Box>

        <Box
          dir={sidebarRTL ? "rtl" : "ltr"}
          display="flex"
          flexDirection="column"
        >
          <CustomLable title={"password"} />

          <TextField
            disabled={formData.type === "employee"}
            type="password"
            name="password"
          />
        </Box>
        <Box
          dir={sidebarRTL ? "rtl" : "ltr"}
          display="flex"
          flexDirection="column"
        >
          <CustomLable title={"password_confirmation"} />
          <TextField
            disabled={formData.type === "employee"}
            type="password"
            name="password_confirmation"
          />
        </Box>

        <CustomSelectMenu
          lable="user"
          options={UsersMenu}
          required={isEmployeeType}
          disabled={formData.type === "new_employee"}
          name="user_id"
        />
        <CustomSwitch
          title={t("is_applicant")}
          onSwitchChange={isApplicantOnChange}
          value={isApplicantChecked + 0}
        />
        <CustomSelect
          isDisabled={!isApplicantChecked}
          options={applicantsMenu}
          lable={"applicants"}
        />
        {!isApplicantChecked && (
          <Box>
            <CustomLable title={"select_file"} />
            <input
              type="file"
              id="fileInput"
              name="cv"
              accept="application/pdf"
              style={{ display: "none" }}
            />
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
              >
                <TextField
                  variant="outlined"
                  value={formData.cv ? formData.cv.name : ""}
                  placeholder={t("pdf_only")}
                  InputProps={{
                    style: {
                      fontSize: "18px",
                      fontWeight: "bold",
                      borderRight: "50px",
                    },
                  }}
                  disabled
                  style={{ width: "83%" }}
                />
                <Button
                  variant="contained"
                  component="label"
                  htmlFor="fileInput"
                  style={{
                    backgroundColor: colors.blueAccent[700],
                    color: colors.grey[100],
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "15px 0",
                    width: "15%",
                  }}
                >
                  {t("Browse")}
                </Button>
              </div>
            </div>
          </Box>
        )}
        <DefaultButton
          text={"Add"}
          handleClick={handleApiCall}
          disabled={isLoading}
          fullWidth={true}
        />
      </Container>
    </form>
  );
};

export default AddEmployees;
