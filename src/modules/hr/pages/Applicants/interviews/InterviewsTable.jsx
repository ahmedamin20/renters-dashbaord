import { useParams } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../../../../theme.js";
import Header from "../../../../../components/Header.jsx";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../../../../pages/global/sidebar/sidebarContext.js";
import CustomTableBox from "../../../../../components/customTableBox/CustomTableBox.jsx";
import CustomPagenation from "../../../../../components/CustomPagenation/CustomPagenation.jsx";
import CustomDelete from "../../../../../components/CutsomDelete/CustomDelete.jsx";
import Addinterviews from "./Addinterviews.jsx";
import {
  changeToggles,
  deleteinterviews,
  fetchinterviewsDataByPage,
  getinterviewsData,
} from "../../../redux/interviews.js";
import CustomToolTip from "../../../../../components/CustomToolTip/customToolTip.jsx";
import hasPermission from "../../../../../utils/haspermission.js";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { getMyManagermenu } from "../../../../../redux/select_menus.js";
import EditInterviews from "./Editinterviews.jsx";
import CustomSwitch from "./../../../../../components/CustomSwitch/CustomSwitch";
import { interViewStuseEnum } from "./interViewStuseEnum.js";
import EditButton from "../../../../../components/editButton.jsx";
import { StatuseCode } from "../../../../../statuseCodes.js";

function InterviewsTable() {
  const { sidebarRTL } = useSidebarContext();
  const { t } = useTranslation();
  const [pageSize, setPageSize] = useState(10);
  const loading = useSelector((state) => state.interviews.loading);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const dispatch = useDispatch();
  const nextPage = useSelector(
    (state) => state.interviews.interviewsLinks.next
  );
  const lastPage = useSelector(
    (state) => state.interviews.interviewsLinks.last
  );
  const prevPage = useSelector(
    (state) => state.interviews.interviewsLinks.prev
  );
  const currentPage = useSelector((state) => state.interviews.currentPage);
  const firstPage = useSelector(
    (state) => state.interviews.interviewsLinks.first
  );
  const data = useSelector(
    (state) => state.interviews.interviewsData.data || []
  );
  const onSwitchChange = () => {
    // dispatch(changeToggles({id:id,status:status}));
  };
  const columns = [
    { field: "id", headerName: t("ID"), width: 200 },
    {
      field: "name",
      headerName: t("Name"),
      width: 250,
      cellClassName: "name-column--cell",
    },

    {
      field: "starts_at",
      headerName: t("starts_at"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.starts_at} />,
    },

    {
      field: "interviewer Name",
      headerName: t("interviewer"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <CustomToolTip text={params.row.interviewer?.user.name} />
      ),
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
      field: "actions",
      headerName: t("Actions"),
      width: 350,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-evenly",
            flexDirection: sidebarRTL
              ? "row-reverse !important"
              : "row !important",
            alignItems: "center",
          }}
        >
          {hasPermission("update-car") && (
            <EditInterviews
              sx={{
                backGround: `${colors.grey[600]}`,
              }}
              icon={<EditIcon />}
              id={params.row.id}
              name={params.row.name}
              starts_at={params.row.starts_at}
              applicant_id={id}
              interviewer={params.row.interviewer.id}
            />
          )}
          {hasPermission("delete-car") && (
            <CustomDelete
              sx={{
                background: `${colors.redAccent[600]}`,
              }}
              icon={<DeleteIcon />}
              id={params.id}
              action={deleteinterviews}
              pageSize={pageSize}
              rerenderAction={getinterviewsData}
            />
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
                  ? dispatch(getinterviewsData({ pageSize: pageSize, id: id }))
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

  const interViewRef = useRef(true);
  useEffect(() => {
    dispatch(getinterviewsData({ pageSize: 10, id: id }));
    dispatch(getMyManagermenu());
  }, [dispatch, pageSize, id, interViewRef]);

  return (
    <div>
      <Box m="20px">
        <Box
          display="flex"
          dir={sidebarRTL ? "rtl" : "ltr"}
          justifyContent="space-between"
          alignItems="center"
        >
          <Header title={t("Interviews With Applicants")} />
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection={sidebarRTL ? "row" : "row-reverse"}
        >
          {hasPermission("store-car") && <Addinterviews applicant_id={id} />}
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
              action={fetchinterviewsDataByPage}
            />
          }
        />
      </Box>
    </div>
  );
}

export default InterviewsTable;
