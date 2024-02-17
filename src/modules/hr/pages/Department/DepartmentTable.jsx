import { useEffect, useRef, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../../../theme.js";
import Header from "../../../../components/Header.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../../../pages/global/sidebar/sidebarContext.js";
import CustomTableBox from "../../../../components/customTableBox/CustomTableBox.jsx";
import CustomPagenation from "../../../../components/CustomPagenation/CustomPagenation.jsx";
import CustomDelete from "../../../../components/CutsomDelete/CustomDelete.jsx";
import {
  deleteDepartment,
  fetchDepartmentDataByPage,
  getDepartmentData,
  searchDepartmentData,
} from "../../redux/Department.js";
import hasPermission from "../../../../utils/haspermission.js";
import { getMyManagermenu } from "../../../../redux/select_menus.js";
import CustomLinkButton from "../../../../components/CustomLinkButton.jsx";

const DepartmentTable = () => {
  const dispatch = useDispatch();
  const nextPage = useSelector(
    (state) => state.Department.DepartmentLinks.next
  );
  const lastPage = useSelector(
    (state) => state.Department.DepartmentLinks.last
  );
  const prevPage = useSelector(
    (state) => state.Department.DepartmentLinks.prev
  );
  const currentPage = useSelector((state) => state.Department.currentPage);
  const firstPage = useSelector(
    (state) => state.Department.DepartmentLinks.first
  );
  const { sidebarRTL } = useSidebarContext();
  const { t } = useTranslation();
  const [pageSize, setPageSize] = useState(10);
  const loading = useSelector((state) => state.Department.loading);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const data = useSelector(
    (state) => state.Department.DepartmentData.data || []
  );
    console.log(data);
  const columns = [
    { field: "id", headerName: t("ID"), width:150 },
    {
      field: "name",
      headerName: t("Name"),
      width:250,
      cellClassName: "name-column--cell",
    },
    {
      field: "parent_department",
      headerName: t("parent_department"),
      width:250,
      cellClassName: "name-column--cell",
      renderCell: (params) => <>{params.row?.parent_department?.user?.name}</>,

    },
    {
      field: "managerName",
      headerName: t("managerName"),
      width:250,

      cellClassName: "name-column--cell",
      renderCell: (params) => <>{params.row?.manager?.user?.name}</>,
    },

    {
      field: "actions",
      headerName: t("Actions"),
      width:350,

      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: sidebarRTL
              ? "row-reverse !important"
              : "row !important",
            alignItems: "center",
            // justifyContent: "space-evenly",
            gap: "10px",
          }}
        >
          {hasPermission("show-departments") && (
            // <EditDepartment
            //   sx={{
            //     backGround: `${colors.grey[600]}`,
            //   }}
            //   pageSize={pageSize}
            //   id={params.id}
            //   manager_id={params.row.manager?.id}
            //   color={params.row.color || ""}
            //   name={params.row.name}
            // />
            <CustomLinkButton to={'edit'} params={params.row.id} />
          )}
          {hasPermission("delete-departments") && (
            <CustomDelete
              sx={{
                background: `${colors.redAccent[600]}`,
              }}
              // icon={<DeleteIcon />}
              id={params.id}
              action={deleteDepartment}
              pageSize={pageSize}
              rerenderAction={getDepartmentData}
            />
          )}
        </Box>
      ),
    },
  ];
  const tableData = {
    rows: data.length > 0 && data,
    columns: columns,
    loading: loading,
    pageSize: pageSize,
    onPageSizeChange: (newPageSize) => setPageSize(newPageSize),
  };
  const departmentRef = useRef(true);
  useEffect(() => {
    dispatch(getDepartmentData({ pageSize: pageSize }));
  }, [dispatch, pageSize, departmentRef]);
  const managerRef = useRef(true);
  useEffect(() => {
    dispatch(getMyManagermenu());
  }, [dispatch, managerRef]);
  return (
    <Box m="20px">
      <Box
        display="flex"
        dir={sidebarRTL ? "rtl" : "ltr"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title={t("Departments")} />

        {hasPermission("store-departments") && <CustomLinkButton to={'add'} />}
      </Box>
      <CustomTableBox
        tableData={tableData}
        action={searchDepartmentData}
        CustomPagenation={
          <CustomPagenation
            pageSize={pageSize}
            nextPage={nextPage}
            lastPage={lastPage}
            prevPage={prevPage}
            currentPage={currentPage}
            firstPage={firstPage}
            action={fetchDepartmentDataByPage}
          />
        }
      />
    </Box>
  );
};
export default DepartmentTable;
