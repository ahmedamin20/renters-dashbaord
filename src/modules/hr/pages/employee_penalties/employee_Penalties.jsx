import { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, useTheme } from "@mui/material";
import CustomTableBox from "../../../../components/customTableBox/CustomTableBox.jsx";
import Header from "../../../../components/Header.jsx";
import CustomPagenation from "../../../../components/CustomPagenation/CustomPagenation.jsx";
import CustomDelete from "../../../../components/CutsomDelete/CustomDelete.jsx";
import CustomToolTip from "../../../../components/CustomToolTip/customToolTip.jsx";
import CustomLoader from "../../../../components/CustomLoader/CustomLoader.jsx";
import hasPermission from "../../../../utils/haspermission.js";
import {
  deleteEmployeePenalties,
  fetchEmployeePenaltiesDataByPage,
  getEmployeePenaltiesData,
  searchEmployeePenalties,
} from "../../redux/EmployeePenalties.js";

import {
  getEmployeePenalties,
  getMyManagermenu,
} from "../../../../redux/select_menus.js";
import CustomLinkButton from "../../../../components/CustomLinkButton.jsx";
import useMainHooks from "../../../../hooks/useMainHooks.jsx";

const EmployeePenalties = () => {
  const data =
    useSelector((state) => state.employeePenalties.employeePenalties.data) ||
    [];
  const loading = useSelector((state) => state.employeePenalties.loading);
  const firstPage = useSelector(
    (state) => state.employeePenalties.employeePenaltiesLinks.first
  );
  const nextPage = useSelector(
    (state) => state.employeePenalties.employeePenaltiesLinks.next
  );
  const lastPage = useSelector(
    (state) => state.employeePenalties.employeePenaltiesLinks.last
  );
  const prevPage = useSelector(
    (state) => state.employeePenalties.employeePenaltiesLinks.prev
  );
  const currentPage = useSelector(
    (state) => state.employeePenalties.currentPage
  );

  const {t,dispatch,colors,sidebarRTL} = useMainHooks()
  const [pageSize, SetPageSize] = useState(10);

  const employeeRef = useRef(true);

  useEffect(() => {
    dispatch(getEmployeePenalties());
    dispatch(getMyManagermenu());
  }, [employeeRef, dispatch]);

  useEffect(() => {
    dispatch(getEmployeePenaltiesData({ pageSize: pageSize }));
  }, [dispatch, pageSize]);

  const columns = [
    {
      field: "id",
      headerName: t("id"),
      width: 220,
    },
    {
      field: "amount",
      headerName: t("amount"),
      width: 320,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.amount} />,
    },
    {
      field: "employee",
      headerName: t("employee"),
      width: 200,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <CustomToolTip text={params.row.employee.user.name} />
      ),
    },
    {
      field: "reason",
      headerName: t("reason"),
      width: 550,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.reason} />,
    },
    {
      field: "type",
      headerName: t("type"),
      width: 120,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.type} />,
    },
    {
      field: "allowancePenaltyType",
      headerName: t("penalty_type"),
      width: 180,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <CustomToolTip text={params.row.allowancePenaltyType.name} />
      ),
    },
    {
      field: "actions",
      headerName: t("Actions"),
      width: 300,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
          }}
        >
          {hasPermission("show-employees_penalties") && (
            <CustomLinkButton to={"edit"} params={`${params.row.id}`} />
          )}

          {hasPermission("delete-employees_penalties") && (
            <CustomDelete
              sx={{
                background: `${colors.redAccent[600]}`,
              }}
              action={deleteEmployeePenalties}
              rerenderAction={getEmployeePenaltiesData}
              id={params.id}
              pageSize={pageSize}
            />
          )}

          {/* )} */}
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
        <Header title={t("employees_penalties")} />
        {hasPermission("store-employees_penalties") && (
          <>
            <CustomLinkButton to={"add"} />
          </>
        )}
      </Box>
      <CustomTableBox
        tableData={tableData}
        action={searchEmployeePenalties}
        CustomPagenation={
          <CustomPagenation
            action={fetchEmployeePenaltiesDataByPage}
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
export default EmployeePenalties;
