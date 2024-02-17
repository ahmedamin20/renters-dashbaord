import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, ButtonGroup, useTheme } from "@mui/material";
import CustomTableBox from "../../../components/customTableBox/CustomTableBox.jsx";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import Header from "../../../components/Header.jsx";
import { useTranslation } from "react-i18next";
import CustomPagenation from "../../../components/CustomPagenation/CustomPagenation.jsx";
import CustomDelete from "../../../components/CutsomDelete/CustomDelete.jsx";
import { tokens } from "../../../theme.js";
import CustomToolTip from "../../../components/CustomToolTip/customToolTip.jsx";
import {
  deleteVisit,
  fetchVisitsDataByPage,
  getVisits,
  searchVisits,
} from "../redux/visits.js";
import { getGaragesMenu } from "../../../redux/select_menus.js";
import CustomSelectMenu from "../../../components/CustomSelect/CustomSelect.jsx";
import CustomLoader from "../../../components/CustomLoader/CustomLoader.jsx";
import hasPermission from "../../../utils/haspermission.js";
import CustomLinkButton from "./../../../components/CustomLinkButton";
import { Link } from "react-router-dom";
import EditButton from "../../../components/editButton.jsx";

const Visits = () => {
  const data = useSelector((state) => state.visits.VisitsData.data) || [];
  const garagesMenu =
    useSelector((state) => state.selectMenu.garagesMenu.data) || [];
  const loading = useSelector((state) => state.visits.loading);
  const firstPage = useSelector((state) => state.visits.VisitsLinks.first);
  const nextPage = useSelector((state) => state.visits.VisitsLinks.next);
  const lastPage = useSelector((state) => state.visits.VisitsLinks.last);
  const prevPage = useSelector((state) => state.visits.VisitsLinks.prev);
  const currentPage = useSelector((state) => state.visits.currentPage);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { sidebarRTL } = useSidebarContext();
  const [pageSize, SetPageSize] = useState(10);
  const [selectedGarage, SetSelectedGarage] = useState(null);
  const handleGarageChange = (value) => {
    SetSelectedGarage(value?.id);
  };
  useEffect(() => {
    dispatch(getGaragesMenu());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getVisits({ id: selectedGarage || 1, pageSize: pageSize }));
  }, [dispatch, selectedGarage, pageSize]);

  const columns = [
    {
      field: "visitor",
      headerName: t("visitor"),
      width:300,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.visitor.name} />,
    },
    {
      field: "garage",
      headerName: t("garage"),
      width:300,
      renderCell: (params) => <CustomToolTip text={params.row.garage.name} />,
    },
    {
      field: "reason",
      headerName: t("reason"),
      width:300,
      renderCell: (params) => <CustomToolTip text={params.row.reason} />,
    },
    {
      field: "created_at",
      headerName: t("created_at"),
      width:300,
      renderCell: (params) => <CustomToolTip text={params.row.created_at} />,
    },
    {
      field: "actions",
      headerName: t("Actions"),
      width:300,
      renderCell: (params) => (
        <ButtonGroup sx={{ display: "flex", alignItems: "center" }}>
          {hasPermission("update-visit") && (
            // <EditVisit
            //   rerenderId={selectedGarage}
            //   id={params.row.id}
            //   pageSize={pageSize}
            // />
            // <CustomLinkButton to={'edit'} params={params.row.id} />
            <Link to={`/visits/${selectedGarage}/edit/${params.row.id}`}>
              <EditButton text="edit" />
            </Link>
          )}
          {hasPermission("delete-visit") && (
            <CustomDelete
              sx={{
                background: `${colors.redAccent[600]}`,
              }}
              action={deleteVisit}
              rerenderAction={getVisits}
              id={params.id}
              rerenderId={selectedGarage}
              pageSize={pageSize}
            />
          )}
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
  return !loading ? (
    <Box m={2}>
      <Box
        flexDirection={sidebarRTL ? "row-reverse" : "row"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title={t("visits")} />

        <CustomSelectMenu
          defaultData={selectedGarage}
          onChange={handleGarageChange}
          lable="select_garage"
          options={garagesMenu}
        />
        {hasPermission("store-visit") && (
          <CustomLinkButton to={"add"} params={selectedGarage || 1} />
        )}
      </Box>
      <CustomTableBox
        tableData={tableData}
        id={selectedGarage}
        action={searchVisits}
        CustomPagenation={
          <CustomPagenation
            action={fetchVisitsDataByPage}
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
export default Visits;
