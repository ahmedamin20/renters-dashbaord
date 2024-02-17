import { useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import { Box, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import {
  editworking_shifts,
  getworking_shiftsData,
} from "../../redux/working_shifts.js";
import hasPermission from "../../../../utils/haspermission.js";
import { useParams } from "react-router-dom";
import useMainHooks from "../../../../hooks/useMainHooks.jsx";
import DefaultButton from "../../../../components/defaultBtn.jsx";
import CustomLable from "./../../../../components/CustomLable";

const EditWorkingShift = () => {
  const { id } = useParams();
  const { navigate, dispatch, sidebarRTL, t, isLoading, setIsLoading } =
    useMainHooks();

  const data = useSelector(
    (state) => state.working_shifts.working_shiftsData.data || []
  );
  const editedData = data.filter((item) => item.id == id)[0];
  console.log(editedData);

  const [formData, setFormData] = useState({
    name: editedData?.name,
    starts_at: editedData?.starts_at,
    ends_at: editedData?.ends_at,
    rest_hours: editedData?.rest_hours,
    id: id,
  });

  const handleApiCall = async () => {
    setIsLoading(true);
    let startsAt = formData.starts_at,
      endsAt = formData.ends_at;

    const info = {
      values: {
        name: formData.name,
        starts_at: startsAt,
        ends_at: endsAt,
        rest_hours: formData.rest_hours,
      },
      id: formData.id,
    };

    await dispatch(editworking_shifts(info))
      .then((res) => {
        if (res.payload.code == 200) {
          setIsLoading(false);
          dispatch(getworking_shiftsData({ pageSize: 10 }));
          navigate(-1, { replace: true });
        }
      })
      .catch(() => setIsLoading(false));
  };

  return (
    <Box m={"20px"}>
      <Box
        dir={sidebarRTL ? "rtl" : "ltr"}
        display="flex"
        flexDirection="column"
        sx={{
          margin: "1rem 0",
        }}
      >
        <CustomLable text={"Name"} />

        <TextField
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <CustomLable text={"starts_at"} />
        <TextField
          type="time"
          name="starts_at"
          value={formData.starts_at}
          onChange={(e) => {
            console.log(e.target.value);
            setFormData({ ...formData, starts_at: e.target.value });
          }}
        />

        <CustomLable text={"ends_at"} />

        <TextField
          type="time"
          name="ends_at"
          value={formData.ends_at}
          onChange={(e) =>
            setFormData({ ...formData, ends_at: e.target.value })
          }
        />

        <CustomLable text={"rest_hours"} />

        <TextField
          type="number"
          name="rest_hours"
          value={formData.rest_hours}
          onChange={(e) =>
            setFormData({ ...formData, rest_hours: e.target.value })
          }
          inputProps={{ min: 0 }}
        />
      </Box>
      <div
        style={{
          margin: ".5rem auto",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      ></div>

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

      {hasPermission("update-working_shifts") && (
        <DialogActions>
          <DefaultButton
            handleClick={handleApiCall}
            text={"edit"}
            fullWidth={true}
            disabled={isLoading}
          />
        </DialogActions>
      )}
    </Box>
  );
};

export default EditWorkingShift;
