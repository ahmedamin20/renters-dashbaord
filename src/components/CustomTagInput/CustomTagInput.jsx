import { TagsInput } from "react-tag-input-component";
import CustomLable from "../CustomLable";
import PropTypes from "prop-types";
import { useSidebarContext } from "../../pages/global/sidebar/sidebarContext";

const CustomTagInput = ({ onChange, title, defaultData }) => {
  let selected = defaultData;
  console.log(defaultData);
  const { sidebarRTL } = useSidebarContext();
  return (
    <div dir={sidebarRTL ? "rtl" : "ltr"}>
      <CustomLable title={title} />
      <TagsInput value={selected} onChange={onChange} />
    </div>
  );
};
CustomTagInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  defaultData: PropTypes.any,
};
export default CustomTagInput;
