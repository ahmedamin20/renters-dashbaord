import CustomToolTip from "../../../components/CustomToolTip/customToolTip";
import CustomDelete from "../../../components/CutsomDelete/CustomDelete";
import useMainHooks from "./../../../hooks/useMainHooks";
import { Box } from "@mui/material";
import {
  fetchSafeDataByPage,
  getBudget,
  getSafe,
  removeSafe,
  searchSafe,
} from "../redux/safe-slice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../../components/Header";
import CustomPagenation from "../../../components/CustomPagenation/CustomPagenation";
import CustomTableBox from "../../../components/customTableBox/CustomTableBox";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import SouthWestIcon from "@mui/icons-material/SouthWest";
import CustomLinkButton from "./../../../components/CustomLinkButton";
import { Link } from "react-router-dom";
import EditButton from "../../../components/editButton";
const SafePage = () => {
  const { t, hasPermission, sidebarRTL, dispatch, colors } = useMainHooks();
  const [pageSize, SetPageSize] = useState();
  useEffect(() => {
    dispatch(getBudget());
    dispatch(getSafe({ pageSize }));
  }, []);

  const columns = [
    {
      field: "id",
      headerName: t("id"),
      width: 100,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.id} />,
    },
    {
      field: "description",
      headerName: t("description"),
      width: 400,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.description} />,
    },
    {
      field: "amount",
      headerName: t("amount"),
      width: 200,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.amount} />,
    },
    {
      field: "incoming",
      headerName: t("incoming"),
      width: 200,
      cellClassName: "name-column--cell",
      renderCell: (params) =>
        params.row.incoming ? (
          <span
            style={{
              backgroundColor: "green",
              color: "white",
              padding: ".5rem",
              borderRadius: ".4rem",
            }}
          >
            {t("incoming")}
            <SouthWestIcon />
          </span>
        ) : (
          <span
            style={{
              backgroundColor: "red",
              color: "white",
              padding: ".5rem",
              borderRadius: ".4rem",
            }}
          >
            {t("outGoing")}
            <ArrowOutwardIcon />
          </span>
        ),
    },
    {
      field: "created_at",
      headerName: t("created_at"),
      width: 300,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.created_at} />,
    },
    {
      field: "updated_at",
      headerName: t("updated_at"),
      width: 300,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.updated_at} />,
    },
    {
      field: "type",
      headerName: t("type"),
      width: 300,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.type} />,
    },
    {
      field: "money_payer_name",
      headerName: t("money_payer_name"),
      width: 300,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <CustomToolTip text={params.row.money_payer_name} />
      ),
    },
    {
      field: "money_receiver_name",
      headerName: t("money_receiver_name"),
      width: 300,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <CustomToolTip text={params.row.money_receiver_name} />
      ),
    },
    {
      field: "check_number",
      headerName: t("check_number"),
      width: 300,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.check_number} />,
    },

    {
      field: "actions",
      headerName: t("Actions"),
      width: 300,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {hasPermission("update-safe") && (
            <>
              <CustomLinkButton to={`edit`} params={params.row.id} />
            </>
          )}
          {hasPermission("delete-safe") && (
            <CustomDelete
              sx={{
                background: `${colors.redAccent[600]}`,
              }}
              action={removeSafe}
              rerenderAction={getSafe}
              id={params.id}
              pageSize={pageSize}
            />
          )}
        </Box>
      ),
    },
  ];

  const safeData = useSelector((state) => state.safeSlice),
    allTableData = safeData?.safeData?.data || [],
    safeLinks = safeData?.links,
    budget = safeData.budget;

  const tableData = {
    rows: allTableData || [],
    pageSize: pageSize,
    columns: columns,
    loading: safeData.loading,
    onPageSizeChange: (newPageSize) => SetPageSize(newPageSize),
  };
  console.log(safeData);
  return (
    <Box m={2}>
      <Box
        flexDirection={sidebarRTL ? "row-reverse" : "row"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title={t("safe")} />

        {hasPermission("store-safe") && <CustomLinkButton to={"add"} />}
        {/* {hasPermission("store-safe") && <SafeForm />} */}
      </Box>
      <br />
      <Box
        flexDirection={!sidebarRTL ? "row-reverse" : "row"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        {hasPermission("all-safe_inventory") && (
          <Link to={"inventories"}>
            <EditButton text={t("show_inventories")} />
          </Link>
        )}
        <br />
        <span
          style={{
            fontSize: "35px",
            fontWeight: "bold",
            color:
              Number(budget?.amount.replaceAll(",", "")) > "0"
                ? "green"
                : "red",
          }}
        >
          {hasPermission("show-budget") && t("amount")} = {budget?.amount}
        </span>
      </Box>

      <CustomTableBox
        tableData={tableData}
        action={searchSafe}
        CustomPagenation={
          <CustomPagenation
            action={fetchSafeDataByPage}
            firstPage={safeLinks?.first}
            nextPage={safeLinks?.next}
            lastPage={safeLinks?.last}
            prevPage={safeLinks?.prev}
            currentPage={safeData?.safeData?.meta?.current_page}
            pageSize={pageSize}
          />
        }
      />
    </Box>
  );
};
export default SafePage;
