import { useState } from "react";
import ImageUploading from "react-images-uploading";
import "./imageMultiListStyle.css";
import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const CustomMutliImg = ({ imagesChange }) => {
  const { t } = useTranslation();
  const [images, setImages] = useState([]);
  const maxNumber = 10;
  const onChange = (imageList, addUpdateIndex) => {
    imagesChange(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <Box m={2}>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        acceptType={["jpg", "JPEG", "PNG", "png"]}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className="upload__image-wrapper">
            <div className="addAndRemoveButtonContainer">
              <Button
                variant="contained"
                className="upload_button"
                type="button"
                style={isDragging ? { color: "red" } : null}
                onClick={onImageUpload}
                {...dragProps}
              >
                {t("Upload")}
              </Button>
              &nbsp;
              <Button
                variant="contained"
                className="remove_all_button"
                type="button"
                onClick={onImageRemoveAll}
              >
                {t("Remove All")}
              </Button>
            </div>
            <br />
            <br />
            <div className="all_images_container">
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image.data_url} alt="" width="100" />
                  <div className="image-item__btn-wrapper">
                    <Button
                      variant="contained"
                      sx={{ background: "#14149f" }}
                      className="update_button"
                      type="button"
                      onClick={() => onImageUpdate(index)}
                    >
                      {t("Update")}
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ background: "#910606" }}
                      className="remove_button"
                      type="button"
                      onClick={() => onImageRemove(index)}
                    >
                      {t("Remove")}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </ImageUploading>
    </Box>
  );
};

export default CustomMutliImg;
