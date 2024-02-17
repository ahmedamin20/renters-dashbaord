import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, useTheme } from "@mui/material";
import CustomTableBox from "../../../../components/customTableBox/CustomTableBox.jsx";
import { useSidebarContext } from "../../../../pages/global/sidebar/sidebarContext.js";
import Header from "../../../../components/Header.jsx";
import { useTranslation } from "react-i18next";
import CustomPagenation from "../../../../components/CustomPagenation/CustomPagenation.jsx";
import CustomDelete from "../../../../components/CutsomDelete/CustomDelete.jsx";
import { tokens } from "../../../../theme.js";
import CustomToolTip from "../../../../components/CustomToolTip/customToolTip.jsx";
import CustomLoader from "../../../../components/CustomLoader/CustomLoader.jsx";
import hasPermission from "../../../../utils/haspermission.js";
import {
  deletePenalty,
  fetchPenaltyDataByPage,
  getPenalty,
  searchPenalty,
} from "../../redux/allowancePenaltyTypes.js";
import CustomLinkButton from "../../../../components/CustomLinkButton.jsx";

const PenaltyTable = () => {
  const data = useSelector((state) => state.Penalty.penaltyData.data) || [];
  const loading = useSelector((state) => state.Penalty.loading);
  const firstPage = useSelector((state) => state.Penalty.penaltyLinks.first);
  const nextPage = useSelector((state) => state.Penalty.penaltyLinks.next);
  const lastPage = useSelector((state) => state.Penalty.penaltyLinks.last);
  const prevPage = useSelector((state) => state.Penalty.penaltyLinks.prev);
  const currentPage = useSelector((state) => state.Penalty.currentPage);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { sidebarRTL } = useSidebarContext();
  const [pageSize, SetPageSize] = useState(10);

  useEffect(() => {
    dispatch(getPenalty({ pageSize: pageSize }));
  }, [dispatch, pageSize]);

  const columns = [
    {
      field: "id",
      headerName: t("id"),
      width:220,
    },
    {
      field: "name",
      headerName: t("name"),
      width:420,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.name} />,
    },
    {
      field: "type",
      headerName: t("type"),
      width:320,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.type} />,
    },
    {
      field: "actions",
      headerName: t("Actions"),
      width:550,
      justifyContent: "center",
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            // justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {hasPermission("show-allowances_penalties_types") && (
            // <EditPenalty
            //   name={params.row.name}
            //   type={params.row.type}
            //   id={params.row.id}
            //   currentPage={currentPage}
            // />
            <CustomLinkButton to={"edit"} params={params.row.id} />
          )}

          {hasPermission("delete-allowances_penalties_types") && (
            <CustomDelete
              sx={{
                background: `${colors.redAccent[600]}`,
              }}
              action={deletePenalty}
              rerenderAction={getPenalty}
              id={params.id}
              pageSize={pageSize}
            />
          )}
          {/* )} */}
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
        <Header title={t("allowances_penalties_types")} />
        {hasPermission("store-allowances_penalties_types") && (
          <CustomLinkButton to={"add"} />
        )}
      </Box>
      <CustomTableBox
        tableData={tableData}
        action={searchPenalty}
        CustomPagenation={
          <CustomPagenation
            action={fetchPenaltyDataByPage}
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
export default PenaltyTable;
