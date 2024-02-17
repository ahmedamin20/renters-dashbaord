import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { useRef } from "react";
import {
  deleteVacations,
  fetchVacationsDataByPage,
  getVacations,
  searchVacations,
} from "../../redux/vacations.js";
import { Box } from "@mui/material";
import CustomToolTip from "../../../../components/CustomToolTip/customToolTip.jsx";
import CustomDelete from "../../../../components/CutsomDelete/CustomDelete.jsx";
import Header from "../../../../components/Header.jsx";
import CustomTableBox from "../../../../components/customTableBox/CustomTableBox.jsx";
import CustomPagenation from "../../../../components/CustomPagenation/CustomPagenation.jsx";
import CustomLoader from "../../../../components/CustomLoader/CustomLoader.jsx";
import hasPermission from "../../../../utils/haspermission.js";
import CustomLinkButton from "../../../../components/CustomLinkButton.jsx";
import useMainHooks from "../../../../hooks/useMainHooks.jsx";

const Vacations = () => {
  const data = useSelector((state) => state.vacations.vacationsData.data) || [];
  const loading = useSelector((state) => state.vacations.loading);
  const firstPage = useSelector(
    (state) => state.vacations.vacationsLinks.first
  );
  const nextPage = useSelector((state) => state.vacations.vacationsLinks.next);
  const lastPage = useSelector((state) => state.vacations.vacationsLinks.last);
  const prevPage = useSelector((state) => state.vacations.vacationsLinks.prev);
  const currentPage = useSelector((state) => state.vacations.currentPage);

  const [pageSize, SetPageSize] = useState(10);
  const { t, dispatch, colors, sidebarRTL } = useMainHooks();
  const vacationsRef = useRef();
  useEffect(() => {
    dispatch(getVacations({ pageSize: pageSize }));
  }, [dispatch, pageSize, vacationsRef]);

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
      field: "type",
      headerName: t("type"),
      width: 220,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.type} />,
    },
    {
      field: "vacation_date",
      headerName: t("vacation_date"),
      cellClassName: "name-column--cell",
      width: 220,
      renderCell: (params) => <CustomToolTip text={params.row.vacation_date} />,
    },
    {
      field: "actions",
      headerName: t("Actions"),
      width: 280,

      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {hasPermission("show-vacations") && (
            <>
              <CustomLinkButton to={"edit"} params={params.row.id} />
            </>
          )}
          {hasPermission("delete-vacations") && (
            <CustomDelete
              sx={{
                background: `${colors.redAccent[600]}`,
              }}
              action={deleteVacations}
              rerenderAction={getVacations}
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
        <Header title={t("vacations")} />
        {hasPermission("store-vacations") && <CustomLinkButton to={"add"} />}
      </Box>
      <CustomTableBox
        tableData={tableData}
        action={searchVacations}
        CustomPagenation={
          <CustomPagenation
            action={fetchVacationsDataByPage}
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
export default Vacations;
