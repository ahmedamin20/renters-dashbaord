import { Avatar, Box, Button, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomLoader from "../../../components/CustomLoader/CustomLoader.jsx";
import CustomPagenation from "../../../components/CustomPagenation/CustomPagenation.jsx";
import CustomToolTip from "../../../components/CustomToolTip/customToolTip.jsx";
import Header from "../../../components/Header.jsx";
import CustomTableBox from "../../../components/customTableBox/CustomTableBox.jsx";
import EditButton from "../../../components/editButton.jsx";
import GreenButton from "../../../components/greenButton.jsx";
import { car_fix_status_enum } from "../../../enums/carFixStatusEnum.js";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import { StatuseCode } from "../../../statuseCodes.js";
import { tokens } from "../../../theme.js";
import hasPermission from "../../../utils/haspermission.js";
import {
  fetchCarFixDataByPage,
  finishCarFix,
  getCarFix,
  searchCarFix,
} from "../redux/carFix.js";
import FollowupRepair from "./followupRepair.jsx";
import Pay from "./pay.jsx";
import CustomSelectMenu from "../../../components/CustomSelect/CustomSelect.jsx";

const CarFix = () => {
  const data = useSelector((state) => state.CarFix.carFixData.data) || [];
  const statusObject = {
    PENDING: 0,
    RENTING: 1,
    REJECTED: 2,
    FINISHED: 3,
    CANCELED: 4
  };
  const garagesMenu = [
    { name: "PENDING", id: 0 },
    { name: "RENTING", id: 1 },
    { name: "REJECTED", id: 2 },
    { name: "FINISHED", id: 3 },
    { name: "CANCELED", id: 4 }
  ];
  const loading = useSelector((state) => state.CarFix.loading);
  const firstPage = useSelector((state) => state.CarFix.carFixLinks.first);
  const nextPage = useSelector((state) => state.CarFix.carFixLinks.next);
  const lastPage = useSelector((state) => state.CarFix.carFixLinks.last);
  const prevPage = useSelector((state) => state.CarFix.carFixLinks.prev);
  const currentPage = useSelector((state) => state.CarFix.currentPage);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { sidebarRTL } = useSidebarContext();
  const [pageSize, SetPageSize] = useState(10);
  const [selectedGarage, SetSelectedGarage] = useState("1");
  const handleGarageChange = (value) => {
    SetSelectedGarage(value?.id);
  };
 

  useEffect(() => {
    dispatch(getCarFix({ id: selectedGarage, pageSize: pageSize }));
  }, [ pageSize, selectedGarage]);

  const columns = [
    {
      field: "id",
      headerName: t("id"),
      width: 50,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <CustomToolTip text={params.row.id} />
      ),
    },
    {
      field: "from date",
      headerName: t("from date"),
      width: 180,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <CustomToolTip text={params.row.from_date} />
      ),
    },
    {
      field: "to date",
      headerName: t("to date"),
      width: 180,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <CustomToolTip text={params.row.to_date} />
      ),
    },
    
    {
      field: "price",
      headerName: t("price"),
      width: 200,
      renderCell: (params) => (
        <CustomToolTip text={`${params.row.price} EGP`} />
      ),
    },
    {
      field: "product",
      headerName: t("product"),
      width: 150,
      renderCell: (params) => (
        <CustomToolTip text={params.row?.product?.name} />
      ),
    },
    {
      field: "from user",
      headerName: t("from user"),
      width: 150,
      renderCell: (params) => (
        <Box sx={{ margin: "auto" }}>
          <CustomToolTip text={params.row.from_user.name} />
        </Box>
      ),
    },
    {
      field: "to user",
      headerName: t("to user"),
      width: 150,
      renderCell: (params) => <CustomToolTip text={params.row.to_user.name} />,
    },
    {
      field: "Product Image",
      headerName: t("Product Image"),
      width: 150,
      renderCell: (params) => <Avatar src={params.row?.product?.main_image} />,
    },
    
    {
      field: "created_at",
      headerName: t("created_at"),
      width: 300,
      renderCell: (params) => <CustomToolTip text={params.row.created_at} />,
    },
    {
      field: "status",
      headerName: t("status"),
      width: 180,
      renderCell: (params) => {
        switch (params.row.status) {
          case statusObject.FINISHED:
            return (
              <CustomToolTip
                text="FINISHED"
                background={colors.greenAccent[600]}
              />
            );
          case statusObject.CANCELED:
            return (
              <CustomToolTip
                text="CANCELED"
                background={colors.redAccent[600]}
              />
            );
          case statusObject.PENDING:
            return (
              <CustomToolTip
                text="PENDING"
                background={colors.primary[600]}
              />
            );
          case statusObject.REJECTED:
            return (
              <CustomToolTip
                color="white"
                text="REJECTED"
                background={colors.grey[600]}
              />
            );
          case statusObject.RENTING:
            return (
              <CustomToolTip text="RENTING" background={colors.grey[600]} />
            );
          
          default:
            return null;
        }
      },
    },
    {
      field: "actions",
      headerName: t("Actions"),
      width: 650,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            
            {hasPermission("show-car_fix") && (
              <Link to={`${params.row.id}/show/`}>
                <GreenButton text="show" />
              </Link>
            )}
            
            
            

            
          </Box>
        );
      },
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
        <Header title={t("Orders")} />
        
        <CustomSelectMenu
          defaultData={selectedGarage}
          onChange={handleGarageChange}
          lable="Order State"
          options={garagesMenu}
        />
      </Box>
      <CustomTableBox
        tableData={tableData}
        action={searchCarFix}
        CustomPagenation={
          <CustomPagenation
            action={fetchCarFixDataByPage}
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
export default CarFix;
