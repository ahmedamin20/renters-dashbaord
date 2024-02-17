import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, TextField } from "@mui/material";
import DefaultButton from "./defaultBtn.jsx";
import defaultAPI from "../../../axiosInstance.js";
import { getBrands } from "../redux/brands.js";
import useMainHooks from "../../../hooks/useMainHooks.jsx";

const AddBrand = (props) => {
  const { t, sidebarRTL, dispatch, colors } = useMainHooks();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    img: null,
  });
  const [showImg, setShowImg] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
    setLoading(false);

    setFormData({
      name: "",
      img: null,
    });

    setShowImg(null);
  };

  const handleApiCall = async () => {
    setLoading(true);

    const apiUrl = `/admin/brands`;

    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("img", formData.img);

    // Send the image data to the server and get the response
    await defaultAPI
      .post(apiUrl, formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status == 201) {
          setOpen(false);
          setLoading(false);
        }
      })
      .catch(() => {
        setShowImg(null);
        setLoading(false);
      });

    dispatch(getBrands(props.pageSize || 10));

    setFormData({
      name: "",
      img: null,
    });

    setLoading(false);
  };
  const handleImageChange = (event) => {
    setFormData({ ...formData, img: event.target.files[0] });
    setShowImg(URL.createObjectURL(event.target.files[0]));
  };
  return (
    <Box>
      <DefaultButton handleClick={handleClickOpen} text={t("ADD")} />
      <Dialog
        fullWidth={true}
        sx={{ width: { xs: "100%", md: "50%" }, margin: "auto", padding: "0" }}
        open={open}
        onClose={() => {
          setLoading(false);
          setOpen(false);
        }}
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
              {t("Name")}
            </label>
            <TextField
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
              }}
            />
          </Box>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {showImg && <img width={"250px"} src={showImg} alt="img" />}
          </div>

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
            {t("Select File")}
          </label>

          <input
            type="file"
            id="fileInput"
            onChange={handleImageChange}
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
              {/* <Avatar src={selectedImageUrl} /> Display selected image */}
              <TextField
                variant="outlined"
                value={formData.img ? formData.img.name : ""}
                placeholder={t("File")}
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
            onClick={() => {
              setLoading(false);

              setOpen(false);
            }}
          >
            {t("Cancel")}
          </Button>
          <Button
            disabled={loading}
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 15px",
            }}
            onClick={() => {
              handleApiCall();
            }}
          >
            {loading ? t("Loading...") : t("Add")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddBrand;
