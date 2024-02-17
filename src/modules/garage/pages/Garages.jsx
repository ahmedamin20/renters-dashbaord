import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteGarage,
  fetchGarageDataByPage,
  getGarages,
  getSearchGarages,
} from "../redux/garages.js";
import CustomTableBox from "../../../components/customTableBox/CustomTableBox.jsx";
import Header from "../../../components/Header.jsx";
import { Box, ButtonGroup, useTheme } from "@mui/material";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import CustomDelete from "../../../components/CutsomDelete/CustomDelete.jsx";
import CustomPagenation from "../../../components/CustomPagenation/CustomPagenation.jsx";
import { tokens } from "../../../theme.js";
import { useTranslation } from "react-i18next";
import CustomToolTip from "../../../components/CustomToolTip/customToolTip.jsx";
import hasPermission from "../../../utils/haspermission.js";
import { Link } from "react-router-dom";
import DefaultButton from "../../../components/defaultBtn.jsx";
import EditButton from "../../../components/editButton.jsx";
import { isMainGarage } from "../../../enums/garageEnum.js";

const Garages = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();
  const { sidebarRTL } = useSidebarContext();
  const [pageSize, SetPageSize] = useState(10);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.garages.garagesData.data) || [];
  const firstPage = useSelector((state) => state.garages.garagesLinks.first);
  const nextPage = useSelector((state) => state.garages.garagesLinks.next);
  const lastPage = useSelector((state) => state.garages.garagesLinks.last);
  const prevPage = useSelector((state) => state.garages.garagesLinks.prev);
  const currentPage = useSelector((state) => state.garages.currentPage);
  const loading = useSelector((state) => state.garages.loading);

  const columns = [
    { field: "id", headerName: t("ID"), width: 120 },
    {
      field: "name",
      headerName: t("Name"),
      width: 200,
      cellClassName: "name-column--cell",
    },
    {
      field: "address",
      headerName: t("address"),
      width: 320,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.address} />,
    },
    {
      field: "phone",
      headerName: t("phone"),
      width: 200,
      cellClassName: "name-column--cell",
    },
    {
      field: "manager",
      headerName: t("manager"),
      width: 200,
      cellClassName: "name-column--cell",
      renderCell: (params) => <span>{params.row.manager.name}</span>,
    },

    {
      field: "actions",
      headerName: t("Actions"),
      width: 400,
      renderCell: (params) => (
        <ButtonGroup
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {hasPermission("update-garage") && (
            <Link to={`edit/${params.row.id}`}>
              <EditButton text="Edit" />
            </Link>
          )}
          {hasPermission("delete-garage") && (
            <CustomDelete
              sx={{
                background: `${colors.redAccent[600]}`,
              }}
              disabled={isMainGarage(params.id)}
              action={deleteGarage}
              rerenderAction={getGarages}
              id={params.id}
              pageSize={pageSize}
            />
          )}
        </ButtonGroup>
      ),
    },
  ];
  useEffect(() => {
    dispatch(getGarages({ pageSize: pageSize }));
  }, [dispatch, pageSize]);

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
        <Header title={t("Garages")} />
        {/* {hasPermission("store-garage") && <AddGarage pageSize={pageSize} />} */}
        {hasPermission("store-garage") && (
          <Link to="add">
            <DefaultButton text="Add" />
          </Link>
        )}
      </Box>
      <CustomTableBox
        tableData={tableData}
        action={getSearchGarages}
        CustomPagenation={
          <CustomPagenation
            action={fetchGarageDataByPage}
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
export default Garages;
