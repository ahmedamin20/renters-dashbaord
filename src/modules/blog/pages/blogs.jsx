import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, useTheme } from "@mui/material";
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
import {
  deleteBlog,
  fetchBlogsDataByPage,
  getBlogs,
  searchBlogs,
} from "../redux/blogs.js";
import CustomLinkButton from "../../../components/CustomLinkButton.jsx";

const Blogs = () => {
  const data = useSelector((state) => state.Blogs.BlogsData.data) || [];
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

  useEffect(() => {
    dispatch(getBlogs({ pageSize: pageSize }));
  }, [dispatch, pageSize]);

  const columns = [
    {
      field: "id",
      headerName: t("id"),
      width: 150,
    },
    {
      field: "title",
      headerName: t("title"),
      width: 200,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.title} />,
    },
    {
      field: "description",
      headerName: t("description"),
      width: 400,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.description} />,
    },
    {
      field: "blogImage",
      headerName: t("blogImage"),
      cellClassName: "name-column--cell",
      width: 150,

      renderCell: (params) => (
        <Avatar
          src={params.row.blogImage}
          sx={{ width: 50, height: 50, margin: "1rem auto" }}
        />
      ),
    },
    {
      field: "created_at",
      headerName: t("created_at"),
      cellClassName: "name-column--cell",
           width: 400,

      renderCell: (params) => <CustomToolTip text={params.row.created_at} />,
    },
    {
      field: "actions",
      headerName: t("Actions"),
           width: 400,

      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
          }}
        >
          {hasPermission("update-blog") && <CustomLinkButton to='edit' params={params.row.id} />}
          {hasPermission("delete-blog") && (
            <CustomDelete
              sx={{
                background: `${colors.redAccent[600]}`,
              }}
              action={deleteBlog}
              rerenderAction={getBlogs}
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
        <Header title={t("Blogs")} />
        {hasPermission("store-blog") && <CustomLinkButton to={'add'} />}
      </Box>
      <CustomTableBox
        tableData={tableData}
        action={searchBlogs}
        CustomPagenation={
          <CustomPagenation
            action={fetchBlogsDataByPage}
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
export default Blogs;
