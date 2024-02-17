import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, useTheme } from "@mui/material";
import CustomTableBox from "../../../components/customTableBox/CustomTableBox.jsx";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import Header from "../../../components/Header.jsx";
import { useTranslation } from "react-i18next";
import CustomPagenation from "../../../components/CustomPagenation/CustomPagenation.jsx";
import CustomDelete from "../../../components/CutsomDelete/CustomDelete.jsx";
import { tokens } from "../../../theme.js";
import CustomToolTip from "../../../components/CustomToolTip/customToolTip.jsx";
import CustomLoader from "../../../components/CustomLoader/CustomLoader.jsx";
import hasPermission from "../../../utils/haspermission.js";
import AddBlog from "./addSections.jsx";
import {
  deleteSection,
  fetchSectionsDataByPage,
  getSections,
  searchSections,
} from "../redux/sections.js";
import EditSection from "./editSections.jsx";

const Sections = () => {
  const data = useSelector((state) => state.section.sectionsData.data) || [];
  const loading = useSelector((state) => state.Blogs.loading);
  const firstPage = useSelector((state) => state.Blogs.BlogsLinks.first);
  const nextPage = useSelector((state) => state.Blogs.BlogsLinks.next);
  const lastPage = useSelector((state) => state.Blogs.BlogsLinks.last);
  const prevPage = useSelector((state) => state.Blogs.BlogsLinks.prev);
  const currentPage = useSelector((state) => state.Blogs.currentPage);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { sidebarRTL } = useSidebarContext();
  const [pageSize, SetPageSize] = useState(10);
  const sectionsRef = useRef(true);
  useEffect(() => {
    dispatch(getSections({ pageSize: pageSize }));
  }, [dispatch, pageSize, sectionsRef]);

  const columns = [
    {
      field: "id",
      headerName: t("id"),
      width: 400,
    },
    {
      field: "title",
      headerName: t("title"),
      width: 400,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.title} />,
    },
    {
      field: "actions",
      headerName: t("Actions"),
      width: 600,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
          }}
        >
          {hasPermission("update-section") && (
            <EditSection id={params.row.id} defaultTitle={params.row.title} />
          )}
          {hasPermission("delete-section") && (
            <CustomDelete
              sx={{
                background: `${colors.redAccent[600]}`,
              }}
              action={deleteSection}
              rerenderAction={getSections}
              id={params.id}
              pageSize={pageSize}
            />
          )}
        </Box>
      ),
    },
  ];

  const tableData = {
    rows: data.length > 0 && data,
    pageSize: pageSize,
    columns: columns,
    loading: loading,
    onPageSizeChange: (newPageSize) => SetPageSize(newPageSize),
  };

  return !loading ? (
    <Box m={2}>
      <Box
        flexDirection={sidebarRTL ? "row-reverse" : "row"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title={t("sections")} />
        {hasPermission("store-section") && <AddBlog />}
      </Box>
      <CustomTableBox
        tableData={tableData}
        action={searchSections}
        CustomPagenation={
          <CustomPagenation
            action={fetchSectionsDataByPage}
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
  ) : (
    <CustomLoader />
  );
};
export default Sections;
