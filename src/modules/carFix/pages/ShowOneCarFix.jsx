import { Box, Button, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOneCarFix } from "../redux/carFix.js";
import CustomLoader from "../../../components/CustomLoader/CustomLoader.jsx";
import CustomLable from "../../../components/CustomLable.jsx";
import SmallBox from "./smallBox.jsx";
import "./showOneStyle.css";
import ScrollDialog from "../../../components/info_component/info.jsx";
import CustomTableBox from "../../../components/customTableBox/CustomTableBox.jsx";
import CustomToolTip from "../../../components/CustomToolTip/customToolTip.jsx";
import { tokens } from "../../../theme.js";
import Header from "../../../components/Header.jsx";
const ShowCarFix = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { garage_id, fix_id } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { sidebarRTL } = useSidebarContext();
  const loading = useSelector((state) => state.CarFix.loading);
  const data = useSelector((state) => state.CarFix.oneFixData.data) || [];
  const productData = data?.products;
  console.log(data);
  useEffect(() => {
    if (garage_id && fix_id) {
      dispatch(getOneCarFix({ garage_id: garage_id, fix_id: fix_id }));
    }
  }, [dispatch, garage_id, fix_id]);
  const totalSellingPrice =
    productData?.reduce((total, item) => total + item.selling_price, 0) || "";

  const handleLastVisit = () => {
    dispatch(
      getOneCarFix({
        garage_id: data?.visit.garage_id,
        fix_id: data?.latest_visit_id,
      })
    );
  };

  const columns = [
    {
      field: "id",
      headerName: t("id"),
      width: 150,
    },
    {
      field: "name",
      headerName: t("name"),
      width: 300,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.name} />,
    },
    {
      field: "serial_number",
      headerName: t("serial_number"),
      cellClassName: "name-column--cell",
      width: 200,
      renderCell: (params) => <CustomToolTip text={params.row.serial_number} />,
    },
    {
      field: "quantity",
      headerName: t("quantity"),
      width: 100,
      renderCell: (params) => <CustomToolTip text={params.row.quantity} />,
    },
    {
      field: "storehouse_place",
      headerName: t("storehouse_place"),
      width: 200,
      renderCell: (params) => (
        <CustomToolTip text={params.row.storehouse_place} />
      ),
    },
    {
      field: "selling_price",
      headerName: t("selling_price"),
      width: 150,
      renderCell: (params) => <CustomToolTip text={params.row.selling_price} />,
    },
  ];
  const tableData = {
    rows: productData || [],
    columns: columns,
    loading: loading,
  };
  return !loading ? (
    <Box dir={sidebarRTL ? "rtl" : "ltr"} m="20px">
      <Header title={`${t("fix")}` + " : " + fix_id + " " + `${t("show")}`} />
      <br />
      <Box
        dir={sidebarRTL ? "rtl" : "ltr"}
        m="20px"
        display="flex"
        justifyContent="space-evenly"
        flexWrap="wrap"
      >
        <Box className="dataCard">
          <h3>{t("owner_data")}</h3>
          <SmallBox title={"name"} data={data?.visitor_car?.visitor?.name} />
          <SmallBox
            title={"car_license"}
            data={data?.visitor_car?.car_license}
          />
          <SmallBox title={"visit_date"} data={data?.visit?.created_at} />
        </Box>
        <Box className="dataCard">
          <h3>{t("car_data")}</h3>
          <SmallBox title={"brand"} data={data?.visitor_car?.brand?.name} />
          <SmallBox title={"model"} data={data?.visitor_car?.model_year} />
          <SmallBox
            background={data?.visitor_car?.color?.code}
            title={"color"}
            data={data?.visitor_car?.color?.code}
          />
        </Box>
      </Box>
      <Box className="dataCard" sx={{ width: "100%" }}>
        <h3>{t("Details")}</h3>
        {data?.malfunction_description !== null ? (
          <span style={{ display: "flex", margin: "1rem auto" }}>
            <CustomLable title="description" />
            <ScrollDialog message={data?.malfunction_description} />
          </span>
        ) : null}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          {data.length &&
            data?.images.map((item) => (
              <Box
                key={item.id}
                sx={{
                  width: "50%",
                  display: "flex",
                  justifyContent: "center",
                  margin: "1rem auto",
                }}
              >
                <img
                  loading="lazy"
                  style={{
                    margin: ".5rem auto",
                    width: "400px",
                    height: "400px",
                  }}
                  src={item.url}
                  alt="img"
                />
              </Box>
            ))}
        </Box>
        {data?.malfunction_description !== null ? (
          <span style={{ display: "flex", margin: "1rem auto" }}>
            <CustomLable title="description" />
            <ScrollDialog message={data?.malfunction_description} />
          </span>
        ) : null}
        {data?.video ? <video width="100%" controls src={data?.video} /> : null}
        <CustomTableBox tableData={tableData} />
        <CustomLable
          margin="1rem"
          title="total_fix_amount"
          body={`${totalSellingPrice} FAFC`}
        />
        <CustomLable
          margin="1rem"
          title="checking_amount"
          body={`${data?.checking_amount} FAFC`}
        />
        <CustomLable
          margin="1rem"
          title="profit_amount"
          body={`${data?.profit_amount} FAFC`}
        />
        <CustomLable
          margin="1rem"
          title="paid_amount"
          body={`${data?.paid_amount} FAFC`}
        />
      </Box>
      {data?.latest_visit_id ? (
        <Button
          fullWidth
          onClick={handleLastVisit}
          sx={{
            background: colors.greenAccent[500],
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          {t("go to last visit")}
        </Button>
      ) : null}
    </Box>
  ) : (
    <CustomLoader />
  );
};
export default ShowCarFix;
