import   { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, useTheme } from "@mui/material";
import CustomTableBox from "../../../components/customTableBox/CustomTableBox.jsx";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import Header from "../../../components/Header.jsx";
import { useTranslation } from "react-i18next";
import CustomPagenation from "../../../components/CustomPagenation/CustomPagenation.jsx";
import { tokens } from "../../../theme.js";
import CustomToolTip from "../../../components/CustomToolTip/customToolTip.jsx";
import { Link } from "react-router-dom";
import CustomLoader from "../../../components/CustomLoader/CustomLoader.jsx";
import {
  fetchComsumedProductDataByPage,
  getConsumedProduct,
  searchComsumedProducts,
} from "../redux/consumedProduct.js";
import hasPermission from "../../../utils/haspermission.js";
import EditButton from "../../../components/editButton.jsx";

const ConsumedProducts = () => {
  const data =
    useSelector((state) => state.consumedProducts.consumedProductsData.data) ||
    [];
  const loading = useSelector((state) => state.consumedProducts.loading);
  const firstPage = useSelector(
    (state) => state.consumedProducts.consumedProductsLinks.first
  );
  const nextPage = useSelector(
    (state) => state.consumedProducts.consumedProductsLinks.next
  );
  const lastPage = useSelector(
    (state) => state.consumedProducts.consumedProductsLinks.last
  );
  const prevPage = useSelector(
    (state) => state.consumedProducts.consumedProductsLinks.prev
  );
  const currentPage = useSelector(
    (state) => state.consumedProducts.currentPage
  );

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { sidebarRTL } = useSidebarContext();
  const [pageSize, SetPageSize] = useState(10);

  useEffect(() => {
    dispatch(getConsumedProduct({ pageSize: pageSize }));
  }, [dispatch, pageSize]);

  const columns = [
    {
      field: "name",
      headerName: t("name"),
      width: 220,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.name} />,
    },
    {
      field: "main_unit",
      headerName: t("main_unit"),
      width: 220,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <CustomToolTip text={params.row.main_unit.name} />
      ),
    },
    {
      field: "sub_unit",
      headerName: t("sub_unit"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.sub_unit.name} />,
    },
    {
      field: "main_unit_purchase_price_total",
      headerName: t("main_unit_purchase_price_total"),
      cellClassName: "name-column--cell",
      width: 200,
      renderCell: (params) => (
        <CustomToolTip text={params.row.main_unit_purchase_price_total} />
      ),
    },
    {
      field: "sub_unit_purchase_price",
      headerName: t("sub_unit_purchase_price"),
      // cellClassName: "name-column--cell",
      width: 200,
      renderCell: (params) => (
        <CustomToolTip text={params.row.sub_unit_purchase_price} />
      ),
    },
    {
      field: "main_unit_quantity",
      headerName: t("main_unit_quantity"),
      // cellClassName: "name-column--cell",
      width: 200,
      renderCell: (params) => (
        <CustomToolTip text={params.row.main_unit_quantity} />
      ),
    },
    {
      field: "sub_unit_quantity",
      headerName: t("sub_unit_quantity"),
      // cellClassName: "name-column--cell",
      width: 200,
      renderCell: (params) => (
        <CustomToolTip text={params.row.sub_unit_quantity} />
      ),
    },
    {
      field: "main_unit_selling_price_total",
      headerName: t("main_unit_selling_price_total"),
      // cellClassName: "name-column--cell",
      width: 200,
      renderCell: (params) => (
        <CustomToolTip text={params.row.main_unit_selling_price_total} />
      ),
    },
    {
      field: "sub_unit_selling_price",
      headerName: t("sub_unit_selling_price"),
      // cellClassName: "name-column--cell",
      width: 200,
      renderCell: (params) => (
        <CustomToolTip text={params.row.sub_unit_selling_price} />
      ),
    },
    {
      field: "actions",
      headerName: t("Actions"),
      width: 290,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {hasPermission("update-consumed_product") && (
            <Link to={`edit/${params.row.id}`}>
              <EditButton text="edit" />
             
            </Link>
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
        <Header title={t("consumed_products")} />
        {hasPermission("store-consumed_product") && (
          <Link to="add">
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
        action={searchComsumedProducts}
        CustomPagenation={
          <CustomPagenation
            action={fetchComsumedProductDataByPage}
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
export default ConsumedProducts;
