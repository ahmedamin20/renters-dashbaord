import { useState, useEffect } from "react";
import {
  Box,
  ButtonGroup,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme.js";
import Header from "../../../components/Header.jsx";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch, useSelector } from "react-redux";
import {
  SearchProducts,
  getStudents,
  removeStudents,
} from "../../../redux/student.js";
import DefaultButton from "../../../components/Button/Button.jsx";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import Pagenation from "./pagenation.jsx";
import "./ProductForm.css";
import CustomDelete from "../../../components/CutsomDelete/CustomDelete.jsx";
import hasPermission from "../../../utils/haspermission.js";
import BarCodeComponent from "../../../components/barCode.jsx";
import CustomSearch from "../../../components/customSearch/customSearch.jsx";
import EditButton from "../../../components/editButton.jsx";

const ProductsTable = () => {
  const [pageSize, setPageSize] = useState(10);
  const { sidebarRTL } = useSidebarContext();
  const { t } = useTranslation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStudents({ pageSize }));
  }, [dispatch, pageSize]);

  const data = useSelector((state) => state?.student?.students?.data) || {};
  const loading = useSelector((state) => state?.student?.loading);
  const columns = [
    { field: "id", headerName: t("ID"), width: 120 },
    {
      field: "name",
      headerName: t("Name"),
      width: 180,
      cellClassName: "name-column--cell",
    },
    {
      field: "serial_number",
      headerName: t("serial_number"),
      width: 180,
      cellClassName: "name-column--cell",
    },
    {
      field: "bar_code",
      headerName: t("bar_code"),
      width: 180,
      cellClassName: "name-column--cell",
      renderCell: (params) => <BarCodeComponent value={params.row.bar_code} />,
    },
    {
      field: "quantity",
      headerName: t("quantity"),
      width: 180,
      cellClassName: "name-column--cell",
    },
    {
      field: "minimum_quantity",
      headerName: t("minimum_quantity"),
      width: 200,
      cellClassName: "name-column--cell",
    },
    {
      field: "purchase_price",
      headerName: t("purchase_price"),
      width: 150,
      cellClassName: "name-column--cell",
    },
    {
      field: "selling_price",
      headerName: t("selling_price"),
      width: 200,
      cellClassName: "name-column--cell",
    },
    {
      field: "storehouse_place",
      headerName: t("storehouse_place"),
      width: 200,
      cellClassName: "name-column--cell",
    },
    {
      field: "country_name",
      headerName: t("country_name"),
      width: 200,
      cellClassName: "name-column--cell",
    },
    {
      field: "installation_code",
      headerName: t("installation_code"),
      width: 200,
      cellClassName: "name-column--cell",
    },
    {
      field: "actions",
      headerName: t("Actions"),
      width: 250,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: sidebarRTL
              ? "row-reverse !important"
              : "row !important",
          }}
        >
          {hasPermission("update-product") && (
            <Link
              to={`${params.id}/edit-Product`}
              style={{
                textDecoration: "none",
              }}
            >
              <EditButton text={t("Edit")} />
             
            </Link>
          )}
          {hasPermission("delete-product") && (
            <CustomDelete
              sx={{
                background: `${colors.redAccent[600]}`,
              }}
              pageSize={pageSize}
              id={params.id}
              icon={<DeleteForeverIcon />}
              action={removeStudents}
              rerenderAction={getStudents}
            />
          )}
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Box
        flexDirection={sidebarRTL ? "row-reverse" : "row"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title={t("product")} />
        {hasPermission("store-product") && (
          <Link to="add-Product">
            <ButtonGroup>
              <DefaultButton text={t("Add")} />
            </ButtonGroup>
          </Link>
        )}
      </Box>
      <Box
        m="8px 0 0 0"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
            fontWeight: "bold",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
            fontWeight: "bold",
            fontSize: "20px",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiChackbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiButtonGroup-root.MuiButtonGroup-outlined.css-iajp3t-MuiButtonGroup-root":
            {
              display: "flex",
              alignItems: "center",
              flexDirection: sidebarRTL ? "row-reverse" : "row",
              gap: sidebarRTL ? "35px" : "0px",
            },
          "& .MuiDataGrid-cell.MuiDataGrid-cell--textLeft": {
            justifyContent: sidebarRTL
              ? "flex-end !important"
              : "flex-start !important",
          },
          "& .MuiDataGrid-columnHeaderDraggableContainer": {
            flexDirection: sidebarRTL
              ? "row-reverse !important"
              : "row !important",
          },
          "& .MuiDataGrid-columnHeaderTitleContainer": {
            justifyContent: sidebarRTL ? "end !important" : "start !important",
            flexDirection: sidebarRTL
              ? "row-reverse !important"
              : "row !important",
          },
        }}
      >
        <CustomSearch action={SearchProducts} pageSize={pageSize} />
        {loading ? (
          <CircularProgress />
        ) : (
          <DataGrid
            sx={{
              fontWeight: "bold",
              fontSize: "14px",
            }}
            rows={data}
            autoHeight
            disableSelectionOnClick={true}
            pageSize={pageSize}
            componentsProps={{
              pagination: {
                labelRowsPerPage: t("rowsPerPageText"),
                dir: sidebarRTL ? "rtl" : "ltr",
              },
            }}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 15]}
            columns={sidebarRTL ? columns.reverse() : columns}
          />
        )}
        <Pagenation pageSize={pageSize} />
      </Box>
    </Box>
  );
};

export default ProductsTable;
