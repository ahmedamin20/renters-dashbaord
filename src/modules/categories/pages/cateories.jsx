import { Avatar, Box, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import CustomLinkButton from "../../../components/CustomLinkButton.jsx";
import CustomLoader from "../../../components/CustomLoader/CustomLoader.jsx";
import CustomPagenation from "../../../components/CustomPagenation/CustomPagenation.jsx";
import CustomToolTip from "../../../components/CustomToolTip/customToolTip.jsx";
import CustomDelete from "../../../components/CutsomDelete/CustomDelete.jsx";
import Header from "../../../components/Header.jsx";
import CustomTableBox from "../../../components/customTableBox/CustomTableBox.jsx";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import { tokens } from "../../../theme.js";
import hasPermission from "../../../utils/haspermission.js";
import {
  deleteCategory,
  fetchcategoriesDataByPage,
  getcategories,
  searchcategories
} from "../redux/categories.js";

const CategoriesTable = () => {
  const data = useSelector((state) => state.categories.categoriesData.data) || [];
  const loading = useSelector((state) => state.categories.loading);
  const firstPage = useSelector((state) => state.categories.categoriesLinks.first);
  const nextPage = useSelector((state) => state.categories.categoriesLinks.next);
  const lastPage = useSelector((state) => state.categories.categoriesLinks.last);
  const prevPage = useSelector((state) => state.categories.categoriesLinks.prev);
  const currentPage = useSelector((state) => state.categories.currentPage);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { sidebarRTL } = useSidebarContext();
  const [pageSize, SetPageSize] = useState(10);
  console.log(data)
  useEffect(() => {
    dispatch(getcategories({ pageSize: pageSize }));
  }, [dispatch, pageSize]);

  const columns = [
    {
      field: "id",
      headerName: t("id"),
      width: 150,
    },
    {
      field: "name",
      headerName: t("Name"),
      width: 200,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.name} />,
    },
   
    {
      field: "Image",
      headerName: t("image"),
      cellClassName: "name-column--cell",
      width: 150,

      renderCell: (params) => (
        <Avatar
          src={params.row.image}
          sx={{ width: 50, height: 50, margin: "1rem auto" }}
        />
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
              action={deleteCategory}
              rerenderAction={getcategories}
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
        <Header title={t("Categories")} />
        {hasPermission("store-blog") && <CustomLinkButton to={'add'} />}
      </Box>
      <CustomTableBox
        tableData={tableData}
        action={searchcategories}
        CustomPagenation={
          <CustomPagenation
            action={fetchcategoriesDataByPage}
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
export default CategoriesTable;
