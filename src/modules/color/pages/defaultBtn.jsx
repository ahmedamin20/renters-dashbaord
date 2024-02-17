import { Button, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../../../theme.js";
const DefaultButton = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Button
      variant="outlined"
      onClick={props.handleClick}
      endIcon={props.icon}
      sx={{
        backgroundColor: colors.blueAccent[700],
        color: colors.grey[100],
        fontSize: "14px",
        fontWeight: "bold",
        padding: "10px 20px",
        // display: props.show ? "block" : "none"
      }}
    >
      {props.text}
    </Button>
  );
};

export default DefaultButton;
