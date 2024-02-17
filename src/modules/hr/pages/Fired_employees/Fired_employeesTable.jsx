import React, { useEffect, useState } from "react";
import { Box, ButtonGroup, useTheme } from "@mui/material";
import { tokens } from "../../../../theme.js";
import Header from "../../../../components/Header.jsx";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../../../pages/global/sidebar/sidebarContext.js";
import CustomTableBox from "../../../../components/customTableBox/CustomTableBox.jsx";
import CustomPagenation from "../../../../components/CustomPagenation/CustomPagenation.jsx";
import CustomDelete from "../../../../components/CutsomDelete/CustomDelete.jsx";
import AddFired_employees from "./AddFired_employees.jsx";
import {  deleteFired_employees, fetchFired_employeesDataByPage, getFired_employeesData } from "../../redux/Fired_employees.js";
import CustomToolTip from "../../../../components/CustomToolTip/customToolTip.jsx";
import hasPermission from "../../../../utils/haspermission.js";

const Fired_employeesTable = () => {
  const dispatch = useDispatch()
  const nextPage = useSelector((state) => state.Fired_employees.Fired_employeesLinks.next);
  const lastPage = useSelector((state) => state.Fired_employees.Fired_employeesLinks.last);
  const prevPage = useSelector((state) => state.Fired_employees.Fired_employeesLinks.prev);
  const currentPage = useSelector((state) => state.Fired_employees.currentPage);
  const firstPage = useSelector((state) => state.Fired_employees.Fired_employeesLinks.first);
  const { sidebarRTL } = useSidebarContext();
  const { t } = useTranslation();
  const [pageSize, setPageSize] = useState(10);
  const loading = useSelector((state) => state.Fired_employees.loading);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const data = useSelector(
    (state) => state.Fired_employees.Fired_employeesData.data||[]
  );
  const [examId, setExamId] = useState();
  let info={pageSize:pageSize}

  const columns = [
    { field: "id", headerName: t("ID"), width: 150 },
    {
      field: "type",
      headerName: t("Type"),
      width: 250,
      cellClassName: "name-column--cell",
    },
    {
      field: "reason",
      headerName: t("Reason"),
      width: 250,
      cellClassName: "name-column--cell",
    },
    {
      field: "managerName",
      headerName: t("managerName"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell:params=>(<CustomToolTip text={params.row.employee?.name} />)
    },
    {
      field: "jobName",
      headerName: t("job Name"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell:params=>(<CustomToolTip text={params.row.employee.job?.name} />)
    },

          {
            field: "actions",
            headerName: t("Actions"),
            width: 300,
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
       
              {hasPermission("delete-car") && (
                <CustomDelete
                  sx={{
                    background: `${colors.redAccent[600]}`,
                  }}
                  icon={<DeleteIcon />}
                  id={params.id}
                  action={deleteFired_employees}
                  pageSize={pageSize}
                  rerenderAction={getFired_employeesData}
                />
              )}
              </ButtonGroup>
            ),
          },
  ];
  const tableData = {
    rows: data.length > 0 &&  data,
    columns: columns,
    loading: loading,
    pageSize: pageSize,
    onPageSizeChange: (newPageSize) => setPageSize(newPageSize),
  };
  useEffect(() => {
    dispatch(getFired_employeesData(info));
  },[dispatch, pageSize])
  return (
    <Box m="20px">
      <Box
        display="flex"
        dir={sidebarRTL ? "rtl" : "ltr"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title={t("Fired Employees")} />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection={sidebarRTL ? "row" : "row-reverse"}
      >
        {hasPermission("store-car") && (
          <AddFired_employees
            exam_id={examId}
            pageSize={pageSize}
          />
        )}
      </Box>
      <CustomTableBox
        tableData={tableData}
   
        CustomPagenation={
          <CustomPagenation
            pageSize={pageSize}
            nextPage={nextPage}
            lastPage={lastPage}
            prevPage={prevPage}
            currentPage={currentPage}
            firstPage={firstPage}
            action={fetchFired_employeesDataByPage}
          />
        }
      />
    </Box>
  );
};
export default Fired_employeesTable;
