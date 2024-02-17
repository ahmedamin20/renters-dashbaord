import { Typography } from "@mui/material";

const Copyright = (props) => {
  return (
    <Typography
      variant={props.variant}
      m={6}
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <a
        style={{ color: "#ff7205", fontWeight: "bold" }}
        target="_blank"
        rel="noreferrer"
        href="https://doctor-code.net/"
      >
        Dr.Code
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
export default Copyright;
