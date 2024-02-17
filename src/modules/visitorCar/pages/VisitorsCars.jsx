import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, ButtonGroup, useTheme } from "@mui/material";
import CustomTableBox from "../../../components/customTableBox/CustomTableBox.jsx";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import Header from "../../../components/Header.jsx";
import { useTranslation } from "react-i18next";
import CustomPagenation from "../../../components/CustomPagenation/CustomPagenation.jsx";
import CustomDelete from "../../../components/CutsomDelete/CustomDelete.jsx";
import { tokens } from "../../../theme.js";
import CustomToolTip from "../../../components/CustomToolTip/customToolTip.jsx";
import { deleteVisitorCar, fetchVisitorsCarsDataByPage, getVisitorsCars, searchVistorsCars } from "../redux/visitorsCars.js";
import CustomSelect from "../../../components/CustomSelect/CustomSelect.jsx";
import {
  getBrandsMenu,
  getColorsMenu,
  getVisitorsMenu,
} from "../../../redux/select_menus.js";
import { Link } from "react-router-dom";
import CustomLoader from "../../../components/CustomLoader/CustomLoader.jsx";
import hasPermission from "../../../utils/haspermission.js";
import EditButton from "../../../components/editButton.jsx";

const VisitorsCars = () => {
  const data =
    useSelector((state) => state.visitorsCars.VisitorsCarsData.data) || [];
  const [SelectedColor, SetSelecedColor] = useState(null);
  const [SelectedBrand, SetSelecedBrand] = useState(null);
  const [SelectedVisitor, SetSelecedVisitor] = useState(null);
  const loading = useSelector((state) => state.visitorsCars.loading);
  const brandsMenu =
    useSelector((state) => state.selectMenu.brandsMenu.data) || [];
  const colorsMenu =
    useSelector((state) => state.selectMenu.colorsMenu.data) || [];
  const visitorsMenu =
    useSelector((state) => state.selectMenu.visitorsMenu.data) || [];
  const firstPage = useSelector(
    (state) => state.visitorsCars.VisitorsCarsLinks.first
  );
  const nextPage = useSelector(
    (state) => state.visitorsCars.VisitorsCarsLinks.next
  );
  const lastPage = useSelector(
    (state) => state.visitorsCars.VisitorsCarsLinks.last
  );
  const prevPage = useSelector(
    (state) => state.visitorsCars.VisitorsCarsLinks.prev
  );
  const currentPage = useSelector((state) => state.visitorsCars.currentPage);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { sidebarRTL } = useSidebarContext();
    const [pageSize, SetPageSize] = useState(10);
    const info = {
        color_id: SelectedColor,
        brand_id: SelectedBrand,
        visitor_id: SelectedVisitor,
        pageSize: pageSize,
        handle: "",
      };
  useEffect(() => {
    const info = {
        color_id: SelectedColor,
        brand_id: SelectedBrand,
        visitor_id: SelectedVisitor,
        pageSize: pageSize,
        handle: "",
      };
    dispatch(getVisitorsCars(info));
  }, [dispatch, pageSize, SelectedColor, SelectedBrand, SelectedVisitor]);
  useEffect(() => {
    dispatch(getVisitorsMenu());
    dispatch(getBrandsMenu());
    dispatch(getColorsMenu());
  }, [dispatch]);
  const columns = [
    {
      field: "id",
      headerName: t("id"),
      width: 80,
    },
    {
      field: "vin_number",
      headerName: t("vin_number"),
      width: 150,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.vin_number} />,
    },
    {
      field: "car_license",
      headerName: t("car_license"),
      width: 100,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.car_license} />,
    },
    {
      field: "visitor",
      headerName: t("visitor"),
      cellClassName: "name-column--cell",
      width: 200,
      renderCell: (params) => <CustomToolTip text={params.row.visitor.name} />,
    },
    {
      field: "car_model",
      headerName: t("car_model"),
      cellClassName: "name-column--cell",
      width: 200,
      renderCell: (params) => <CustomToolTip text={params.row.car_model} />,
    },
    {
      field: "brand",
      headerName: t("brand"),
      width: 200,
      renderCell: (params) => <CustomToolTip text={params.row.brand.name} />,
    },
    {
      field: "color",
      headerName: t("color"),
      width: 200,
      renderCell: (params) => (
        <CustomToolTip
          background={params.row.color.code}
          text={params.row.color.name}
        />
      ),
    },
    {
      field: "model_year",
      headerName: t("model_year"),
      width: 150,
      renderCell: (params) => <CustomToolTip text={params.row.model_year} />,
    },
    {
      field: "actions",
      headerName: t("Actions"),
      width: 400,
      renderCell: (params) => (
        <ButtonGroup sx={{display: "flex",
        alignItems: "center",}} >
          {hasPermission("update-visitor_car") && (
            <Link to={`edit-Visitor-car/${params.row.id}`}>
              <EditButton text={"edit"} />
            
            </Link>
          )}
          {hasPermission("delete-visitor_car") && (
            <CustomDelete
              sx={{
                background: `${colors.redAccent[600]}`,
              }}
              action={deleteVisitorCar}
              info={info}
              rerenderAction={getVisitorsCars}
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
  const handleBrandChange = (item) => {
    SetSelecedBrand(item?.id);
  };
  const handleColorChange = (item) => {
    SetSelecedColor(item?.id);
  };
  const handleVisitorChange = (item) => {
    SetSelecedVisitor(item?.id);
  };
  return (
    
      !loading ? (
      
        <Box m={2}>
          <Box
            flexDirection={sidebarRTL ? "row-reverse" : "row"}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Header title={t("Visitors_Cars")} />
          {hasPermission("store-visitor_car") && (
            <Link to='add-visitor-car'>
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
          <Box
            flexDirection={sidebarRTL ? "row-reverse" : "row"}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <label>{t("brands")}</label>
              <CustomSelect
                placeholder="Select an option"
                onChange={handleBrandChange}
                options={brandsMenu}
              />
            </Box>
            <Box>
              <label>{t("Colors")}</label>
              <CustomSelect
                placeholder="Select an option"
                onChange={handleColorChange}
                options={colorsMenu}
              />
            </Box>
            <Box>
              <label>{t("Visitor")}</label>
              <CustomSelect
                placeholder="Select an option"
                onChange={handleVisitorChange}
                options={visitorsMenu}
              />
            </Box>
          </Box>
          <CustomTableBox
            tableData={tableData}
            action={searchVistorsCars}
            CustomPagenation={
              <CustomPagenation
                action={fetchVisitorsCarsDataByPage}
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
        <CustomLoader/>
      )
    
    
  );
};
export default VisitorsCars;