import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, TextField, useTheme } from "@mui/material";
import { tokens } from "../../../theme.js";
import { editbrand, getBrands } from "../redux/brands.js";
import EditButton from './../../../components/editButton';
import useMainHooks from "../../../hooks/useMainHooks.jsx";

const EditBrand = (props) => {
  
  const {t,dispatch,sidebarRTL}= useMainHooks()
  const [loading, setLoading] = useState(false);
  const [showImg, setShowImg] = useState(props.img);

  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(props.img);

  const [formData, setFormData] = useState({
    name: props.name,
    img: selectedImageUrl,
  });

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State variable to store the URL of the selected image

  const handleClickOpen = async () => {
    setOpen(true);
    setShowImg(props.img);
  };

  const handleApiCall = async () => {
    if (loading) {
      return; // If loading is true, do nothing (prevent multiple clicks)
    }

    const allowedExtensions = [".jpg", ".png", ".jpeg", ".jfif"];
    const fileName = formData.img?.name;
    if (fileName) {
      const fileExtension = fileName
        .substring(fileName.lastIndexOf("."))
        .toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        setMessage("Please select a valid image file (jpg or png).");
        return;
      }
    }
    const info = {
      values: formData,
      id: props.id,
    };
    try{

    
    await dispatch(editbrand(info)).then((res) =>
      res.payload.code === 200
        ? dispatch(getBrands(10)).then(()=> {
          setLoading(false)
          setMessage('')
          setOpen(false)})
        : setOpen(true)
    ).catch(()=> setLoading(false))
  }
  catch(err){
    setLoading(false)
  }
  };
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setShowImg(URL.createObjectURL(e.target.files[0]));

    if (selectedImage) {
      setSelectedImageUrl(URL.createObjectURL(selectedImage));
      setFormData({ ...formData, img: selectedImage });
    }
  };

  return (
    <Box>
      <EditButton onClick={handleClickOpen} text={'edit'}/>
       
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
          {t("Edit")}
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
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
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
          >
            {showImg && <img  width={"250px"} src={showImg} alt="img" />}
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
          disabled={loading}

            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 15px",
            }}
            onClick={()=> {
              setLoading(true)
              handleApiCall()
            }}
          >
            {loading ? t("Loading...") : t("Edit")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditBrand;
