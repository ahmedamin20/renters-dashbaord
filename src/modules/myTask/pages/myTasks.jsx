import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, ButtonGroup, useTheme } from "@mui/material";
import CustomTableBox from "../../../components/customTableBox/CustomTableBox.jsx";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import Header from "../../../components/Header.jsx";
import { useTranslation } from "react-i18next";
import { tokens } from "../../../theme.js";
import CustomToolTip from "../../../components/CustomToolTip/customToolTip.jsx";
import {  getTasks, searchTasks } from "../../task/redux/tasks.js";
import { StatuseCode } from "../../../statuseCodes.js";
import CustomDate from "../../../components/CustomDate/CustomDate.jsx";
import CustomSelectMenu from "../../../components/CustomSelect/CustomSelect.jsx";
import { tasksTypes } from "./taskTypeArray.js";
import CustomLoader from "../../../components/CustomLoader/CustomLoader.jsx";
import { taskTypes } from "../../../enums/taskTypeEnum.js";
import WriteNote from "./writeNote.jsx";
import { approveMyTasks, getMytasks } from "../redux/myTasks.js";

const MyTasks = () => {
  const data = useSelector((state) => state.myTasks.myTasksData.data) || [];
  const loading = useSelector((state) => state.myTasks.loading);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { sidebarRTL } = useSidebarContext();
  const [pageSize, SetPageSize] = useState(10);

  const handleFromDateChange = (e) => {
    setFromDate(e.format("YYYY-MM-DD"));
  };
  const handleToDateChange = (e) => {
    setToDate(e.format("YYYY-MM-DD"));
  };
  const [overDue, setOverDue] = useState(0);
  const handleTaskTypeChange = (e) => {
    setOverDue(e?.id);
  };

  useEffect(() => {
    dispatch(
      getMytasks({
        pageSize: pageSize,
        from: fromDate,
        to: toDate,
        overdue_only: overDue,
      })
    );
  }, [dispatch, pageSize, overDue, fromDate, toDate]);
  const handleApprove = (id) => {
    dispatch(approveMyTasks(id)).then((res) =>
      res.payload.code === StatuseCode.OK
        ? dispatch(getTasks({ pageSize: pageSize }))
        : null
    );
  };
  const columns = [
    {
      field: "id",
      headerName: t("id"),
      width: 80,
    },
    {
      field: "title",
      headerName: t("title"),
      width: 150,
      cellClassName: "title-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.title} />,
    },
    {
      field: "type",
      cellClassName: "name-column--cell",
      width: 100,
      renderCell: (params) => <CustomToolTip text={params.row.type} />,
    },
    {
      field: "starts_at",
      headerName: t("starts_at"),
      width: 200,
      renderCell: (params) => <CustomToolTip text={params.row.starts_at} />,
    },
    {
      field: "due_to",
      headerName: t("due_to"),
      width: 200,
      renderCell: (params) => <CustomToolTip text={params.row.due_to} />,
    },
    {
      field: "status",
      headerName: t("status"),
      width: 200,
      renderCell: (params) => {
        switch (params.row.status) {
          case taskTypes.PENDING: {
            return (
              <Box
                sx={{
                  padding: ".5rem",
                  borderRadius: ".5rem",
                  background: colors.primary[900],
                }}
              >
                <CustomToolTip text={params.row.status} />
              </Box>
            );
          }
          case taskTypes.APPROVED: {
            return (
              <Box
                sx={{
                  padding: ".5rem",
                  borderRadius: ".5rem",
                  background: colors.greenAccent[700],
                }}
              >
                <CustomToolTip text={params.row.status} />
              </Box>
            );
          }
          case taskTypes.OVERDUE: {
            return (
              <Box
                sx={{
                  padding: ".5rem",
                  borderRadius: ".5rem",
                  background: colors.redAccent[700],
                }}
              >
                <CustomToolTip text={params.row.status} />
              </Box>
            );
          }
          default: {
            return <p>NoData</p>;
          }
        }
      },
    },
    {
      field: "description",
      headerName: t("description"),
      width: 250,
      renderCell: (params) => <CustomToolTip text={params.row.description} />,
    },
    {
      field: "created_at",
      headerName: t("created_at"),
      width: 250,
      renderCell: (params) => <CustomToolTip text={params.row.created_at} />,
    },
    {
      field: "actions",
      headerName: t("Actions"),
      width: 400,
      renderCell: (params) =>
        params.row.status === taskTypes.OVERDUE ? (
          <ButtonGroup
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "90%",
            }}
          >
            <WriteNote id={params.row.id} />
          </ButtonGroup>
        ) : (
          <ButtonGroup
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "90%",
            }}
          >
            <Button
              variant="contained"
              sx={{
                background: `${colors.primary[700]}`,
                mx: 2,
              }}
              disabled={params.row.status === taskTypes.APPROVED ? true : false}
              onClick={() => handleApprove(params.row.id)}
            >
              {t("Approve")}
            </Button>
          </ButtonGroup>
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

  const handleReset = () => {
    setFromDate("");
    setToDate("");
    setOverDue(0);
  };
  return !loading ? (
    <Box m={2}>
      <Box
        flexDirection={sidebarRTL ? "row-reverse" : "row"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title={t("my_tasks")} />
      </Box>
      <Box
        sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection="row"
          sx={{ width: "50%" }}
        >
          <Button
            sx={{
              backgroundColor: colors.primary[300],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              height: "2rem",
              marginTop: "8%",
            }}
            variant="contained"
            onClick={handleReset}
          >
            {t("Reset")}
          </Button>
          <CustomSelectMenu
            defaultData={overDue}
            lable="task_type"
            sx={{ margin: "0" }}
            onChange={handleTaskTypeChange}
            options={tasksTypes}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection="row"
          sx={{ width: "50%" }}
        >
          <CustomDate
            value={fromDate}
            title="from_date"
            onChange={handleFromDateChange}
          />
          <CustomDate
            value={toDate}
            title="to_date"
            onChange={handleToDateChange}
          />
        </Box>
      </Box>
      <CustomTableBox tableData={tableData} action={searchTasks} />
    </Box>
  ) : (
    <CustomLoader />
  );
};
export default MyTasks;
