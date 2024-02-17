import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";

import {
  Select,
  FormControl,
  Box,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../global/sidebar/sidebarContext";
import { getBrands } from "../../redux/brands";

const DropDownGradesSubjects = ({ setFormikValues,brand_id }) => {
  const { t } = useTranslation()
  const [selectedExamId, setSelectedExamId] = useState(null);

  const brands = useSelector((state) => state.selectMenu.brandsMenu.data) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getFullMarkGrades());
    dispatch(getBrands());
  }, [dispatch]);

  useEffect(() => {
    setFormikValues("brand_id", brand_id);
  },[brand_id])
  const handleSelectChangeExam = (event) => {
    setSelectedExamId(event.target.value);
    setFormikValues("brand_id", event.target.value);
  };

  const { sidebarRTL } = useSidebarContext();

  return (
    <Box m="20px" display="flex" flexDirection="column" dir={sidebarRTL?"rtl":"ltr"}>
      <FormControl variant="outlined" sx={{ mt: 2 }}>
      <label style={{fontSize:"18px",fontWeight: "Bold"}}>{t("brand")}</label>
        <Select
          fullWidth
          // disabled={!selectedSubjectId}
          value={selectedExamId !== null?  selectedExamId : brand_id}
          onChange={handleSelectChangeExam}
          dir={sidebarRTL ? "rtl" : "ltr"}
        >
          {brands &&
            brands.map((examItem) => (
              <MenuItem dir={sidebarRTL ? "rtl" : "ltr"} key={examItem.id} value={examItem.id}>
                {examItem.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DropDownGradesSubjects;
