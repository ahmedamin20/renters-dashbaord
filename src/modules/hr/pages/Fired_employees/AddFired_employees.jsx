import { useState } from "react";
import {
  DialogTitle,
  DialogActions,
  DialogContent,
  Box,
  Button,
  Dialog,
  TextField,
} from "@mui/material";
import DefaultButton from "./defaultBtn.jsx";
import defaultAPI from "../../../../axiosInstance.js";
import { getFired_employeesData } from "../../redux/Fired_employees.js";
import useMainHooks from "../../../../hooks/useMainHooks.jsx";

const AddBrand = (props) => {
  const { t, sidebarRTL, dispatch, colors } = useMainHooks();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    employee_id: "",
    reason: "",
    type: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
    setFormData({
      employee_id: "",
      reason: "",
      type: "",
    });
  };

  const handleApiCall = async () => {
    if (loading) {
      return; // If loading is true, do nothing (prevent multiple clicks)
    }

    setLoading(true);

    const apiUrl = `/admin/fired_employees`;
    try {
      const formDataObj = new FormData();
      formDataObj.append("employee_id", formData.employee_id);
      formDataObj.append("reason", formData.reason);
      formDataObj.append("type", formData.type);

      // Send the image data to the server and get the response
      const response = await defaultAPI.post(apiUrl, formDataObj);

      dispatch(getFired_employeesData(props.pageSize));
      // Reset the form data
      setFormData({
        employee_id: "",
        reason: "",
        type: "",
      });

      // Close the dialog
      setOpen(false);
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while uploading.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <DefaultButton handleClick={handleClickOpen} text={t("ADD")} />
      <Dialog
        fullWidth={true}
        sx={{ width: { xs: "100%", md: "50%" }, margin: "auto", padding: "0" }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle
          sx={{ fontWeight: "bold", fontSize: "30px" }}
          align={sidebarRTL ? "right" : "left"}
        >
          {t("Add")}
        </DialogTitle>
        <DialogContent>
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
              {t(" employee_id")}
            </label>
            <TextField
              type="text"
              name=" employee_id"
              value={formData.employee_id}
              onChange={(e) =>
                setFormData({ ...formData, employee_id: e.target.value })
              }
            />
            <label
              style={{
                fontSize: "18px",
                marginBottom: ".5rem",
                fontWeight: "bold",
              }}
            >
              {t("Reason")}
            </label>
            <TextField
              type="text"
              name="reason"
              value={formData.reason}
              onChange={(e) =>
                setFormData({ ...formData, reason: e.target.value })
              }
            />

            <label
              style={{
                fontSize: "18px",
                marginBottom: ".5rem",
                fontWeight: "bold",
              }}
            >
              {t("type")}
            </label>
            <TextField
              type="text"
              name="type"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            />
          </Box>
          <label
            htmlFor="fileInput"
            dir={sidebarRTL ? "rtl" : "ltr"}
            style={{
              display: "block",
              fontSize: "18px",
              marginBottom: ".5rem",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {t("")}
          </label>

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
              {/* <Avatar src={selectedImageUrl} /> Display selected image */}
            </div>
          </div>
          <p
            dir={sidebarRTL ? "rtl" : "ltr"}
            style={{
              color: "red",
              margin: ".5rem",
              fontSize: "16px",
              fontWeight: "bold",
              direction: sidebarRTL ? "rtl" : "ltr",
            }}
          >
            {t(`${message}`)}
          </p>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => setOpen(false)}
          >
            {t("Cancel")}
          </Button>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 15px",
            }}
            onClick={handleApiCall}
            endIcon={props.icon}
            disabled={loading}
          >
            {loading ? t("Loading...") : t("Add")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddBrand;
