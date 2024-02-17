import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EastIcon from "@mui/icons-material/East";
import { useRef } from "react";
import { fetchVacationsDataByPage } from "../../redux/vacations.js";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../../../pages/global/sidebar/sidebarContext.js";
import CustomToolTip from "../../../../components/CustomToolTip/customToolTip.jsx";
import Header from "../../../../components/Header.jsx";
import CustomTableBox from "../../../../components/customTableBox/CustomTableBox.jsx";
import CustomPagenation from "../../../../components/CustomPagenation/CustomPagenation.jsx";
import {
  absenceSearch,
  getAbsence,
  getOneAbsence,
  getWeekInfo,
} from "../../redux/absence.js";
import WestIcon from "@mui/icons-material/West";
import AbsenceDialog from "./model.jsx";
import CustomYearPicker from "../../../../components/customYearPicker/CustomYearPicker.jsx";
import CustomSelectMenu from "../../../../components/CustomSelect/CustomSelect.jsx";
import { getWorkingShifts } from "../../../../redux/select_menus.js";
import _ from "lodash";
import { absenceTypesEnum } from "./absenceTypes.js";
import UpdateAbsences from "./UpdateAbsences.jsx";

const Absence = () => {
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState("");
  const [EmployeeId, setEmployeeId] = useState(null);
  const [weekFilter, setWeekFilter] = useState("");
  const [date, setDate] = useState("");
  const [WorkingShift, setWorkingShift] = useState("");
  const data = useSelector((state) => state.absence.absenceData.data) || [];
  const workingshiftMenu =
    useSelector((state) => state.selectMenu.workingShiftsmenu.data) || [];
  const weekInfoData =
    useSelector((state) => state.absence.weekInfoData.data) || [];
  const loading = useSelector((state) => state.absence.loading);
  const firstPage = useSelector(
    (state) => state.vacations.vacationsLinks.first
  );
  const nextPage = useSelector((state) => state.absence.absenceLinks.next);
  const lastPage = useSelector((state) => state.absence.absenceLinks.last);
  const prevPage = useSelector((state) => state.absence.absenceLinks.prev);
  const currentPage = useSelector((state) => state.absence.currentPage);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { sidebarRTL } = useSidebarContext();
  const [pageSize, SetPageSize] = useState(10);
  const vacationsRef = useRef();
  useEffect(() => {
    dispatch(
      getAbsence({
        week: weekFilter,
        pageSize: pageSize,
        year: year,
        WorkingShift: WorkingShift,
      })
    );
  }, [dispatch, pageSize, vacationsRef, year, WorkingShift, weekFilter]);
  const weekRef = useRef(true);

  const handleOpen = () => {
    setOpen(!open);
  };

  const getBackgroundColor = (type) => {
    switch (type) {
      case absenceTypesEnum.ATTENDED:
        return "#00ff00";
      case absenceTypesEnum.ABSENCE:
        return "#8e0606";
      case absenceTypesEnum.HOLIDAY:
        return "#0c69ff";
      case absenceTypesEnum.OCCASION:
        return "#d0b905";
      case absenceTypesEnum.PATIENT:
        return "#01efff";
      case absenceTypesEnum.PERMISSION:
        return "#7f7f7f";
      default:
        return "initial";
    }
  };
  const handleDispatch = ({ id, empId, created_at }) => {
    if (id) {
      dispatch(getOneAbsence(id));
    }

    setEmployeeId(empId);
    setDate(created_at);
  };

  useEffect(() => {
    dispatch(getWeekInfo());
  }, [dispatch, weekRef]);

  const workingShiftRef = useRef(true);
  useEffect(() => {
    dispatch(getWorkingShifts());
  }, [dispatch, workingShiftRef]);

  const weekStartDate = weekInfoData?.week_starts_at;
  let tempStartDate = new Date(weekStartDate);

  let dates = [];
  for (let i = 0; i < 7; i++) {
    let x = tempStartDate.toLocaleDateString().split("/");
    const tmpItem = x[0]?.length === 1 ? "0" + x[0] : x[0];
    // console.log(,"x")
    x[0] = x[1];
    x[1] = tmpItem;
    dates.push(x.reverse().join("-"));
    tempStartDate.setDate(tempStartDate.getDate() + 1);
  }
  let employeesAbsences = {};
  const x = data?.map(function (employee) {
    const tmpDates = {};
    let totalMinutes = 0;
    let tmpEmployee = { ...employee };

    dates.forEach((date) => (tmpDates[date] = {}));

    employee.absence_vacations.forEach(function (absence) {
      tmpDates[absence.created_at] = absence;
      totalMinutes += absence.minutes_difference;
    });

    employeesAbsences[employee.id] = tmpDates;
    tmpEmployee.absence_vacations = tmpDates;
    tmpEmployee.total_employee_minutes = totalMinutes;
    return tmpEmployee;
  });
  // dates?.
  let weekDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  const columns = [
    ...[
      {
        field: "name",
        headerName: t("employee_name"),
        width: 250,
        cellClassName: "name-column--cell",
        renderCell: (params) => <CustomToolTip text={params.row.user.name} />,
      },
    ],
    ...weekDays.map(function (weekDay, index) {
      return {
        field: weekDay,
        headerName: t(weekDay),
        width: 280,

        renderCell: function (params) {
          let item = employeesAbsences[params.row.id][dates[index]];
          let type = item.type;
          return (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                width: "100%",
                height: "100%",
                padding: "1rem",
                borderRadius: ".5rem",
                backgroundColor: getBackgroundColor(type),
              }}
              onClick={() => {
                handleOpen();
                handleDispatch({
                  id: item.id,
                  created_at: dates[index],
                  empId: params.row.id,
                });
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {item.attended_at && (
                  <span>
                    <EastIcon sx={{ color: "green" }} />
                    {item.attended_at || "_"}
                  </span>
                )}
                <span>{item.rest_minutes || "_"}</span>
                {item.departure_at && (
                  <span>
                    <WestIcon sx={{ color: "red" }} />
                    {item.departure_at || "_"}
                  </span>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span>
                  <EastIcon sx={{ color: "green" }} />
                  {params.row.working_shift.starts_at}
                </span>
                <span>{item.rest_minutes}</span>
                <span>
                  <WestIcon sx={{ color: "red" }} />
                  {params.row.working_shift.ends_at}
                </span>
              </div>
            </Box>
          );
        },
      };
    }),
    ...[
      {
        field: "total_employee_minutes",
        headerName: t("total_employee_hour"),
        width: 250,
        cellClassName: "name-column--cell",
        renderCell: (params) =>
          (Number(params.row.working_shift.working_minutes) / 60).toFixed(2),
      },
    ],
  ];

  const tableData = {
    rows: x.length > 0 && x,
    pageSize: pageSize,
    columns: columns,
    loading: loading,
    rowHeight: 100,
    onPageSizeChange: (newPageSize) => SetPageSize(newPageSize),
  };
  const handleYear = (item) => {
    setYear(item?.format("YYYY"));
  };
  const handleSelect = (item) => {
    setWorkingShift(item?.id);
  };
  const weeksList = _.range(1, 49).map((number) => ({
    id: number,
    name: number,
  }));
  function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return weekNo;
  }

  var weekNum = getWeekNumber(new Date());
  return (
    <Box m={2}>
      <Header title={t("Absence")} />

      <Box
        flexDirection={sidebarRTL ? "row-reverse" : "row"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          width: "100%",
          display: "flex",
          gap: "20px",
          justifyContent: "space-evenly",
          mb: "20px",
        }}
      >
        <AbsenceDialog
          date={date}
          id={EmployeeId}
          handleOpen={handleOpen}
          open={open}
        />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: "20px",
            justifyContent: "space-evenly",
            mb: "20px",
          }}
        >
          <UpdateAbsences />

          <Box display={'flex'} alignItems={'flex-end'}>
            <CustomYearPicker onChange={handleYear} />
          </Box>
          <Box>
            <CustomSelectMenu
              lable="working_shift_name"
              options={workingshiftMenu}
              onChange={handleSelect}
            />
          </Box>
          <Box>
            <CustomSelectMenu
              lable="week"
              options={weeksList}
              defaultData={weekFilter || weekNum}
              onChange={(event) => setWeekFilter(event?.id)}
            />
          </Box>
        </Box>
      </Box>
      <Header
        title={`${t("week_number")} ${t("current")}  ${weekFilter || weekNum}`}
      />
      <CustomTableBox
        tableData={tableData}
        action={absenceSearch}
        CustomPagenation={
          <CustomPagenation
            action={fetchVacationsDataByPage}
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
  );
};
export default Absence;
