import { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../../../theme.js";
import Header from "../../../../components/Header.jsx";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../../../pages/global/sidebar/sidebarContext.js";
import CustomTableBox from "../../../../components/customTableBox/CustomTableBox.jsx";
import CustomPagenation from "../../../../components/CustomPagenation/CustomPagenation.jsx";
import CustomDelete from "../../../../components/CutsomDelete/CustomDelete.jsx";
import {
  deleteworking_shifts,
  fetchworking_shiftsDataByPage,
  getworking_shiftsData,
  searchworking_shiftsData,
} from "../../redux/working_shifts.js";
import CustomToolTip from "../../../../components/CustomToolTip/customToolTip.jsx";
import hasPermission from "../../../../utils/haspermission.js";
import CustomLinkButton from "../../../../components/CustomLinkButton.jsx";

const Working_shiftsTable = () => {
  const dispatch = useDispatch();
  const nextPage = useSelector(
    (state) => state.working_shifts.working_shiftsLinks.next
  );
  const lastPage = useSelector(
    (state) => state.working_shifts.working_shiftsLinks.last
  );
  const prevPage = useSelector(
    (state) => state.working_shifts.working_shiftsLinks.prev
  );
  const currentPage = useSelector((state) => state.working_shifts.currentPage);
  const firstPage = useSelector(
    (state) => state.working_shifts.working_shiftsLinks.first
  );
  const { sidebarRTL } = useSidebarContext();
  const { t } = useTranslation();
  const [pageSize, setPageSize] = useState(10);
  const loading = useSelector((state) => state.working_shifts.loading);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const data = useSelector(
    (state) => state.working_shifts.working_shiftsData.data || []
  );
  let info = { pageSize: pageSize };

  const columns = [
    { field: "id", headerName: t("ID"), width: 150 },
    {
      field: "name",
      headerName: t("name"),
      width: 250,
      cellClassName: "name-column--cell",
    },
    {
      field: "starts_at",
      headerName: t("starts_at"),
      width: 250,
      cellClassName: "name-column--cell",
    },
    {
      field: "ends_at",
      headerName: t("ends_at"),
      width: 250,
      cellClassName: "name-column--cell",
    },

    {
      field: "rest_hours",
      headerName: t("rest_hours"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.rest_hours} />,
    },

    {
      field: "actions",
      headerName: t("Actions"),
      width: 300,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: sidebarRTL
              ? "row-reverse !important"
              : "row !important",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-evenly",
          }}
        >
          {hasPermission("show-working_shifts") && (
            <>
              <CustomLinkButton to={`edit`} params={params.id} />
            </>
          )}
          {hasPermission("delete-working_shifts") && (
            <CustomDelete
              sx={{
                background: `${colors.redAccent[600]}`,
              }}
              icon={<DeleteIcon />}
              id={params.id}
              action={deleteworking_shifts}
              pageSize={pageSize}
              rerenderAction={getworking_shiftsData}
            />
          )}
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
    dispatch(getworking_shiftsData(info));
  }, [dispatch, pageSize]);
  return (
    <Box m="20px">
      <Box
        display="flex"
        dir={sidebarRTL ? "rtl" : "ltr"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title={t("working shifts")} />

        {hasPermission("store-working_shifts") && (
          <>
            <CustomLinkButton to={"add"} />
            {/* <Addworking_shifts pageSize={pageSize} /> */}
          </>
        )}
      </Box>
      <CustomTableBox
        tableData={tableData}
        action={searchworking_shiftsData}
        CustomPagenation={
          <CustomPagenation
            pageSize={pageSize}
            nextPage={nextPage}
            lastPage={lastPage}
            prevPage={prevPage}
            currentPage={currentPage}
            firstPage={firstPage}
            action={fetchworking_shiftsDataByPage}
          />
        }
      />
    </Box>
  );
};
export default Working_shiftsTable;
