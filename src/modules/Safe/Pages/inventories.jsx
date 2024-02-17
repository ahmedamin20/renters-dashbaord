import { useEffect, useRef, useState } from "react";
import useMainHooks from "../../../hooks/useMainHooks";
import {
  fetchInventoriesDataByPage,
  getBudget,
  getInventories,
} from "../redux/safe-slice";
import { useSelector } from "react-redux";
import CustomToolTip from "../../../components/CustomToolTip/customToolTip";
import { Box } from "@mui/material";
import CustomTableBox from "../../../components/customTableBox/CustomTableBox";
import CustomPagenation from "../../../components/CustomPagenation/CustomPagenation";
import { Link } from "react-router-dom";
import Header from "../../../components/Header";
import AddInventories from "./addInventories";
import EditButton from "../../../components/editButton";

const Inventories = () => {
  const [pageSize, SetPageSize] = useState(10);
  const { dispatch, t, sidebarRTL, hasPermission } = useMainHooks();
  const data = useSelector((state) => state.safeSlice);
  const dataRef = useRef();
  useEffect(() => {
    dispatch(getInventories({ pageSize: pageSize }));
    dispatch(getBudget());
  }, [dispatch, pageSize, dataRef]);
  const columns = [
    {
      field: "id",
      headerName: t("id"),
      width: 200,
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
      field: "incoming_items_count",
      headerName: t("incoming_items_count"),
      width: 200,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <CustomToolTip text={params.row.incoming_items_count} />
      ),
    },

    {
      field: "outgoing_items_count",
      headerName: t("outgoing_items_count"),
      width: 200,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <CustomToolTip text={params.row.outgoing_items_count} />
      ),
    },
    {
      field: "outgoing_amount",
      headerName: t("outgoing_amount"),
      width: 200,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <CustomToolTip text={params.row.outgoing_amount} />
      ),
    },

    {
      field: "safe_amount",
      headerName: t("safe_amount"),
      width: 200,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.safe_amount} />,
    },
    {
      field: "safe_taken_money",
      headerName: t(`safe_taken_money`),
      width: 200,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <CustomToolTip text={params.row.safe_taken_money} />
      ),
    },
    {
      field: "remaining_money",
      headerName: t(`remaining_money`),
      width: 200,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <CustomToolTip text={params.row.remaining_money} />
      ),
    },
    {
      field: "incoming_amount",
      headerName: t("incoming_amount"),
      width: 200,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <CustomToolTip text={params.row.incoming_amount} />
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
      field: "user",
      headerName: t("user"),
      width: 300,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.user?.name} />,
    },

    {
      field: "actions",
      headerName: t("Actions"),
      width: 150,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to={`${params.row.id}/show`}>
            <EditButton backGround={"green"} text="show" />
          </Link>
        </Box>
      ),
    },
  ];
  const tableData = {
    rows: data?.inventories || [],
    pageSize: pageSize,
    columns: columns,
    loading: data.loading,
    onPageSizeChange: (newPageSize) => SetPageSize(newPageSize),
  };
  const budget = useSelector((state) => state.safeSlice.budget);
  let moneyColor =
    Number(budget?.amount.replaceAll(",", "")) > -1 ? "green" : "red";

  return (
    <Box m={2}>
      <Header title={t(`inventories`)} />
      <br />
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDirection={sidebarRTL ? "row-reverse" : "row"}
      >
        <span
          style={{ fontSize: "28px", color: moneyColor, fontWeight: "bold" }}
        >
          {hasPermission("show-budget") && t("amount")} = {budget?.amount}
        </span>
        <AddInventories />
      </Box>

      <CustomTableBox
        tableData={tableData}
        action={getInventories}
        CustomPagenation={
          <CustomPagenation
            action={fetchInventoriesDataByPage}
            firstPage={data?.links?.first}
            nextPage={data?.links?.next}
            lastPage={data?.links?.last}
            prevPage={data?.links?.prev}
            currentPage={data?.inventoriesMeta?.current_page}
            pageSize={pageSize}
          />
        }
      />
    </Box>
  );
};

export default Inventories;
