import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, TextField } from "@mui/material";
import { firedEmployees, getEmployeesData } from "../../redux/Employees.js";
import useMainHooks from "../../../../hooks/useMainHooks.jsx";
import CustomLable from "../../../../components/CustomLable.jsx";

const FiredEmployees = (props) => {
  const { t, sidebarRTL, dispatch, colors, isLoading, setIsLoading } =
    useMainHooks();
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    reason: props.reason,
    type: "",

    id: props.id,
  });

  const handleClickOpen = async () => {
    setOpen(true);
  };

  const handleApiCall = async () => {
    const info = {
      values: formData,
      reason: props.reason,
      type: props.type,
      id: formData.id,
    };
    setIsLoading(true);
    await dispatch(firedEmployees(info))
      .then((res) =>
        res.payload.code === 201
          ? dispatch(getEmployeesData(props.pageSize)).then(() => {
              setOpen(false);
              setIsLoading(false);
            })
          : setOpen(true)
      )
      .catch(() => {
        setIsLoading(false);
      });
    setIsLoading(false);
  };

  return (
    <Box>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{ background: colors.redAccent[400] }}
        disabled={props.is_fired} 
      >
        {t("fire_employee")}
      </Button>
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
          {t("fire_employee")}
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
            <CustomLable title={"reason"} />

            <TextField
              type="text"
              name="reason"
              value={formData.reason}
              onChange={(e) =>
                setFormData({ ...formData, reason: e.target.value })
              }
            />

            <CustomLable title={"type"} />
            <TextField
              type="text"
              name="type"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
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
            disabled={isLoading}
          >
            {isLoading ? t("loading") : t("fire_employee")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FiredEmployees;
