import { Box, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { tokens } from "../../theme";
import { useTranslation } from "react-i18next";
import Fab from "@mui/material/Fab";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LastPageIcon from "@mui/icons-material/LastPage";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import FirstPageIcon from "@mui/icons-material/FirstPage";
const CustomPagenation = (props) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleNextPage = () => {
    const info = {
      state: props.nextPage,
      pageSize: props.pageSize,
    };
    dispatch(props.action(info)); // This action will update the currentPage and fetch the data
  };
  const handlePrevPage = () => {
    const info = {
      state: props.prevPage,
      pageSize: props.pageSize,
    };
    dispatch(props.action(info)); // This action will update the currentPage and fetch the data
  };
  const handleLastPage = () => {
    const info = {
      state: props.lastPage,
      pageSize: props.pageSize,
    };
    dispatch(props.action(info)); // This action will update the currentPage and fetch the data
  };
  const handleFirstPage = () => {
    const info = {
      state: props.firstPage,
      pageSize: props.pageSize,
    };
    dispatch(props.action(info)); // This action will update the currentPage and fetch the data
  };

  const { t } = useTranslation();

  return (
    <Box margin="1rem">
      <Fab
        variant="extended"
        Button
        disabled={props.currentPage === 1 ? true : false}
        button="true"
        sx={{
          backgroundColor: `${colors.blueAccent[600]}`,
          color: "black",
          margin: ".2rem",
          fontSize: "20px",
        }}
        onClick={handleFirstPage}
      >
        <FirstPageIcon sx={{ mr: 1 }} />
        {t("First")}
      </Fab>
      <Fab
        variant="extended"
        disabled={props.prevPage === null ? true : false}
        button="true"
        sx={{
          backgroundColor: `${colors.blueAccent[600]}`,
          color: "black",
          margin: ".2rem",
          fontSize: "20px",
        }}
        onClick={handlePrevPage}
      >
        <NavigateBeforeIcon sx={{ mr: 1 }} />
        {t("Previous")}
      </Fab>
      <span style={{ margin: ".5rem" }}>{props.currentPage}</span>
      <Fab
        variant="extended"
        disabled={props.nextPage === null ? true : false}
        sx={{
          backgroundColor: `${colors.blueAccent[600]}`,
          color: "black",
          margin: ".2rem",
          fontSize: "20px",
        }}
        onClick={handleNextPage}
        button="true"
      >
        {t("Next")}
        <NavigateNextIcon sx={{ mr: 1 }} />
      </Fab>
      <Fab
        variant="extended"
        disabled={props.nextPage === null ? true : false}
        sx={{
          backgroundColor: `${colors.blueAccent[600]}`,
          color: "black",
          margin: ".2rem",
          fontSize: "20px",
        }}
        onClick={handleLastPage}
        button="true"
      >
        {t("Last")}
        <LastPageIcon sx={{ mr: 1 }} />
      </Fab>
    </Box>
  );
};

export default CustomPagenation;
