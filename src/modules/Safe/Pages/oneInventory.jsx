import { useEffect, useRef, useState } from "react";
import useMainHooks from "../../../hooks/useMainHooks";
import {
  fetchInventoriesDataByPage,
  getInventories,
} from "../redux/safe-slice";
import { useSelector } from "react-redux";
import CustomToolTip from "../../../components/CustomToolTip/customToolTip";
import { Box } from "@mui/material";
import CustomTableBox from "../../../components/customTableBox/CustomTableBox";
import CustomPagenation from "../../../components/CustomPagenation/CustomPagenation";
import { useParams } from "react-router-dom";
const OneInventory = () => {
  const [pageSize, SetPageSize] = useState(10);
  const { id } = useParams();

  const { dispatch, t } = useMainHooks();
  const data = useSelector((state) => state.safeSlice);
  console.log(data, "dataaaaaaa");
  const dataRef = useRef();
  useEffect(() => {
    dispatch(getInventories({ pageSize: pageSize }));
  }, [dispatch, pageSize, dataRef]);

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
  ];

  let OneInventory = data?.inventories?.find((item) => item.id == id)?.items;

  const tableData = {
    rows: OneInventory || [],
    pageSize: pageSize,
    columns: columns,
    loading: data.loading,
    onPageSizeChange: (newPageSize) => SetPageSize(newPageSize),
  };
  return (
    <Box m={2}>
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
            currentPage={data.currentPage}
            pageSize={pageSize}
          />
        }
      />
    </Box>
  );
};

export default OneInventory;
