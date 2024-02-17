import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, useTheme } from "@mui/material";
import CustomTableBox from "../../../components/customTableBox/CustomTableBox.jsx";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import Header from "../../../components/Header.jsx";
import { useTranslation } from "react-i18next";
import CustomPagenation from "../../../components/CustomPagenation/CustomPagenation.jsx";
import CustomDelete from "../../../components/CutsomDelete/CustomDelete.jsx";
import { tokens } from "../../../theme.js";
import CustomToolTip from "../../../components/CustomToolTip/customToolTip.jsx";
import { deleteVisitorCar, getVisitorsCars } from "../../visitorCar/redux/visitorsCars.js";
import { Link } from "react-router-dom";
import CustomLoader from "../../../components/CustomLoader/CustomLoader.jsx";
import { fetchVisitorsDataByPage, getVisitors, searchVistors } from "../redux/Visitors.js";
import hasPermission from "../../../utils/haspermission.js";
import EditButton from "../../../components/editButton.jsx";
// import hasPermission from "./../../utils/haspermission";

const Visitors = () => {
  const data = useSelector((state) => state.visitors.VisitorsData.data) || [];
  const loading = useSelector((state) => state.visitors.loading);
  const firstPage = useSelector((state) => state.visitors.VisitorsLinks.first);
  const nextPage = useSelector((state) => state.visitors.VisitorsLinks.next);
  const lastPage = useSelector((state) => state.visitors.VisitorsLinks.last);
  const prevPage = useSelector((state) => state.visitors.VisitorsLinks.prev);
  const currentPage = useSelector((state) => state.visitors.currentPage);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { sidebarRTL } = useSidebarContext();
  const [pageSize, SetPageSize] = useState(10);

  useEffect(() => {
    dispatch(getVisitors({ pageSize: pageSize }));
  }, [dispatch, pageSize]);

  const columns = [
    {
      field: "id",
      headerName: t("id"),
      width:150,
    },
    {
      field: "name",
      headerName: t("name"),
      width:250,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.name} />,
    },
    {
      field: "email",
      headerName: t("email"),
      width:300,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.email} />,
    },
    {
      field: "phone",
      headerName: t("phone"),
      cellClassName: "name-column--cell",
      width:200,
      renderCell: (params) => <CustomToolTip text={params.row.phone} />,
    },
    {
      field: "latest_visit",
      headerName: t("latest_visit"),
      width:200,
      renderCell: (params) =>
        params.row.latest_visit !== null ? (
          <CustomToolTip text={params.row.latest_visit.created_at} />
        ) : null,
    },

    {
      field: "actions",
      headerName: t("Actions"),
      width:200,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          {hasPermission("update-visitor") && (
            <Link to={`edit-visitor/${params.row.id}`}>
              <EditButton text={"edit"} />
             
            </Link>
          )}
          {hasPermission("delete-visitor") && (
            <CustomDelete
              sx={{
                background: `${colors.redAccent[600]}`,
              }}
              action={deleteVisitorCar}
              rerenderAction={getVisitorsCars}
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
        <Header title={t("Visitors")} />
        {hasPermission("store-visitor") && (
          <Link to="add-visitor">
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
              variant="outlined"
            >
              {t("Add")}
            </Button>
          </Link>
        )}
      </Box>
      <CustomTableBox
        tableData={tableData}
        action={searchVistors}
        CustomPagenation={
          <CustomPagenation
            action={fetchVisitorsDataByPage}
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
export default Visitors;
