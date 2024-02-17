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
        style={{ color: "#0090ff", fontWeight: "bold" }}
        target="_blank"
        rel="noreferrer"
        href="https://portfolio-psi-pied-15.vercel.app/"
      >
        Ahmed Amin
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
export default Copyright;
