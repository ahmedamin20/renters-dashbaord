import CustomTableBox from "../../../components/customTableBox/CustomTableBox.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deletecolor,
  getColors,
  getColorsDataByPage,
  getColorsSearch,
} from "../redux/colors.js";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CustomDelete from "../../../components/CutsomDelete/CustomDelete.jsx";
import { Box, IconButton, useTheme } from "@mui/material";
import { tokens } from "../../../theme.js";
import CustomPagenation from "../../../components/CustomPagenation/CustomPagenation.jsx";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import Header from "../../../components/Header.jsx";
import AddColors from "./AddColors.jsx";
import EditColors from "./EditColors.jsx";
import clipboardCopy from "clipboard-copy";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import hasPermission from "../../../utils/haspermission.js";

const Colors = () => {
  const { sidebarRTL } = useSidebarContext();
  const colorsData = useSelector((state) => state.colors.colors.data) || [];
  const loading = useSelector((state) => state.colors.loading);
  const firstPage = useSelector((state) => state.colors.colorsLinks.first);
  const nextPage = useSelector((state) => state.colors.colorsLinks.next);
  const lastPage = useSelector((state) => state.colors.colorsLinks.last);
  const prevPage = useSelector((state) => state.colors.colorsLinks.prev);
  const currentPage = useSelector((state) => state.colors.currentPage);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [pageSize, SetPageSize] = useState(10);

  const columns = [
    { field: "id", headerName: t("ID"), width: 200 },
    {
      field: "name",
      headerName: t("Name"),
      width: 320,
      cellClassName: "name-column--cell",
    },
    {
      field: "code",
      headerName: t("Code"),
      width: 300,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <span
            style={{
              background: params.row.code,
              color: "white",
              padding: ".5rem",
              borderRadius: ".2rem",
            }}
          >
            {params.row.code}
          </span>
          <IconButton
            aria-label="Copy Color"
            onClick={() => copyColorToClipboard(params.row.code)}
          >
            <ContentCopyIcon />
          </IconButton>
        </div>
      ),
    },
    {
      field: "actions",
      headerName: t("Actions"),
      width: 400,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            //   flexDirection: sidebarRTL
            //     ? "row-reverse !important"
            //     : "row !important",
            alignItems: "center",
          }}
        >
          {hasPermission("update-color") && (
            <EditColors
              sx={{
                background: `${colors.primary[600]}`,
                m: 4,
              }}
              id={params.row.id}
              pageSize={pageSize}
            />
          )}
          {hasPermission("delete-color") && (
            <CustomDelete
              sx={{
                background: `${colors.redAccent[600]}`,
                //     display: permission.includes("delete-class")
                //       ? "inline-flex"
                //       : "none",
              }}
              action={deletecolor}
              rerenderAction={getColors}
              id={params.id}
              pageSize={pageSize}
            />
          )}
        </Box>
      ),
    },
  ];
  useEffect(() => {
    dispatch(getColors({ pageSize }));
  }, [dispatch, pageSize]);

  const tableData = {
    rows: colorsData.length > 0 && colorsData,
    pageSize: pageSize,
    columns: columns,
    loading: loading,
    onPageSizeChange: (newPageSize) => SetPageSize(newPageSize),
  };
  const copyColorToClipboard = (colorCode) => {
    clipboardCopy(colorCode);
  };
  return (
    <Box m={2}>
      <Box
        flexDirection={sidebarRTL ? "row-reverse" : "row"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title={t("Colors")} />
        {hasPermission("store-color") && <AddColors pageSize={pageSize} />}
      </Box>
      <CustomTableBox
        tableData={tableData}
        action={getColorsSearch}
        CustomPagenation={
          <CustomPagenation
            action={getColorsDataByPage}
            firstPage={firstPage}
            nextPage={nextPage}
            lastPage={lastPage}
            prevPage={prevPage}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        }
      />
    </Box>
  );
};
export default Colors;
