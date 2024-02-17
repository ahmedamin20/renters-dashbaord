import { Box, Button } from "@mui/material";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getStoreHousesMenu,
  getStoreHousesProductMenu,
} from "../../../redux/select_menus.js";
import CustomSelect from "../../../components/CustomSelect/CustomSelect.jsx";
import InputNumber from "../../../components/CustomNumberInput/CustomNubmerInput.jsx";
import CustomLable from "../../../components/CustomLable.jsx";
import { useState } from "react";
import { move_products } from "../../product/redux/product.js";
import useMainHooks from "../../../hooks/useMainHooks.jsx";

const MoveProducts = () => {
  const storeHouseProductMenu =
    useSelector((state) => state.selectMenu.storeHouseProductsMenu?.data) || [];
  const sotreHouseMenu =
    useSelector((state) => state.selectMenu.storeHouseMenu.data) || [];
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productCount, setProductCount] = useState(null);
  const { t, dispatch, colors, sidebarRTL } = useMainHooks();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dispatch(getStoreHousesMenu());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getStoreHousesProductMenu(selectedStore));
  }, [dispatch, selectedStore]);

  const formik = useFormik({
    initialValues: {
      quantity: null,
      from_storehouse: "",
      to_storehouse: "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      setLoading(true);
      console.log("loadingloadingloadi   ngloadingloading", loading);

      handleFormSubmit(values);
    },
  });

  const handleFormSubmit = async (values) => {
    const info = {
      id: selectedProduct,

      from_storehouse: values.from_storehouse,
      to_storehouse: values.to_storehouse,
      quantity: productCount,
    };
    setLoading(true);
    console.log("loadingloadingloadi   ngloadingloading", loading);
    await dispatch(move_products(info))
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleSelectSotreChange = (item) => {
    formik.setFieldValue("from_storehouse", item?.id);
    setSelectedStore(item?.id);
  };
  const handleToStoreChange = (item) => {
    formik.setFieldValue("to_storehouse", item?.id);
  };

  const handleSelectProduct = (item) => {
    setSelectedProduct(item.id);
  };
  const handleNumber = (val) => {
    setProductCount(val);
  };
  return (
    <Box m="20px">
      <form onSubmit={formik.handleSubmit} dir={sidebarRTL ? "ltr" : "rtl"}>
        <Box>
          <CustomLable title={t("from_storeHouse")} />
          <CustomSelect
            placeholder="Select an option"
            onChange={handleSelectSotreChange}
            options={sotreHouseMenu}
            // isDisabled={!sotreHouseMenu.length?true:false}
          />
        </Box>
        <Box>
          <CustomLable title={t("product")} />
          <CustomSelect
            placeholder="Select an option"
            onChange={handleSelectProduct}
            options={storeHouseProductMenu}
          />
        </Box>
        <Box>
          <CustomLable title={t("to_storeHouse")} />
          <CustomSelect
            placeholder="Select an option"
            onChange={handleToStoreChange}
            selected={{ id: selectedStore, disable: true }}
            options={sotreHouseMenu}
          />
        </Box>
        <Box
          dir={sidebarRTL ? "rtl" : "ltr"}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomLable title={t("quantity")} />
          <InputNumber onChange={handleNumber} />
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            type="submit"
            fullWidth
            disabled={loading}
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            variant="outlined"
          >
            {loading ? t("loading") : t("save")}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default MoveProducts;
