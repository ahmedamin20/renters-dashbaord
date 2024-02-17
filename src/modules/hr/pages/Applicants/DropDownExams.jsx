import React, { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchFullMarkData, getExams } from "../../redux/FullMarks";
import { FormControl, InputLabel, Select } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../global/sidebar/sidebarContext";

const DropDownExams = ({ pageSize }) => {
  const { t } = useTranslation();
  const [examName, setExamName] = useState("");
  const { sidebarRTL } = useSidebarContext();
  const exams = useSelector((state) => state.FullMarks.getExamsData.data) || [];
  const dispatch = useDispatch();
  const [examId, setExamId] = useState(exams.length > 0 ? exams[0].id : null);

  useEffect(() => {
    dispatch(getExams());
  }, [dispatch]);

  useEffect(() => {
    if (exams.length > 0 && !examId) {
      setExamId(exams[0].id);
      setExamName(exams[0].name);
    }
  }, [exams, examId]);

  useEffect(() => {
    if (examId) {
      const info = {
        id: examId,
        pageSize: pageSize,
      };
      dispatch(fetchFullMarkData(info));
    }
  }, [dispatch, examId, pageSize]);

  const handleSelectChange = (event) => {
    const selectedName = event.target.value; // Get the selected name
    setExamName(selectedName); // Update the selected name in state

    // Find the corresponding exam ID based on the selected name
    const selectedExam = exams.find((examItem) => examItem.name === selectedName);
    if (selectedExam) {
      setExamId(selectedExam.id); // Update the selected exam ID in state
    }
  };

  return (
    <div dir={sidebarRTL ? "rtl" : "ltr"}>
      <FormControl
        sx={{
          maxWidth: 120,
          display: "flex",
          justifyContent: sidebarRTL ? "flex-end" : "flex-start",
          margin: 3,
        }}
      >
        <label htmlFor="exam-select" style={{ fontWeight: "Bold",fontSize:"18px" }}>{t("Select Exam")}</label>
        <Select
          value={examName} // Set the value to the selected examName
          onChange={handleSelectChange}
          sx={{ minWidth: 150 }}
          inputProps={{
            name: "exam",
            id: "exam-select",
          }}
        >
          {exams.map((examItem) => (
            <MenuItem key={examItem.id} value={examItem.name}>
              {examItem.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default DropDownExams;
