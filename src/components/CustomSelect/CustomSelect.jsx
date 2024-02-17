import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import Select from "react-select";
import { useSidebarContext } from "../../pages/global/sidebar/sidebarContext";
import CustomLable from "../CustomLable";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
const CustomSelectMenu = ({
  options,
  selected,
  name,
  sx,
  lable,
  isDisabled,
  onChange,
  defaultData,
  loading,
  helperText,
  fullWidth,
}) => {
  const { t } = useTranslation();
  const { sidebarRTL } = useSidebarContext();
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    if (defaultData) {
      const updatedSelectedObject = options?.find(
        (option) => option?.id === defaultData
      );
      setSelectedValue(updatedSelectedObject || null);
    }
  }, [defaultData, options]);

  const handleOnChange = (selectedOption) => {
    setSelectedValue(selectedOption);
    onChange(selectedOption);
  };
  return (
    <Box
      fullWidth={fullWidth || false}
      dir={sidebarRTL ? "rtl" : "ltr"}
      sx={{ margin: "1rem auto" } || sx}
    >
      {lable ? <CustomLable title={lable} /> : null}
      <Select
        placeholder={t("Select Option")}
        isDisabled={!!isDisabled}
        isSearchable={true}
        isClearable={true}
        isLoading={loading}
        isMulti={false}
        defaultValue={selectedValue}
        name={name}
        value={selectedValue}
        isOptionDisabled={(SelectedOption) =>
          SelectedOption?.id === selected?.id
        }
        helperText={helperText}
        onChange={handleOnChange}
        getOptionLabel={(option) => option?.name}
        getOptionValue={(option) => option?.id}
        options={options || []}
        styles={{
          menu: (provided) => ({
            ...provided,
            color: "#000",
            direction: sidebarRTL ? "rtl" : "ltr",
          }),
          container: (provided) => ({
            ...provided,
            direction: sidebarRTL ? "rtl" : "ltr",
          }),
          menuPortal: (provided) => ({
            ...provided,
            direction: sidebarRTL ? "rtl" : "ltr",
          }),
        }}
      />
    </Box>
  );
};
CustomSelectMenu.propTypes = {
  options: PropTypes.array.isRequired,
  selected: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  sx: PropTypes.object.isRequired,
  lable: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultData: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  helperText: PropTypes.string,
};
export default CustomSelectMenu;
