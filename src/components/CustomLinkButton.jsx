import { Link } from "react-router-dom";
import EditButton from "./editButton";
import DefaultButton from "./defaultBtn";
import { PropTypes } from "prop-types";

const CustomLinkButton = ({ to, params,text }) => {
  return (
    <Link to={`${to}/${params ? params : ""}`}>
      {to == "edit" ? <EditButton text="edit" /> : <DefaultButton text="add" />}
    </Link>
  );
};
CustomLinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  params: PropTypes.string,
  text: PropTypes.string,
};
export default CustomLinkButton;
