import React, { useState } from "react";
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
import {
  deleteAdmin,
  fetchAdminDataByPage,
  getAdminEmployee,
  searchAdmin,
} from "../redux/adminEmployee.js";
import DefaultButton from "../../unit/pages/defaultBtn.jsx";
import { Link } from "react-router-dom";
import EditButton from "../../../components/editButton.jsx";
import hasPermission from "../../../utils/haspermission.js";

const AdminEmpolyee = () => {
  const data = useSelector((state) => state.admin.adminData.data) || [];
  const loading = useSelector((state) => state.admin.loading);
  const firstPage = useSelector((state) => state.admin.adminLinks.first);
  const nextPage = useSelector((state) => state.admin.adminLinks.next);
  const lastPage = useSelector((state) => state.admin.adminLinks.last);
  const prevPage = useSelector((state) => state.admin.adminLinks.prev);
  const currentPage = useSelector((state) => state.admin.currentPage);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { sidebarRTL } = useSidebarContext();
  const [pageSize, SetPageSize] = useState(10);

  useEffect(() => {
    dispatch(getAdminEmployee({ pageSize: pageSize }));
  }, [dispatch, pageSize]);

  const columns = [
    {
      field: "id",
      headerName: t("id"),
      width: 200,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.id} />,
    },
    {
      field: "name",
      headerName: t("name"),
      width: 300,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.name} />,
    },
    {
      field: "email",
      headerName: t("email"),
      width: 300,
      renderCell: (params) => <CustomToolTip text={params.row.email} />,
    },
    {
      field: "type",
      headerName: t("user_type"),
      width: 300,
      renderCell: (params) => <CustomToolTip text={t(params.row.type)} />,
    },
    {
      field: "actions",
      headerName: t("Actions"),
      width: 400,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {hasPermission("update-employee") && (
            <Link to={`edit/${params.row.id}`}>
              <EditButton text={t("edit")} />
            </Link>
          )}
          {hasPermission("delete-employee") && (
            <CustomDelete
              sx={{
                background: `${colors.redAccent[600]}`,
              }}
              action={deleteAdmin}
              rerenderAction={getAdminEmployee}
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
        <Header title={t("admin-employee")} />
        {hasPermission("store-employee") && (
          <Link to="add">
            <DefaultButton text={t("add")} />
          </Link>
        )}
      </Box>
      <CustomTableBox
        tableData={tableData}
        action={searchAdmin}
        CustomPagenation={
          <CustomPagenation
            action={fetchAdminDataByPage}
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
export default AdminEmpolyee;
