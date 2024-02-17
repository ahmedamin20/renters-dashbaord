import { useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import { Box, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getWorkingShiftsMenu,
  getJobsMenu,
  getUsersMenu,
} from "../../../../redux/select_menus.js";
import {
  editEmployees,
  getEmployeesData,
  getOneEmployeesData,
} from "../../redux/Employees.js";
import Header from "../../../../components/Header.jsx";
import CustomSelectMenu from "./../../../../components/CustomSelect/CustomSelect";
import useMainHooks from "../../../../hooks/useMainHooks.jsx";
import CustomLable from "../../../../components/CustomLable.jsx";
import DefaultButton from "../../../../components/defaultBtn.jsx";
import { MilitaryServiceStatusType, SocialStatusType } from "./ENUM.js";
const EditEmployee = () => {
  const { id } = useParams();
  const formRef = useRef();

  const WorkingShiftData = useSelector(
    (state) => state.selectMenu.WorkingShiftsMenu.data
  );

  const dataEmploye = useSelector(
    (state) => state.Employees.EmployeesDataOne.data
  );

  const { t, dispatch, navigate, colors, sidebarRTL, isLoading, setIsLoading } =
    useMainHooks();
  console.log(isLoading);
  const handleApiCall = async () => {
    await setIsLoading(true);
    await dispatch(
      editEmployees({ id: dataEmploye?.user?.id, data: formRef.current })
    )
      .then((res) => {
        console.log("resresres", res);
        console.log("isLoading", isLoading);

        if (res.payload.code == 200) {
          dispatch(getEmployeesData(10)).then(() => {
            navigate(-1, { replace: true });
            setIsLoading(false);
          });
        }
      })
      .catch(() => setIsLoading(false));
    setIsLoading(false);
  };
  useEffect(() => {
    dispatch(getOneEmployeesData({ id, pageSize: 10 }));
    dispatch(getWorkingShiftsMenu());
    dispatch(getJobsMenu());
    dispatch(getUsersMenu());
  }, [dispatch]);

  return (
    <Box m={"20px"}>
      <form ref={formRef}>
        <Header title={t("Edit")} />

        <CustomSelectMenu
          fullWidth={true}
          defaultData={dataEmploye?.working_shift_id}
          options={WorkingShiftData}
          lable="working shifts"
          name="working_shift_id"
        />
        <Box
          dir={sidebarRTL ? "rtl" : "ltr"}
          display="flex"
          flexDirection="column"
        >
          <CustomLable title={"birth_date"} />
          <TextField
            type="text"
            name="birth_date"
            defaultValue={dataEmploye?.birth_date}
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
          <CustomLable title={"certificate"} />

          <TextField
            type="text"
            name="certificate"
            defaultValue={dataEmploye?.certificate}
          />
        </Box>

        <CustomSelectMenu
          lable="military_service"
          options={MilitaryServiceStatusType()}
          defaultData={dataEmploye?.military_service}
          name="military_service"
        />

        <Box
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
            defaultValue={dataEmploye?.nationality}
          />
        </Box>

        <Box
          fullWidth
          dir={sidebarRTL ? "rtl" : "ltr"}
          display="flex"
          flexDirection="column"
          sx={{
            margin: "1rem 0",
          }}
        >
          <CustomLable title={"passport_number"} />

          <TextField
            type="text"
            name="passport_number"
            defaultValue={dataEmploye?.passport_number}
          />
        </Box>

        <Box
          dir={sidebarRTL ? "rtl" : "ltr"}
          display="flex"
          flexDirection="column"
        >
          <CustomLable title={"landline_number"} />

          <TextField
            type="text"
            name="landline_number"
            defaultValue={dataEmploye?.landline_number}
          />
        </Box>
        <CustomLable title={"social_status"} />
        <CustomSelectMenu
          defaultData={dataEmploye?.social_status}
          options={SocialStatusType()}
        />

        <Box
          dir={sidebarRTL ? "rtl" : "ltr"}
          display="flex"
          flexDirection="column"
        >
          <CustomLable title={"name"} />

          <TextField
            type="text"
            name="name"
            defaultValue={dataEmploye?.user.name}
          />
        </Box>

        <Box
          fullWidth
          dir={sidebarRTL ? "rtl" : "ltr"}
          display="flex"
          flexDirection="column"
          sx={{
            margin: "1rem 0",
          }}
        >
          <CustomLable title={"Email"} />

          <TextField
            type="text"
            name="email"
            defaultValue={dataEmploye?.user.email}
          />
        </Box>

        <Box
          fullWidth
          dir={sidebarRTL ? "rtl" : "ltr"}
          display="flex"
          flexDirection="column"
          sx={{
            margin: "1rem 0",
          }}
        >
          <CustomLable title={"phone"} />

          <TextField
            type="text"
            name="phone"
            defaultValue={dataEmploye?.user.phone}
          />
        </Box>

        <Box
          fullWidth
          dir={sidebarRTL ? "rtl" : "ltr"}
          display="flex"
          flexDirection="column"
          sx={{
            margin: "1rem 0",
          }}
        >
          <CustomLable title={"password"} />

          <TextField
            type="password"
            name="password"
            defaultValue={dataEmploye?.password}
          />
        </Box>

        <Box
          fullWidth
          dir={sidebarRTL ? "rtl" : "ltr"}
          display="flex"
          flexDirection="column"
          sx={{
            margin: "1rem 0",
          }}
        >
          <CustomLable title={"confirmPassword"} />

          <TextField
            type="password"
            name="password_confirmation"
            defaultValue={dataEmploye?.password_confirmation}
          />
        </Box>

        <CustomLable title={"Select File"} />
        <input
          type="file"
          id="fileInput"
          name="cv"
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
              defaultValue={dataEmploye?.cv ? dataEmploye?.cv : ""}
              placeholder={t("File pdf")}
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

        <DefaultButton
          text={"edit"}
          handleClick={() => {
            handleApiCall();
          }}
          fullWidth={true}
          disabled={isLoading}
        />
      </form>
    </Box>
  );
};

export default EditEmployee;
