import React, { useEffect, useState } from "react";
import { Box, useTheme, Button } from "@mui/material";

import { tokens } from "../../../../theme.js";
import Header from "../../../../components/Header.jsx";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../../../pages/global/sidebar/sidebarContext.js";
import CustomTableBox from "../../../../components/customTableBox/CustomTableBox.jsx";
import CustomPagenation from "../../../../components/CustomPagenation/CustomPagenation.jsx";
import CustomDelete from "../../../../components/CutsomDelete/CustomDelete.jsx";
import AddApplicants from "./AddApplicants.jsx";
import {
  changeToggles,
  deleteApplicants,
  fetchApplicantsDataByPage,
  getApplicantsData,
  searchApplicants,
} from "../../redux/Applicants.js";
import CustomToolTip from "../../../../components/CustomToolTip/customToolTip.jsx";
import hasPermission from "../../../../utils/haspermission.js";
import { Link, useNavigate } from "react-router-dom";
import EditApplicant from "./EditApplicants.jsx";
import EditButton from "../../../../components/editButton.jsx";
import { StatuseCode } from "../../../../statuseCodes.js";
import { interViewStuseEnum } from "./interviews/interViewStuseEnum.js";

const ApplicantsTable = () => {
  const nav = useNavigate();

  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
  const handleViewInterview = (departmentId) => {
    setSelectedDepartmentId(departmentId);
  };
  const dispatch = useDispatch();
  const nextPage = useSelector(
    (state) => state.Applicants.ApplicantsLinks.next
  );
  const lastPage = useSelector(
    (state) => state.Applicants.ApplicantsLinks.last
  );
  const prevPage = useSelector(
    (state) => state.Applicants.ApplicantsLinks.prev
  );
  const currentPage = useSelector((state) => state.Applicants.currentPage);
  const firstPage = useSelector(
    (state) => state.Applicants.ApplicantsLinks.first
  );
  const { sidebarRTL } = useSidebarContext();
  const { t } = useTranslation();
  const [pageSize, setPageSize] = useState(10);
  const loading = useSelector((state) => state.Applicants.loading);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const data = useSelector(
    (state) => state.Applicants.ApplicantsData.data || []
  );
  const [employee_id, setemployee_id] = useState();
  const [reason, setreason_id] = useState();
  const [type, settype_id] = useState();
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
      field: "email",
      headerName: t("email"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.email} />,
    },
    {
      field: "birth_date",
      headerName: t("birth_date"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.birth_date} />,
    },
    {
      field: "status",
      headerName: t("status"),
      width: 150,
      renderCell: (params) => {
        let bg;
        switch (params.row.status) {
          case interViewStuseEnum.rejected:
            bg = "red";
            break;
          case interViewStuseEnum.accepted:
            bg = "green";
            break;
          default:
            bg = "grey";
        }

        return (
          <span
            style={{ background: bg, padding: ".5rem", borderRadius: ".5rem" }}
          >
            {t(params.row.status)}
          </span>
        );
      },
    },
    {
      field: "cv",
      headerName: t("cv"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <a href={params.row.cv} target="_blank" rel="noreferrer">
          <Button
            sx={{
              backgroundColor: colors.greenAccent[300],
              fontSize: "14px",
              fontWeight: "bold",
            }}
            variant="contained"
          >
            {t("cv")}
          </Button>
        </a>
      ),
    },
    {
      field: "actions",
      headerName: t("Actions"),
      width: 500,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          {hasPermission("update-applicants") && (
            <EditApplicant
              sx={{
                backGround: `${colors.grey[600]}`,
              }}
              disabled={params.row.status !== "pending"}
              id={params.id}
              name={params.row.name}
              status={params.row.status}
            />
          )}
          {hasPermission("delete-applicants") && (
            <CustomDelete
              sx={{
                background: `${colors.redAccent[600]}`,
              }}
              icon={<DeleteIcon />}
              id={params.id}
              action={deleteApplicants}
              pageSize={pageSize}
              rerenderAction={getApplicantsData}
            />
          )}
          {hasPermission("update-applicants") && (
            <button
              className="btn btn-primary text-white ms-2"
              disabled={params.row.status !== "pending"}
            >
              <Link to={`${params.id}/interviews`}>
                <span className="text-white">{t("interviews")}</span>
              </Link>
            </button>
          )}
          <EditButton
            text="accept"
            backGround="green"
            disabled={params.row.status !== "pending"}
            onClick={() =>
              dispatch(
                changeToggles({ id: params.id, status: "accepted" })
              ).then((res) => {
                res.payload.data.code === StatuseCode.OK
                  ? dispatch(getApplicantsData({ pageSize: pageSize, id: id }))
                  : null;
              })
            }
          />
          <EditButton
            text="reject"
            backGround="red"
            disabled={params.row.status !== "pending"}
            onClick={() =>
              dispatch(
                changeToggles({ id: params.id, status: "rejected" })
              ).then((res) => {
                res.payload.data.code === StatuseCode.OK
                  ? dispatch(getinterviewsData({ pageSize: pageSize, id: id }))
                  : null;
              })
            }
          />
        </Box>
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
    dispatch(getApplicantsData(info));
  }, [dispatch, pageSize]);

  return (
    <Box m="20px">
      <Box m="20px">{/* ... (Your existing code) */}</Box>
      <Box
        display="flex"
        dir={sidebarRTL ? "rtl" : "ltr"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title={t("Applicants")} />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection={sidebarRTL ? "row" : "row-reverse"}
      >
        {hasPermission("store-car") && (
          <AddApplicants
            employee_id={employee_id}
            reason={reason}
            type={type}
            pageSize={pageSize}
          />
        )}
      </Box>
      <CustomTableBox
        tableData={tableData}
        action={searchApplicants}
        CustomPagenation={
          <CustomPagenation
            pageSize={pageSize}
            nextPage={nextPage}
            lastPage={lastPage}
            prevPage={prevPage}
            currentPage={currentPage}
            firstPage={firstPage}
            action={fetchApplicantsDataByPage}
          />
        }
      />
    </Box>
  );
};

export default ApplicantsTable;
