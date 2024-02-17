import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import "./videoStyle.css";
import EditButton from "./../editButton";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
const VideoInput = ({ width, height, onChange }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [source, setSource] = React.useState();

  const handleFileChange = (event) => {
    //  console.log(event.target.files[0].size)
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size > 10 * 1000 * 1024) {
        alert(t("File with maximum size of 10MB is allowed"));
        return false;
      } else {
        onChange(event);
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        setSource(url);
      }
    }
  };
  const videoInputRef = useRef();
  const handleVideoInputClick = () => {
    videoInputRef.current.click();
  };
  return (
    <div className="VideoInputContainer">
      <EditButton
        backGround={colors.greenAccent[500]}
        fullWidth={true}
        text="choose_video"
        onClick={handleVideoInputClick}
      />
      <input
        ref={videoInputRef}
        className="VideoInput_input"
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept=".mov,.mp4"
      />
      {source && (
        <video
          className="VideoInput_video"
          width="100%"
          height={height}
          controls
          src={source}
        />
      )}
    </div>
  );
};
export default VideoInput;
