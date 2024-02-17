import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, useTheme } from "@mui/material";
import CustomTableBox from "../../../components/customTableBox/CustomTableBox.jsx";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import Header from "../../../components/Header.jsx";
import { useTranslation } from "react-i18next";
import CustomPagenation from "../../../components/CustomPagenation/CustomPagenation.jsx";
import CustomDelete from "../../../components/CutsomDelete/CustomDelete.jsx";
import { tokens } from "../../../theme.js";
import CustomToolTip from "../../../components/CustomToolTip/customToolTip.jsx";
import CustomLoader from "../../../components/CustomLoader/CustomLoader.jsx";
import hasPermission from "../../../utils/haspermission.js";

import {
  deleteTeam,
  fetchOurTeamDataByPage,
  getOurTeam,
  searchOurTeam,
} from "../redux/ourTeam.js";
import { Link } from "react-router-dom";
import DefaultButton from "../../../components/defaultBtn.jsx";
import EditButton from "../../../components/editButton.jsx";

const OurTeam = () => {
  const data = useSelector((state) => state.ourTeam.ourTeamData.data) || [];
  const loading = useSelector((state) => state.ourTeam.loading);
  const firstPage = useSelector((state) => state.ourTeam.ourTeamLinks.first);
  const nextPage = useSelector((state) => state.ourTeam.ourTeamLinks.next);
  const lastPage = useSelector((state) => state.ourTeam.ourTeamLinks.last);
  const prevPage = useSelector((state) => state.ourTeam.ourTeamLinks.prev);
  const currentPage = useSelector((state) => state.ourTeam.currentPage);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { sidebarRTL } = useSidebarContext();
  const [pageSize, SetPageSize] = useState(10);

  useEffect(() => {
    dispatch(getOurTeam({ pageSize: pageSize }));
  }, [dispatch, pageSize]);

  const columns = [
    {
      field: "id",
      headerName: t("id"),
      width: 220,
    },
    {
      field: "name",
      headerName: t("name"),
      width: 220,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.name} />,
    },
    {
      field: "section",
      headerName: t("section"),
      width: 220,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.section.title} />,
    },
    {
      field: "teamMemberPhoto",
      headerName: t("teamMemberPhoto"),
      cellClassName: "name-column--cell",
      width: 250,

      renderCell: (params) => (
        <Avatar
          src={params.row.teamMemberPhoto}
          sx={{ width: 50, height: 50, margin: "1rem auto" }}
        />
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
          {hasPermission("update-blog") && (
            <Link to={`edit/${params.row.id}`}>
              <EditButton text="edit" />
            </Link>
          )}
          {hasPermission("delete-blog") && (
            <CustomDelete
              sx={{
                background: `${colors.redAccent[600]}`,
              }}
              action={deleteTeam}
              rerenderAction={getOurTeam}
              id={params.id}
              pageSize={pageSize}
            />
          )}
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
        <Header title={t("ourTeam")} />
        {hasPermission("store-blog") && (
          <Link to="add">
            <DefaultButton text="add" />
          </Link>
        )}
      </Box>
      <CustomTableBox
        tableData={tableData}
        action={searchOurTeam}
        CustomPagenation={
          <CustomPagenation
            action={fetchOurTeamDataByPage}
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
export default OurTeam;
