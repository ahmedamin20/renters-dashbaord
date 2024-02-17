import * as React from "react";
import FormControl from "@mui/material/FormControl";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import { useSidebarContext } from "../../pages/global/sidebar/sidebarContext";

let FetchedBefore = false;

const CustomSearch = (props) => {
  const { t } = useTranslation();
  const { sidebarRTL } = useSidebarContext();
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    if (!e.target.value && !FetchedBefore && !props.id) {
      FetchedBefore = true;
      dispatch(props.action({ handle: "", pageSize: props.pageSize }));
    }
    if (!e.target.value && !FetchedBefore && !props.id) {
      FetchedBefore = true;
      dispatch(props.action({ handle: "", pageSize: props.pageSize }));
    } else if (props.id) {
      FetchedBefore = false;
      dispatch(
        props.action({
          handle: e.target.value,
          id: props.id,
          pageSize: props.pageSize,
        })
      );
    } else {
      FetchedBefore = false;
      dispatch(
        props.action({
          handle: e.target.value,
          id: props.id,
          pageSize: props.pageSize,
        })
      );
    }
  };
  return (
    <FormControl
      dir={sidebarRTL ? "rtl" : "ltr"}
      sx={{ m: 1 , fontSize: "20px" }}
      variant="outlined"
      fullWidth={true}
    >
      <label style={{ fontSize: "20px", fontWeight: "bold" }}>
        {t("search")}
      </label>
      <TextField
        dir={sidebarRTL ? "rtl" : "ltr"}
        className="search-input"
        fullWidth={true}
        onKeyUp={handleSearch}
        // id="outlined-adornment-weight"
        // aria-describedby="outlined-weight-helper-text"
        // inputProps={{
        //   "aria-label": "weight",
        // }}
      />
    </FormControl>
  );
};

export default CustomSearch;
