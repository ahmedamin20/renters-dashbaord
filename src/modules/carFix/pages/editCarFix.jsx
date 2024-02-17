import { useEffect } from "react";
import Header from "../../../components/Header.jsx";
import { useFormik } from "formik";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import { Box, Button, useTheme } from "@mui/material";
import CustomLable from "../../../components/CustomLable.jsx";
import { CustomFormikTextFeild } from "../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import { useTranslation } from "react-i18next";
import CustomSelectMenu from "../../../components/CustomSelect/CustomSelect.jsx";
import { tokens } from "../../../theme.js";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getMyProductMenu } from "../../../redux/select_menus.js";
import { editCarFix } from "../redux/carFix.js";
import { useNavigation, useParams } from "react-router-dom";
import { StatuseCode } from "../../../statuseCodes.js";
import CustomTextFeild from "../../../components/CustomTextFeild/CustomTextFeild.jsx";
import CustomDate from "../../../components/CustomDate/CustomDate.jsx";

const EditCarFix = () => {
  const { fix_id } = useParams();
  let [modelsRows, setModelRows] = useState([]);
  const { t } = useTranslation();
  const [discount, setdiscount] = useState(null);
  const [profit_amount, setprofit_amount] = useState(null);
  const dispatch = useDispatch();
  const { sidebarRTL } = useSidebarContext();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const ProductsMenu =
    useSelector((state) => state.selectMenu.myProduct.data) || [];
    const handleDateChange = (e) => {
      console.log(e);
      formik.setFieldValue("created_at", e?.format("YYYY-MM-DD"));
    };
  useEffect(() => {
    if (!ProductsMenu.length) {
      dispatch(getMyProductMenu());
    }
  });

  const formik = useFormik({
    initialValues: {
      product_id: selectedProduct,
      quantity: null,
      desc: "",
      created_at: "",
    },
    onSubmit: (values) => handleModelPush(values),
  });

  const handleModelPush = (values) => {
    console.log("Formik values", values);
    if (selectedProduct && values.quantity && values.desc) {
      const matchedModel = modelsRows.find(
        (model) =>
          model.product_id === selectedProduct &&
          model.quantity === values.quantity &&
          model.descreption === values.desc
      );

      if (!matchedModel) {
        const tmpRows = [...modelsRows];
        const newIndex = tmpRows[tmpRows.length - 1]
          ? tmpRows[tmpRows.length - 1]["id"] + 1
          : 0;

        tmpRows.push({
          product_id: newIndex,
          id: selectedProduct,
          quantity: values.quantity,
          product_name: ProductsMenu.find(
            (model) => model.id === selectedProduct
          )["name"],
        });

        setModelRows(tmpRows);
      }
    }
  };
  console.log("modelsRows", modelsRows);

  const handleDeletingModel = (oneRow) => {
    const tmpArray = modelsRows.filter(
      (model, index) => model.id !== oneRow.id
    );
    setModelRows(tmpArray);
  };
  const columns = [
    { field: "id", headerName: t("ID"), width: 150 },
    {
      field: "product_name",
      headerName: `${t("product_name")}`,
      width: 250,
      cellClassName: "name-column--cell",
    },
    {
      field: "quantity",
      headerName: `${t("quantity")}`,
      width: 250,
      cellClassName: "name-column--cell",
    },

    {
      field: "actions",
      headerName: `${t("Actions")}`,
      width: 300,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: sidebarRTL
              ? "row-reverse !important"
              : "row !important",
            alignItems: "center",
          }}
        >
          <Button
            sx={{
              background: `${colors.redAccent[500]}`,
              color: colors.grey[100],
            }}
            onClick={() => handleDeletingModel(params.row)}
            id={params.id}
          >
            {t("Remove")}
          </Button>
        </Box>
      ),
    },
  ];

  const textFields = [
    {
      name: "quantity",
      value: formik.values.quantity,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: t("quantity"),
      error: !!formik.touched.quantity && !!formik.errors.quantity,
      helperText: formik.touched.quantity && formik.errors.quantity,
      fullWidth: false,
    },
    {
      name: "desc",
      value: formik.values.desc,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: t("description"),
      fullWidth: false,
      error: !!formik.touched.desc && !!formik.errors.desc,
      helperText: formik.touched.desc && formik.errors.desc,
    },
  ];
  const handleSelectProduct = (item) => {
    setSelectedProduct(item?.id);
  };
  const navigate = useNavigation();
  const handleSubmit = () => {
    const data = {
      malfunction_description: formik.values.desc,
      materials: modelsRows,
      profit_amount: profit_amount,
      discount: discount,
    };
    dispatch(editCarFix({ values: data, id: fix_id })).then(
      (res) =>
        res.payload.code === StatuseCode.OK && navigate(-1, { repalce: true })
    );
  };

  return (
    <Box m="20px">
      <Header title={t("edit_carfix")} />
      <form onSubmit={formik.handleSubmit} dir={sidebarRTL ? "rtl" : "ltr"}>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "cener",
              flexDirection: "row",
            }}
          >
            {textFields.map((item, index) => (
              <Box key={index}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CustomLable title={item.placeholder} />
                  <CustomFormikTextFeild
                    placeholder={t(item.placeholder)}
                    onBlur={item.onBlur}
                    onChange={item.handleChange}
                    fullWidth={item.fullWidth}
                    isMulti={item.isMulti}
                    value={item.value}
                    name={item.name}
                    error={item.error}
                    rows={item.rows}
                    helperText={item.helperText}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        <CustomDate key={oneExpenses?.created_at} value={oneExpenses?.created_at} title={"date"} onChange={handleDateChange}/>

          <CustomSelectMenu
            options={ProductsMenu}
            lable={"select_product"}
            onChange={handleSelectProduct}
            fullWidth
            placeholder={t("Select Option")}
          />

          <Button
            fullWidth
            sx={{
              background: `${colors.blueAccent[700]}`,
              color: colors.grey[100],
              fontWeight: "bold",
              fontSize: "14px",
            }}
            onClick={formik.handleSubmit}
          >
            {t("add")}
          </Button>
        </Box>
        <br />
        <DataGrid
          sx={{
            fontWeight: "bold",
            fontSize: "14px",
          }}
          rows={modelsRows || []}
          autoHeight
          columns={columns}
          hideFooter={true}
          disableSelectionOnClick={true}
          componentsProps={{
            pagination: {
              labelRowsPerPage: t("rowsPerPageText"),
              dir: sidebarRTL ? "rtl" : "ltr",
            },
          }}
        />
        <br />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "75%",
            justifyContent: "space-between",
            margin: "1rem auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CustomLable title="discount" />
            <CustomTextFeild onChange={(e) => setdiscount(e.target.value)} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CustomLable title="profit_amount" />
            <CustomTextFeild
              onChange={(e) => setprofit_amount(e.target.value)}
            />
          </Box>
        </Box>
        <br />
        <Button
          fullWidth
          sx={{
            background: `${colors.blueAccent[700]}`,
            color: colors.grey[100],
            fontWeight: "bold",
            fontSize: "14px",
          }}
          onClick={handleSubmit}
        >
          {t("save")}
        </Button>
      </form>
    </Box>
  );
};

export default EditCarFix;
