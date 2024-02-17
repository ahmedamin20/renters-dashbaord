import { Box } from "@mui/material";
import Select from "react-select";
import { useSidebarContext } from "../../pages/global/sidebar/sidebarContext";
import CustomLable from "../CustomLable";
import { useTranslation } from "react-i18next";

const CustomMultiSelectMenu = ({
  options,
  lable,
  defaultData,
  sx,
  placeholder,
  onChange,
  disabled,
}) => {
  const { sidebarRTL } = useSidebarContext();
  let selectedOptions = defaultData?.map((defaultId) =>
    options.find((option) => option.id == defaultId)
  );
  const { t } = useTranslation();
  return (
    <Box sx={{ margin: "1rem auto" } || sx}>
      {lable && <CustomLable title={lable} />}
      <Select
        placeholder={placeholder ? t(placeholder) : t("Select Option")}
        defaultValue={selectedOptions}
        isDisabled={disabled || false}
        isSearchable={true}
        isMulti
        onChange={onChange}
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.id}
        options={options.length && options}
        styles={{
          menu: (provided) => ({
            ...provided,
            // zIndex: 9999,
            color: "#000",
            direction: sidebarRTL ? "rtl" : "ltr",
          }),
          container: (provided) => ({
            ...provided,
            // zIndex: 9999,
            direction: sidebarRTL ? "rtl" : "ltr",
          }),
          menuPortal: (provided) => ({
            ...provided,
            // zIndex: 9999,
            direction: sidebarRTL ? "rtl" : "ltr",
          }),
        }}
      />
    </Box>
  );
};

export default CustomMultiSelectMenu;
