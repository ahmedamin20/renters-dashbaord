import { useEffect, useState } from "react";
import { Box, ButtonGroup, Switch } from "@mui/material";
import Header from "../../../../components/Header.jsx";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  changeToggles,
  deleteJob_announcements,
  fetchJob_announcementsDataByPage,
  getJob_announcementsData,
  searchJobAnnouncementData,
} from "../../redux/Job_announcements.js";
import CustomToolTip from "../../../../components/CustomToolTip/customToolTip.jsx";
import hasPermission from "../../../../utils/haspermission.js";
import { Link } from "react-router-dom";
import CustomTableBox from "../../../../components/customTableBox/CustomTableBox.jsx";
import CustomPagenation from "../../../../components/CustomPagenation/CustomPagenation.jsx";
import CustomDelete from "../../../../components/CutsomDelete/CustomDelete.jsx";
import DefaultButton from "../../../../components/defaultBtn.jsx";
import EditButton from "../../../../components/editButton.jsx";
import useMainHooks from "../../../../hooks/useMainHooks.jsx";

const Job_announcementsTable = () => {
  const [toggleStates, setToggleStates] = useState({});
  const nextPage = useSelector(
    (state) => state.Job_announcements.Job_announcementsLinks.next
  );
  const lastPage = useSelector(
    (state) => state.Job_announcements.Job_announcementsLinks.last
  );
  const prevPage = useSelector(
    (state) => state.Job_announcements.Job_announcementsLinks.prev
  );
  const currentPage = useSelector(
    (state) => state.Job_announcements.currentPage
  );
  const firstPage = useSelector(
    (state) => state.Job_announcements.Job_announcementsLinks.first
  );
  const { t, sidebarRTL, colors, dispatch } = useMainHooks();
  const [pageSize, setPageSize] = useState(10);
  const loading = useSelector((state) => state.Job_announcements.loading);
  const data = useSelector(
    (state) => state.Job_announcements.Job_announcementsData.data || []
  );

  const handleStatusToggle = async (id) => {
    setToggleStates((prevStates) => {
      const currentState = prevStates[id] || "";
      const newState = currentState === "true" ? "false" : "true";
      return {
        ...prevStates,
        [id]: newState,
      };
    });
  };

  let info = { pageSize: pageSize };

  const columns = [
    { field: "id", headerName: t("ID"), width: 150 },
    {
      field: "name",
      headerName: t("Name"),
      width: 250,
      cellClassName: "name-column--cell",
    },
    {
      field: "status",
      headerName: t("status"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Box>
          <Switch
            checked={
              (toggleStates[params.row.id] !== undefined &&
                toggleStates[params.row.id] === "true") ||
              params.row.status
            }
            onChange={() => handleStatusToggle(params.row.id)}
            //disabled={params.row.status === "false"}
            inputProps={{ "aria-label": "controlled" }}
            onClick={handleApiCallToggle}
          />
        </Box>
      ),
    },
    {
      field: "starts_at",
      headerName: t("starts_at"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.starts_at} />,
    },
    {
      field: "ends_at",
      headerName: t("ends_at"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.ends_at} />,
    },
    {
      field: " experience_years",
      headerName: t("experience years"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <CustomToolTip text={params.row.experience_years} />
      ),
    },
    {
      field: "requirements",
      headerName: t("requirements"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.requirements} />,
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
          {hasPermission("update-job_announcement") && (
            <>
              <Link to={`/Edit_Annoucement/${params.id}`}>
                <EditButton text="edit" />
              </Link>
            </>
          )}
          {hasPermission("delete-job_announcement") && (
            <CustomDelete
              sx={{
                background: `${colors.redAccent[600]}`,
              }}
              icon={<DeleteIcon />}
              id={params.id}
              action={deleteJob_announcements}
              pageSize={pageSize}
              rerenderAction={getJob_announcementsData}
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
    dispatch(getJob_announcementsData(info));
  }, [dispatch, pageSize]);

  const handleApiCallToggle = async () => {
    const handleStatusToggle = async (id) => {
      const currentState = toggleStates[id] || "";
      const newState = currentState === "true" ? "false" : "true";
      setToggleStates((prevStates) => ({
        ...prevStates,
        [id]: newState,
      }));
    };

    const Job_announcementsToUpdate = [];
    for (const id in toggleStates) {
      if (toggleStates.hasOwnProperty(id)) {
        Job_announcementsToUpdate.push({ id, status: toggleStates[id] });
      }
    }

    console.log("Data being sent:", Job_announcementsToUpdate);

    try {
      await dispatch(changeToggles(Job_announcementsToUpdate)).then((res) =>
        res.payload.code === 200 ? console.log("success") : ""
      );
    } catch (error) {
      console.error("Error updating toggle states:", error.message);
    }
  };

  return (
    <Box m="20px">
      <Box
        display="flex"
        dir={sidebarRTL ? "rtl" : "ltr"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title={t("Job Announcements")} />
        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection={sidebarRTL ? "row" : "row-reverse"}
        >
          {hasPermission("store-car") && (
            <>
              <Link to="/Add_Annoucement">
                <DefaultButton text="Add" />
              </Link>
            </>
          )}
        </Box>
      </Box>
      <CustomTableBox
        tableData={tableData}
        action={searchJobAnnouncementData}
        CustomPagenation={
          <CustomPagenation
            pageSize={pageSize}
            nextPage={nextPage}
            lastPage={lastPage}
            prevPage={prevPage}
            currentPage={currentPage}
            firstPage={firstPage}
            action={fetchJob_announcementsDataByPage}
          />
        }
      />
    </Box>
  );
};
export default Job_announcementsTable;
