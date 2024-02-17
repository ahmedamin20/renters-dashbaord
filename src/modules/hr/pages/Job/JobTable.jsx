import { useEffect, useState } from "react";
import { Box, ButtonGroup } from "@mui/material";
import Header from "../../../../components/Header.jsx";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomTableBox from "../../../../components/customTableBox/CustomTableBox.jsx";
import CustomPagenation from "../../../../components/CustomPagenation/CustomPagenation.jsx";
import CustomDelete from "../../../../components/CutsomDelete/CustomDelete.jsx";
import {
  deleteJob,
  fetchJobDataByPage,
  getJobData,
  searchJobsData,
} from "../../redux/Job.js";
import CustomToolTip from "../../../../components/CustomToolTip/customToolTip.jsx";
import hasPermission from "../../../../utils/haspermission.js";
import CustomLinkButton from "../../../../components/CustomLinkButton.jsx";
import useMainHooks from "../../../../hooks/useMainHooks.jsx";

const JobTable = () => {
  const dispatch = useDispatch();
  const nextPage = useSelector((state) => state.Job.JobLinks.next);
  const lastPage = useSelector((state) => state.Job.JobLinks.last);
  const prevPage = useSelector((state) => state.Job.JobLinks.prev);
  const currentPage = useSelector((state) => state.Job.currentPage);
  const firstPage = useSelector((state) => state.Job.JobLinks.first);
  const [pageSize, setPageSize] = useState(10);
  const loading = useSelector((state) => state.Job.loading);
  const { t, colors, sidebarRTL } = useMainHooks();
  const data = useSelector((state) => state.Job.JobData.data || []);
  let info = { pageSize: pageSize };

  const columns = [
    { field: "id", headerName: t("ID"), width: 220 },
    {
      field: "name",
      headerName: t("Name"),
      width: 400,
      cellClassName: "name-column--cell",
    },
    {
      field: "department name",
      headerName: t("department name"),
      width: 400,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <CustomToolTip text={params.row.department.name} />
      ),
    },

    {
      field: "actions",
      headerName: t("Actions"),
      width: 220,
      renderCell: (params) => (
        <ButtonGroup
          sx={{
            display: "flex",
            flexDirection: sidebarRTL
              ? "row-reverse !important"
              : "row !important",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          {hasPermission("show-working_jobs") && (
            <CustomLinkButton to={`edit`} params={params.row.id} />
          )}

          {hasPermission("delete-working_jobs") && (
            <CustomDelete
              sx={{
                background: `${colors.redAccent[600]}`,
              }}
              icon={<DeleteIcon />}
              id={params.id}
              action={deleteJob}
              pageSize={pageSize}
              rerenderAction={getJobData}
            />
          )}
        </ButtonGroup>
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
  useEffect(() => {
    dispatch(getJobData(info));
  }, [dispatch, pageSize]);
  return (
    <Box m="20px">
      <Box
        display="flex"
        dir={sidebarRTL ? "rtl" : "ltr"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title={t("Jobs")} />

        {hasPermission("store-working_jobs") && <CustomLinkButton to={"add"} />}
      </Box>
      <CustomTableBox
        tableData={tableData}
        action={searchJobsData}
        CustomPagenation={
          <CustomPagenation
            pageSize={pageSize}
            nextPage={nextPage}
            lastPage={lastPage}
            prevPage={prevPage}
            currentPage={currentPage}
            firstPage={firstPage}
            action={fetchJobDataByPage}
          />
        }
      />
    </Box>
  );
};
export default JobTable;
