import { Box, useTheme } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { tokens } from "../../../theme.js";
import { useTranslation } from "react-i18next";
import Fab from "@mui/material/Fab";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LastPageIcon from "@mui/icons-material/LastPage";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import { fetchBrandsDataByPage } from "../redux/brands.js";
const Pagenation = (props) => {
  const firstPage = useSelector(
    (state) => state.brands.brandsLinks.first
  );
  const nextPage = useSelector((state) => state.brands.brandsLinks.next);
  const lastPage = useSelector((state) => state.brands.brandsLinks.last);
  const prevPage = useSelector((state) => state.brands.brandsLinks.prev);
  const currentPage = useSelector((state) => state.brands.currentPage);
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleNextPage = () => {
    const info = {
      state: nextPage,
      pageSize: props.pageSize,
    };
    dispatch(fetchBrandsDataByPage(info)); // This action will update the currentPage and fetch the data
  };
  const handlePrevPage = () => {
    const info = {
      state: prevPage,
      pageSize: props.pageSize,
    };
    dispatch(fetchBrandsDataByPage(info)); // This action will update the currentPage and fetch the data
  };
  const handleLastPage = () => {
    const info = {
      state: lastPage,
      pageSize: props.pageSize,
    };
    dispatch(fetchBrandsDataByPage(info)); // This action will update the currentPage and fetch the data
  };
  const handleFirstPage = () => {
    const info = {
      state: firstPage,
      pageSize: props.pageSize,
    };
    dispatch(fetchBrandsDataByPage(info)); // This action will update the currentPage and fetch the data
  };

  const { t } = useTranslation();

  return (
    <Box margin="1rem">
      <Fab
        variant="extended"
        button="true"
        disabled={firstPage === 1 || currentPage === 1 ? true : false}
        sx={{
          fontSize: "20px",
          backgroundColor: `${colors.blueAccent[600]}`,
          color: "white",
          margin: ".2rem",
        }}
        onClick={handleFirstPage}
        color="primary"
        aria-label="add"
      >
        <FirstPageIcon sx={{ mr: 1 }} />
        {t("First")}
      </Fab>
      <Fab
        variant="extended"
        button="true"
        disabled={prevPage === null ? true : false}
        sx={{
          fontSize: "20px",
          backgroundColor: `${colors.blueAccent[600]}`,
          color: "white",
          margin: ".2rem",
        }}
        onClick={handlePrevPage}
        color="primary"
        aria-label="add"
      >
        <NavigateBeforeIcon sx={{ mr: 1 }} />
        {t("Previous")}
      </Fab>
      <span style={{ margin: ".5rem" }}>{currentPage}</span>
      <Fab
        variant="extended"
        button="true"
        disabled={nextPage === null ? true : false}
        sx={{
          fontSize: "20px",
          backgroundColor: `${colors.blueAccent[600]}`,
          color: "white",
          margin: ".2rem",
        }}
        onClick={handleNextPage}
        color="primary"
        aria-label="add"
      >
        {t("Next")}
        <NavigateNextIcon sx={{ mr: 1 }} />
      </Fab>
      <Fab
        variant="extended"
        button="true"
        disabled={nextPage === null ? true : false}
        sx={{
          fontSize: "20px",
          backgroundColor: `${colors.blueAccent[600]}`,
          color: "white",
          margin: ".2rem",
        }}
        onClick={handleLastPage}
        color="primary"
        aria-label="add"
      >
        {t("Last")}
        <LastPageIcon sx={{ mr: 1 }} />
      </Fab>
    </Box>
  );
};

export default Pagenation;
