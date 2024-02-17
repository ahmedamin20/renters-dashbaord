import { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeInfo, searchEmployeeInfo } from "../../redux/Employees.js";
import { t } from "i18next";
import _, { round } from "lodash";
import CustomToolTip from "../../../../components/CustomToolTip/customToolTip.jsx";
import { Box } from "@mui/material";
import CustomTableBox from "../../../../components/customTableBox/CustomTableBox.jsx";
import CustomPagenation from "../../../../components/CustomPagenation/CustomPagenation.jsx";
import Header from "../../../../components/Header.jsx";
import {
  fetchBlogsDataByPage,
  // searchBlogs,
} from "../../../blog/redux/blogs.js";
import { useSidebarContext } from "../../../../pages/global/sidebar/sidebarContext.js";
import CustomYearPicker from "../../../../components/customYearPicker/CustomYearPicker.jsx";
import CustomSelectMenu from "../../../../components/CustomSelect/CustomSelect.jsx";
const EmployeeInfo = () => {
  const { sidebarRTL } = useSidebarContext();
  const nextPage = useSelector((state) => state.Employees.EmployeesLinks.next);
  const lastPage = useSelector((state) => state.Employees.EmployeesLinks.last);
  const prevPage = useSelector((state) => state.Employees.EmployeesLinks.prev);
  const currentPage = useSelector((state) => state.Employees.currentPage);
  const firstPage = useSelector(
    (state) => state.Employees.EmployeesLinks.first
  );
  const dispatch = useDispatch();
  const infoRef = useRef(true);
  const [year, setYear] = useState("");
  const [week, setWeek] = useState("");
  const [pageSize, SetPageSize] = useState(10);
  const loading = useSelector((state) => state.Employees.loading);
  let employeesWorkingMinutes = {};
  const weeksList = _.range(1, 53).map((number) => ({
    id: number,
    name: number,
  }));
  const employeeInfoData =
    useSelector((state) => state.Employees.employeesInfo?.data) || [];

  useEffect(() => {
    dispatch(getEmployeeInfo({ pageSize: pageSize, year: year, week: week }));
  }, [dispatch, infoRef, pageSize, week, year]);

  const columns = [
    {
      field: "id",
      headerName: t("id"),
      width: 80,
    },
    {
      field: "name",
      headerName: t("name"),
      width: 200,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <span style={{ width: "100%", textAlign: "center" }}>
          <CustomToolTip text={params.row.user.name} />
        </span>
      ),
    },
    {
      field: "email",
      headerName: t("email"),
      width: 200,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <span style={{ width: "100%", textAlign: "center" }}>
          <CustomToolTip text={params.row.user.email} />
        </span>
      ),
    },
    {
      field: "phone",
      headerName: t("phone"),
      width: 200,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <span style={{ width: "100%", textAlign: "center" }}>
          <CustomToolTip text={params.row.user.phone} />
        </span>
      ),
    },
    {
      field: "job",
      headerName: t("job"),
      width: 200,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <span style={{ width: "100%", textAlign: "center" }}>
          <CustomToolTip text={params.row.job.name} />
        </span>
      ),
    },
    {
      field: "salary",
      headerName: t("salary"),
      width: 200,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <span style={{ width: "100%", textAlign: "center" }}>
          <CustomToolTip text={round(params.row?.contract?.salary)} />
        </span>
      ),
    },
    {
      field: "allowances_sum_amount",
      headerName: t("allowances_sum_amount"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <span style={{ width: "100%", textAlign: "center" }}>
          <CustomToolTip text={params.row?.allowances_sum_amount} />
        </span>
      ),
    },
    {
      field: "penalties_sum_amount",
      headerName: t("penalties_sum_amount"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <span style={{ width: "100%", textAlign: "center" }}>
          <CustomToolTip text={params.row.penalties_sum_amount} />
        </span>
      ),
    },
    {
      field: "minutes_difference",
      headerName: t("hour_difference"),
      width: 200,
      cellClassName: "name-column--cell",
      renderCell: (params) => {
        if (params.row?.absence_vacations.length) {
          let total = params.row?.absence_vacations
            ?.map((item) => item.minutes_difference)
            ?.reduce((subTotal, carry) => subTotal + carry);

          employeesWorkingMinutes[params.row.id] = total;
          return (
            <span style={{ width: "100%", textAlign: "center" }}>
              {total / 60} ~ {Math.round(total / 60)}
            </span>
          );
        } else {
          return <span style={{ width: "100%", textAlign: "center" }}>__</span>;
        }
      },
    },
    {
      field: "remaining_salary",
      headerName: t("remaining_salary"),
      cellClassName: "name-column--cell",
      width: 200,

      renderCell: ({ row }) => {
        let salary = row.contract.salary;
        let workingShiftMinutes = row.working_shift.working_minutes;

        const totalAllowances = row.allowances_sum_amount;
        const totalPenalties = row.penalties_sum_amount;

        const dailySalary = salary / 30;
        const salaryPerMinute = dailySalary / workingShiftMinutes;

        const employeeWorkingMinutes = employeesWorkingMinutes[row.id];
        const monthlyWorkingSalary = employeeWorkingMinutes * salaryPerMinute;

        const totalEarnings =
          salary + totalAllowances + monthlyWorkingSalary - totalPenalties;

        return (
          <span style={{ width: "100%", textAlign: "center" }}>
            {Number.isFinite(totalEarnings)
              ? Number(totalEarnings).toFixed(2)
              : 0}
          </span>
        );
      },
    },
  ];

  const tableData = {
    rows: employeeInfoData && employeeInfoData,
    pageSize: pageSize,
    columns: columns,
    loading: loading,
    onPageSizeChange: (newPageSize) => SetPageSize(newPageSize),
  };

  const handleYear = (item) => {
    setYear(item?.format("YYYY"));
  };
  const handleWeekChange = (item) => {
    setWeek(item.id);
  };
  return (
    employeeInfoData && (
      <Box m={2}>
        <Box
          flexDirection={sidebarRTL ? "row-reverse" : "row"}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Header title={t("employeeInfo")} />
          <Box
            sx={{
              width: "65%",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <CustomYearPicker onChange={handleYear} />
            <CustomSelectMenu
              lable="week"
              options={weeksList}
              onChange={handleWeekChange}
            />
          </Box>
        </Box>

        <CustomTableBox
          tableData={tableData}
          action={searchEmployeeInfo}
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
    )
  );
};

export default EmployeeInfo;
