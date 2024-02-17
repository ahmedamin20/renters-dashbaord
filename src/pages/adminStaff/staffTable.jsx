import React, { useEffect } from "react";
import { Box, ButtonGroup, LinearProgress, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import StaffForm from "./staffForm";
import { useDispatch, useSelector } from "react-redux";
import { stuffData } from "../../redux/stuff";
import EditIcon from "@mui/icons-material/Edit";
import RemoveStaffBtn from "./deleteStaff";
import DeleteIcon from "@mui/icons-material/Delete";
import StaffEdit from "./editStaff";
import { useState } from "react";
import { useSidebarContext } from "../global/sidebar/sidebarContext";
import { useTranslation } from "react-i18next";
import CustomTableBox from "../../components/customTableBox/CustomTableBox";
import CustomPagenation from "../../components/CustomPagenation/CustomPagenation";

const StaffTable = () => {
  const nextPage = useSelector((state) => state.stuff.stuffLinks.next);
  const lastPage = useSelector((state) => state.stuff.stuffLinks.last);
  const prevPage = useSelector((state) => state.stuff.stuffLinks.prev);
  const currentPage = useSelector((state) => state.stuff.currentPage);
  const firstPage = useSelector((state) => state.stuff.stuffLinks.first);
  const permission =
    useSelector((state) => state.user.userInfo.data.permissions) || [];
  const { t } = useTranslation();
  const [pageSize, setPageSize] = useState(10);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.stuff.loading);
  const staffData = useSelector((state) => state.stuff.stuff.data);
  const { sidebarRTL } = useSidebarContext();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const info = {
      pageSize,
    };
    dispatch(stuffData(info));
  }, [dispatch, pageSize]);

  const userNameWidth =
    permission.includes("update-admin_employee") &&
    permission.includes("delete-admin_employee")
      ? 180
      : 425;
  const nameWidth =
    permission.includes("update-admin_employee") &&
    permission.includes("delete-admin_employee")
      ? 200
      : 425;
  const idWidth =
    permission.includes("update-admin_employee") &&
    permission.includes("delete-admin_employee")
      ? 120
      : 380;

  const columns = [
    { field: "id", headerName: t("ID"), width: idWidth },
    {
      field: "name",
      headerName: t("Name"),
      width: nameWidth,
      cellClassName: "name-column--cell",
    },
    { field: "username", headerName: t("Username"), width: userNameWidth },
    {
      field: "role",
      headerName: t("Role"),
      width: 200,
      renderCell: (param) => <span>{param.row.role.name}</span>,
    },
    ...(permission.includes("update-admin_employee") &&
    permission.includes("delete-admin_employee")
      ? [
          {
            field: "actions",
            headerName: t("Actions"),
            width: 350,
            renderCell: (params) => (
              <ButtonGroup
                sx={{
                  display: "flex",
                  flexDirection: sidebarRTL
                    ? "row-reverse !important"
                    : "row !important",
                  alignItems: "center",
                }}
              >
                <StaffEdit
                  sx={{
                    background: `${colors.primary[600]}`,
                    display: permission.includes("update-admin_employee")
                      ? "inline-flex"
                      : "none",
                  }}
                  ID={params.id}
                  icon={<EditIcon />}
                  pageSize={pageSize}
                  name={params.row.name}
                  userName={params.row.username}
                  oldRole={params.row.role}
                />
                <RemoveStaffBtn
                  pageSize={pageSize}
                  sx={{
                    background: `${colors.redAccent[600]}`,
                    display: permission.includes("delete-admin_employee")
                      ? "inline-flex"
                      : "none",
                  }}
                  icon={<DeleteIcon />}
                  id={params.id}
                />
              </ButtonGroup>
            ),
          },
        ]
      : []),
  ];
  const tableData = {
    rows:staffData && staffData.length ? staffData : [],
    columns: columns,
    loading:loading,
    pageSize: pageSize,
    onPageSizeChange:(newPageSize) => setPageSize(newPageSize)
}
  return (
    <Box m="20px">
      <Box
        display="flex"
        flexDirection={sidebarRTL ? "row-reverse" : "row"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title={t("Administration Staff")} />
        <StaffForm
          show={permission.includes("store-admin_employee")}
          pageSize={pageSize}
        />
      </Box>
      <CustomTableBox 
        tableData={tableData}
        CustomPagenation={
          <CustomPagenation 
            currentPage={currentPage}
            prevPage={prevPage}
            lastPage={lastPage}
            nextPage={nextPage}
            firstPage={firstPage}
            pageSize={pageSize}
          />
        }
      />
    </Box>
  );
};

export default StaffTable;
