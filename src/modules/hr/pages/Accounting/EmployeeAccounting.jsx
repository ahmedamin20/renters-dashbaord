import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getEmployeeAccounting } from "../../../../redux/emoloyee-accounting-Slice";
import CustomToolTip from "../../../../components/CustomToolTip/customToolTip";
import { round } from "lodash";
import { Box } from "@mui/material";

import CustomTableBox from "../../../../components/customTableBox/CustomTableBox";
import CustomPagenation from "../../../../components/CustomPagenation/CustomPagenation";
import Header from "../../../../components/Header";
import CustomSelectMenu from "../../../../components/CustomSelect/CustomSelect.jsx";
import CustomDate from "./../../../../components/CustomDate/CustomDate";
import { getMyManagermenu } from "../../../../redux/select_menus.js";
import useMainHooks from "../../../../hooks/useMainHooks.jsx";

export default function EmployeeAccounting() {
  const [pageSize, SetPageSize] = useState(10);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const { dispatch, sidebarRTL, t } = useMainHooks();
  useEffect(() => {
    dispatch(getMyManagermenu());
    dispatch(
      getEmployeeAccounting({
        page: pageSize,
        from: fromDate,
        to: toDate,
        employee_id: selectedEmployee,
      })
    );
  }, [dispatch, pageSize, fromDate, selectedEmployee, toDate]);
  const employeeAccountingData = useSelector(
    (state) => state.employeeAccountingReducer
  );
  console.log(employeeAccountingData, "employeeAccountingData");
  const employeeNamesList = useSelector(
    (state) => state.selectMenu.MyManagermenu.data
  );
  const columns = [
    {
      field: "id",
      headerName: t("id"),
      width: 300,
      renderCell: (params) => (
        <span>
          <CustomToolTip text={params.row.employee.id} />
        </span>
      ),
    },
    {
      field: "name",
      headerName: t("name"),
      width: 300,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <span style={{ width: "100%", textAlign: "center" }}>
          <CustomToolTip text={params.row.employee.user.name} />
        </span>
      ),
    },
    {
      field: "created_at",
      headerName: t("created_at"),
      width: 300,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.created_at} />,
    },
    {
      field: "amount",
      headerName: t("amount"),
      width: 350,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <span style={{ width: "100%", textAlign: "center" }}>
          <CustomToolTip text={round(params.row?.amount)} />
        </span>
      ),
    },
  ];

  const tableData = {
    rows: employeeAccountingData?.data ? employeeAccountingData?.data : [],
    pageSize: pageSize,
    columns: columns,
    loading: employeeAccountingData.loading,
    onPageSizeChange: (newPageSize) => SetPageSize(newPageSize),
  };
  const handleEmployeeNameChange = (employee) => {
    if (employee?.id) {
      setSelectedEmployee(employee.id);
    } else {
      setSelectedEmployee(null);
    }
  };
  const handelFromDate = (date) => {
    setFromDate(date.format("YYYY-MM-DD"));
  };
  const handelToDate = (date) => {
    setToDate(date.format("YYYY-MM-DD"));
  };

  return (
    <Box>
      <Box m={2}>
        <Box
          flexDirection={sidebarRTL ? "row-reverse" : "row"}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Header title={t("employeeAccounting")} />
          <Box
            sx={{
              width: "65%",
              display: "flex",
              gap: 2,
              justifyContent: "space-evenly",
            }}
          >
            <Box width={"40%"}>
              <CustomSelectMenu
                lable="Employee Name"
                fullWidth={true}
                options={employeeNamesList}
                onChange={handleEmployeeNameChange}
              />
            </Box>

            <CustomDate onChange={handelFromDate} title="from" />
            <CustomDate onChange={handelToDate} title="to" />
          </Box>
        </Box>
      </Box>
      <CustomTableBox
        tableData={tableData}
        //   action={searchEmployeeInfo}
        CustomPagenation={
          <CustomPagenation
            action={getEmployeeAccounting}
            firstPage={employeeAccountingData?.meta?.links?.first}
            nextPage={employeeAccountingData?.meta?.links?.next}
            lastPage={employeeAccountingData?.meta?.links?.last}
            prevPage={employeeAccountingData?.meta?.links?.prev}
            currentPage={employeeAccountingData?.meta?.meta?.current_page}
            pageSize={pageSize}
          />
        }
      />
    </Box>
  );
}
