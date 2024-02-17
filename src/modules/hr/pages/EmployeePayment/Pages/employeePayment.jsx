import { Box } from "@mui/material";
import {
  fetchEmployeePaymentDataByPage,
  getEmployeePayment,
  removeEmployeePayment,
} from "../redux/employeePayment";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CustomToolTip from "../../../../../components/CustomToolTip/customToolTip";
import CustomDelete from "../../../../../components/CutsomDelete/CustomDelete";
import Header from "../../../../../components/Header";
import CustomPagenation from "../../../../../components/CustomPagenation/CustomPagenation";
import CustomTableBox from "./../../../../../components/customTableBox/CustomTableBox";
import useMainHooks from "./../../../../../hooks/useMainHooks";
import CustomDate from "../../../../../components/CustomDate/CustomDate";
import CustomSelectMenu from "../../../../../components/CustomSelect/CustomSelect";
import {
  getJobsMenu,
  getMyManagermenu,
  getWorkingShifts,
} from "../../../../../redux/select_menus";
import useSelectMenu from "../../../../../hooks/useSelectMenu";
import CustomLinkButton from "../../../../../components/CustomLinkButton";

export default function EmployeePaymentTable() {
  const { t, hasPermission, sidebarRTL, dispatch, colors } = useMainHooks();
  const [pageSize, SetPageSize] = useState();
  const [working_shift_id, setWorkingShift] = useState("");
  const [job_id, setJob_id] = useState("");
  const [employee_id, setEmployee_id] = useState("");
  const [from, setFromDate] = useState("");
  const [to, setToDate] = useState("");
  const workingshiftMenu =
    useSelector((state) => state.selectMenu.workingShiftsmenu.data) || [];
  const JobsMenu = useSelector((state) => state.selectMenu.JobsMenu?.data);

  const { hrEmployeeMenu } = useSelectMenu();

  const workingShiftRef = useRef(true);
  useEffect(() => {
    dispatch(getJobsMenu());

    dispatch(getMyManagermenu());
    dispatch(getWorkingShifts());
  }, [dispatch, workingShiftRef]);

  useEffect(() => {
    dispatch(
      getEmployeePayment({
        job_id,
        to,
        employee_id,
        pageSize,
        working_shift_id,
        from,
      })
    );
  }, [
    working_shift_id,
    pageSize,
    job_id,
    to,
    dispatch,
    employee_id,
    workingShiftRef,
    from,
  ]);

  const columns = [
    {field : 'id',
    headerName: t("id"),
    width: 300,
    cellClassName: "name-column--cell",

  },
    {
      field: "employee",
      headerName: t("employee"),
      width: 300,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <CustomToolTip text={params.row.employee?.user.name} />
      ),
    },
    {
      field: "amount",
      headerName: t("amount"),
      width: 300,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.amount} />,
    },

    {
      field: "created_at",
      headerName: t("created_at"),
      width: 300,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <CustomToolTip text={params.row.created_at.split(" ")[0]} />
      ),
    },
    {
      field: "type",
      headerName: t("type"),
      width: 300,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.type} />,
    },
    {
      field: "money_payer_name",
      headerName: t("money_payer_name"),
      width: 300,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.money_payer_name} />,
    },  {
      field: "money_receiver_name",
      headerName: t("money_receiver_name"),
      width: 300,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.money_receiver_name} />,
    },
    {
      field: "check_number",
      headerName: t("check_number"),
      width: 300,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.check_number} />,
    },
    {
      field: "actions",
      headerName: t("Actions"),
      width: 300,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* {hasPermission("update-car_fix") && ( */}
          {/* <EmployeePaymentForm
            amount={params.row.amount}
            date={params.row.created_at}
            id={params.row.id}
            employee_id={params.row.employee?.user.id}
          /> */}
          <CustomLinkButton to={'edit'} params={params.row.id} />
          {/* )} */}
          {hasPermission("delete-garage") && (
            <CustomDelete
              sx={{
                background: `${colors.redAccent[600]}`,
              }}
              action={removeEmployeePayment}
              rerenderAction={getEmployeePayment}
              id={params.id}
              pageSize={pageSize}
            />
          )}
        </Box>
      ),
    },
  ];

  const employeeData = useSelector((state) => state.employeePayment),
    allTableData = employeeData?.employeePayment || [],
    employeeLinks = employeeData?.links;
  console.log(employeeLinks, "employeeData");
  const tableData = {
    rows: allTableData || [],
    pageSize: pageSize,
    columns: columns,
    loading: employeeData?.loading,
    onPageSizeChange: (newPageSize) => SetPageSize(newPageSize),
  };
  const handleSelect = (item) => {
    setWorkingShift(item?.id);
  };
  const handelDateChange = (item) => {
    setFromDate(item?.format("YYYY-MM-DD"));
  };
  return (
    <Box m={2}>
      <Box
        flexDirection={sidebarRTL ? "row-reverse" : "row"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title={t("employeesPyament")} />

        {/* <SafeBudget safeBudget={budget} /> */}
        {/* {hasPermission("store-car_fix") && <EmployeePaymentForm />} */}
        {hasPermission("store-car_fix") && <CustomLinkButton to={'add'} />}
      </Box>
      <Box
        sx={{
          display: "flex",
        gap:"10px",

          justifyContent: "space-evenly",
        }}
      >
        <CustomDate
          width={"70%"}
          name="from"
          title="from"
          onChange={handelDateChange}
        />
        <CustomDate
          width={"70%"}
          name="to"
          title="to"
          onChange={(item) => setToDate(item?.format("YYYY-MM-DD"))}
        />
        <CustomSelectMenu
          lable="working_shift_name"
          options={workingshiftMenu}
          onChange={handleSelect}
        />
        <CustomSelectMenu
          lable="job"
          options={JobsMenu}
          onChange={(item) => setJob_id(item?.id)}
        />
        <CustomSelectMenu
          lable="employee"
          options={hrEmployeeMenu}
          name="employee_id"
          onChange={(item) => setEmployee_id(item?.id)}
        />
      </Box>

      <CustomTableBox
        tableData={tableData}
        action={getEmployeePayment}
        CustomPagenation={
          <CustomPagenation
            action={fetchEmployeePaymentDataByPage}
            firstPage={employeeLinks?.first}
            nextPage={employeeLinks?.next}
            lastPage={employeeLinks?.last}
            prevPage={employeeLinks?.prev}
            currentPage={employeeData?.currentPage}
            pageSize={pageSize}
          />
        }
      />
      {/* <PredictModel /> */}
    </Box>
  );
}
