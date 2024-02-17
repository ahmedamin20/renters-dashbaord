import { Box, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteSubUnit, getSearchSubUnits, getSubUnits } from "../redux/Units.js";
import CustomDelete from "../../../components/CutsomDelete/CustomDelete.jsx";
import { tokens } from "../../../theme.js";
import { useTranslation } from "react-i18next";
import CustomTableBox from "../../../components/customTableBox/CustomTableBox.jsx";
import EditSubUnits from "./EditSubUnit.jsx";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import Header from "../../../components/Header.jsx";
import AddSubUnit from "./AddSubUnit.jsx";
import hasPermission from "../../../utils/haspermission.js";

const SubUnitsTbale = () => {
  const { id } = useParams();
  const { sidebarRTL } = useSidebarContext();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const data = useSelector((state) => state.units.unitsSubData.data) || [];
  const loading = useSelector((state) => state.units.loading);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: t("ID"), width: 250 },
    {
      field: "name",
      headerName: t("Name"),
      width: 280,
      cellClassName: "name-column--cell",
    },
    {
      field: "symbol",
      headerName: t("symbol"),
      width: 390,
      cellClassName: "name-column--cell",
    },
    {
      field: "actions",
      headerName: t("Actions"),
      width: 550,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          {hasPermission("update-sub_unit") && (
            <EditSubUnits
              sx={{
                background: `${colors.primary[600]}`,
              }}
              id={params.row.id}
            />
          )}
          {hasPermission("delete-sub_unit") && (
            <CustomDelete
              sx={{
                background: `${colors.redAccent[600]}`,
              }}
              action={deleteSubUnit}
              rerenderAction={getSubUnits}
              id={params.id}
              rerenderId={id}
            />
          )}
        </Box>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getSubUnits({ id }));
  }, [id, dispatch]);

  const tableData = {
    rows: data.length > 0 && data,
    columns: columns,
    loading: loading,
  }
  return (
    <Box m={2}>
      <Box
        flexDirection={sidebarRTL ? "row-reverse" : "row"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title={t("sub Units")} />
        {hasPermission("store-sub_unit") && <AddSubUnit />}
      </Box>
      <CustomTableBox action={getSearchSubUnits} id={id} tableData={tableData} />
    </Box>
  );
};

export default SubUnitsTbale;
