import { useState } from "react";
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
import { getGaragesMenu } from "../../../redux/select_menus.js";
import CustomSelectMenu from "../../../components/CustomSelect/CustomSelect.jsx";
import CustomLoader from "../../../components/CustomLoader/CustomLoader.jsx";
import {
  fetchCarFixDataByPage,
  finishCarFix,
  getCarFix,
  searchCarFix,
} from "../redux/carFix.js";
import { Link } from "react-router-dom";
import DefaultButton from "../../../components/defaultBtn.jsx";
import GreenButton from "../../../components/greenButton.jsx";
import { car_fix_status_enum } from "../../../enums/carFixStatusEnum.js";
import FollowupRepair from "./followupRepair.jsx";
import Pay from "./pay.jsx";
import EditButton from "../../../components/editButton.jsx";
import { StatuseCode } from "../../../statuseCodes.js";
import hasPermission from "../../../utils/haspermission.js";

const CarFix = () => {
  const data = useSelector((state) => state.CarFix.carFixData.data) || [];
  const garagesMenu =
    useSelector((state) => state.selectMenu.garagesMenu.data) || [];
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
  const [selectedGarage, SetSelectedGarage] = useState(null);
  const handleGarageChange = (value) => {
    SetSelectedGarage(value?.id);
  };
  useEffect(() => {
    dispatch(getGaragesMenu());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCarFix({ id: selectedGarage, pageSize: pageSize }));
  }, [dispatch, selectedGarage, pageSize]);

  const columns = [
    {
      field: "visitor",
      headerName: t("visitor"),
      width: 180,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <CustomToolTip text={params.row.visitor_car.visitor.name} />
      ),
    },
    {
      field: "car_license",
      headerName: t("car_license"),
      width: 180,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <CustomToolTip text={params.row.visitor_car.car_license} />
      ),
    },
    {
      field: "vin_number",
      headerName: t("vin_number"),
      width: 200,
      renderCell: (params) => (
        <CustomToolTip text={params.row.visitor_car.vin_number} />
      ),
    },
    {
      field: "visit_date",
      headerName: t("visit_date"),
      width: 150,
      renderCell: (params) => (
        <CustomToolTip text={params.row.visit.created_at} />
      ),
    },
    {
      field: "total_fix_amount",
      headerName: t("total_fix_amount"),
      width: 150,
      renderCell: (params) => (
        <Box sx={{ margin: "auto" }}>
          <CustomToolTip text={params.row.total_fix_amount} />
        </Box>
      ),
    },
    {
      field: "paid_amount",
      headerName: t("paid_amount"),
      width: 150,
      renderCell: (params) => <CustomToolTip text={params.row.paid_amount} />,
    },
    {
      field: "profit_amount",
      headerName: t("profit_amount"),
      width: 150,
      renderCell: (params) => <CustomToolTip text={params.row.profit_amount} />,
    },
    {
      field: "checking_amount",
      headerName: t("checking_amount"),
      width: 150,
      renderCell: (params) => (
        <CustomToolTip text={params.row.checking_amount} />
      ),
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
          case car_fix_status_enum.APPROVED:
            return (
              <CustomToolTip
                text="Approved"
                background={colors.greenAccent[600]}
              />
            );
          case car_fix_status_enum.DECLINED:
            return (
              <CustomToolTip
                text="DecLined"
                background={colors.redAccent[600]}
              />
            );
          case car_fix_status_enum.FINISHED:
            return (
              <CustomToolTip
                text="Finished"
                background={colors.greenAccent[600]}
              />
            );
          case car_fix_status_enum.PENDING:
            return (
              <CustomToolTip
                color="white"
                text="Pending"
                background={colors.primary[600]}
              />
            );
          case car_fix_status_enum.PROCESSING:
            return (
              <CustomToolTip text="Processing" background={colors.grey[600]} />
            );
          case car_fix_status_enum.TECHNICAL:
            return (
              <CustomToolTip
                text="Technical"
                background={colors.blueAccent[500]}
              />
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
        console.log("params.row", params);
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            {hasPermission("update-car_fix") &&
              (params.row.status == "1" || params.row.status == "2") && (
                <Link to={`${selectedGarage}/update/${params.row.id}`}>
                  <EditButton backGround={colors.primary[500]} text="edit" />
                </Link>
              )}
            {hasPermission("show-car_fix") && (
              <Link to={`${selectedGarage}/show/${params.row.id}`}>
                <GreenButton text="show" />
              </Link>
            )}
            {hasPermission("follow_up_repair-car_fix") && (
              <FollowupRepair
                disabled={params.row.status !== car_fix_status_enum.APPROVED}
                id={params.row.id}
                garage_id={selectedGarage}
              />
            )}
            {hasPermission("pay-car_fix") && (
              <Pay
                disabled={
                  params.row.status !== car_fix_status_enum.DECLINED ||
                  params.row.total_fix_amount > params.row.paid_amount
                }
                id={params.row.id}
                garage_id={selectedGarage}
              />
            )}
            {hasPermission("finish-car_fix") && (
              <EditButton
                disabled={params.row.status === car_fix_status_enum.PROCESSING}
                text="finish"
                backGround={colors.redAccent[500]}
                onClick={() => {
                  dispatch(
                    finishCarFix({
                      id: params.row.id,
                      garage_id: selectedGarage,
                    })
                  ).then((res) =>
                    res.payload.code === StatuseCode.OK
                      ? dispatch(
                          getCarFix({ id: selectedGarage, pageSize: pageSize })
                        )
                      : null
                  );
                }}
              />
            )}

            {hasPermission("export-car_fix") && (
              <a
                style={{ color: colors.grey[900] }}
                href={`https://api.ksbgarage.com/api/exports/car_fixes/${params.row.id}`}
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="contained">{t("Export")}</Button>
              </a>
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
        <Header title={t("car_fix")} />
        <CustomSelectMenu
          defaultData={selectedGarage}
          onChange={handleGarageChange}
          lable="select_garage"
          options={garagesMenu}
        />
        {hasPermission("store-car_fix") && (
          <Link to="add">
            <DefaultButton text="add" />
          </Link>
        )}
      </Box>
      <CustomTableBox
        tableData={tableData}
        id={selectedGarage}
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
