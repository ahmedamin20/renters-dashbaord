import React, { useState } from "react";
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
  deleteStoreHouse,
  fetchStoreHouseDataByPage,
  getStoreHouses,
  searchStoreHouse,
} from "../redux/storeHouse.js";
import EditStoreHouse from "./editStoreHouse.jsx";
import { Link } from "react-router-dom";
import DefaultButton from "../../../components/defaultBtn.jsx";
import EditButton from "../../../components/editButton.jsx";
import { isMainStorehouse } from "../../../enums/storehouseEnum.js";
import hasPermission from "../../../utils/haspermission.js";

const StoreHouse = () => {
  const data =
    useSelector((state) => state.storeHouse.storeHouseData.data) || [];
  const loading = useSelector((state) => state.storeHouse.loading);
  const firstPage = useSelector(
    (state) => state.storeHouse.storeHouseLinks.first
  );
  const nextPage = useSelector(
    (state) => state.storeHouse.storeHouseLinks.next
  );
  const lastPage = useSelector(
    (state) => state.storeHouse.storeHouseLinks.last
  );
  const prevPage = useSelector(
    (state) => state.storeHouse.storeHouseLinks.prev
  );
  const currentPage = useSelector((state) => state.storeHouse.currentPage);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { sidebarRTL } = useSidebarContext();
  const [pageSize, SetPageSize] = useState(10);
  useEffect(() => {
    dispatch(getStoreHouses({ pageSize: pageSize }));
  }, [dispatch, pageSize]);

  const columns = [
    {
      field: "id",
      headerName: t("id"),
      width: 150,
    },
    {
      field: "name",
      headerName: t("name"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.name} />,
    },
    {
      field: "phone",
      headerName: t("phone"),
      cellClassName: "name-column--cell",
      width: 200,
      renderCell: (params) => <CustomToolTip text={params.row.phone} />,
    },
    {
      field: "manager",
      headerName: t("manager"),
      width: 200,
      renderCell: (params) => <CustomToolTip text={params.row.manager.name} />,
    },
    {
      field: "garage",
      headerName: t("garage"),
      width: 200,
      renderCell: (params) => <CustomToolTip text={params.row.garage.name} />,
    },
    {
      field: "address",
      headerName: t("address"),
      width: 250,
      renderCell: (params) => <CustomToolTip text={params.row.address} />,
    },
    {
      field: "actions",
      headerName: t("Actions"),
      width: 400,
      renderCell: (params) => (
        <ButtonGroup sx={{ display: "flex", alignItems: "center" }}>
          {hasPermission("update-store_house") && (
            <Link to={`edit/${params.row.id}`}>
              <EditButton text="edit" />
            </Link>
          )}
          {hasPermission("delete-store_house") && (
            <CustomDelete
              sx={{
                background: `${colors.redAccent[600]}`,
              }}
              action={deleteStoreHouse}
              disabled={isMainStorehouse(params.id)}
              rerenderAction={getStoreHouses}
              id={params.id}
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
  return (
    <Box m={2}>
      <Box
        flexDirection={sidebarRTL ? "row-reverse" : "row"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title={t("store_house")} />
        {hasPermission("store-store_house") && (
          <Link to="add">
            <DefaultButton text="ADD" />
          </Link>
        )}
        {/* <AddStoreHouse paseSize={pageSize} /> */}
      </Box>
      <CustomTableBox
        tableData={tableData}
        action={searchStoreHouse}
        CustomPagenation={
          <CustomPagenation
            action={fetchStoreHouseDataByPage}
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
  );
};
export default StoreHouse;