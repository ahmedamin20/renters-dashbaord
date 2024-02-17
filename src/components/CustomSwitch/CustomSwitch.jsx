import Switch from "@mui/material/Switch";
import { Box } from "@mui/material";
import CustomLable from "../CustomLable";
import { useSidebarContext } from "../../pages/global/sidebar/sidebarContext";

const CustomSwitch = (props) => {
  const { sidebarRTL } = useSidebarContext();
  const handleChange = () => {
    props.onSwitchChange(!props.value);
  };
  return (
    <Box dir={sidebarRTL ? "rtl" : "ltr"}>
      {props.title && <CustomLable title={props.title} />}
      <Switch
        onChange={handleChange}
        checked={props.value === 1}
        color="secondary"
      />
    </Box>
  );
};
export default CustomSwitch;
