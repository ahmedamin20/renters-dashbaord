import { Link } from "react-router-dom";
import CustomDelete from "../../../../../components/CutsomDelete/CustomDelete";
import EditButton from "../../../../../components/editButton";
import useMainHooks from "../../../../../hooks/useMainHooks";
import { Box, Switch, ButtonGroup } from "@mui/material";
import CustomToolTip from "../../../../../components/CustomToolTip/customToolTip";
import {
  deleteJob_announcements,
  getJob_announcementsData,
} from "../../../redux/Job_announcements";
import { useState } from "react";
// TODO :: not finished
export default function useJobAnnounceHook() {
    const [pageSize,setPageSize]=useState(10)
  const { t, sidebarRTL, colors, hasPermission } = useMainHooks();
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
  return {

    columns
  };
}
