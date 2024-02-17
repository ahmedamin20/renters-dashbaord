import { Button, useTheme } from "@mui/material";
import { tokens } from "../../../../theme.js";
import { PropTypes } from "prop-types";
const DefaultButton = ({ handleClick, icon, fullWidth, text }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Button
      variant="outlined"
      onClick={handleClick}
      endIcon={icon}
      fullWidth={fullWidth || false}
      sx={{
        backgroundColor: colors.blueAccent[700],
        color: colors.grey[100],
        fontSize: "14px",
        fontWeight: "bold",
        padding: "10px 20px",
        // display: props.show ? "block" : "none"
      }}
    >
      {text}
    </Button>
  );
};
DefaultButton.propTypes = {
  handleClick: PropTypes.func,
  icon: PropTypes.element,
  fullWidth: PropTypes.bool,
  text: PropTypes.string,
};
export default DefaultButton;
