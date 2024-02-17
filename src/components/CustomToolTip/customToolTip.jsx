import * as React from "react";
import Tooltip from "@mui/material/Tooltip";
import { useTranslation } from "react-i18next";

const CustomToolTip = ({ shouldTranslate = true, text, background, color }) => {
  const { t } = useTranslation();

  // console.log(props.shouldTranslate)
  return (
    <Tooltip
      fontSize="18px"
      title={
        <h6 style={{ fontSize: "18px !important" }}>
          {shouldTranslate ? t(text) : text}
        </h6>
      }
    >
      <span
        style={{
          color: color,
          fontSize: "18px !important",
          background: background ? background : "none",
          padding: ".2rem",
          borderRadius: ".2rem",
        }}
      >
        {shouldTranslate ? t(text) : text}
      </span>
    </Tooltip>
  );
};
export default CustomToolTip;
