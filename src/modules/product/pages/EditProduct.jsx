import { useEffect, useState } from "react";
import DefaultButton from "./../../../components/DefaultButton";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import Header from "../../../components/Header.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { tokens } from "../../../theme.js";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getOneProduct,
  getSelectCarModel,
  getSelectMenuBrands,
  UPDATE_PRODUCT,
} from "../redux/product.js";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import ImageUploading from "react-images-uploading";
import { DataGrid } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { getStudents } from "../../../redux/student.js";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { CustomFormikTextFeild } from "../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import CustomLable from "../../../components/CustomLable.jsx";
import { productSchema } from "../../../utils/ValidationSchema.js";
import BarCodeComponent from "../../../components/barCode.jsx";

const EditProduct = () => {
  const dispatch = useDispatch();
  const oneProductData =
    useSelector((state) => state.product.oneProduct.data) || [];
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCarModel, setSelectedCarModel] = useState(null);
  const [deletedImages, setDeletedImages] = useState([]);
  const { sidebarRTL } = useSidebarContext();
  const selectMenuBrands =
    useSelector((state) => state.product.selectBransMenu.data) || [];
  const [loading, setLoading] = useState(false);
  const selectCarModel =
    useSelector((state) => state.product.selectCarModel.data) || [];
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(getOneProduct(id));
    dispatch(getSelectMenuBrands());
  }, [id]);

  useEffect(() => {
    dispatch(getSelectCarModel(selectedBrand));
  }, [selectedBrand]);

  const formik = useFormik({
    initialValues: {
      name: oneProductData?.name,
      country_name: oneProductData?.country_name,
      installation_code: oneProductData?.installation_code,
      description: oneProductData?.description,
      storehouse_place: oneProductData?.storehouse_place,
      minimum_quantity: oneProductData?.minimum_quantity,
      quantity: oneProductData?.quantity,
      selling_price: oneProductData?.selling_price,
      purchase_price: oneProductData?.purchase_price,
      serial_number: oneProductData?.serial_number,
      bar_code: oneProductData?.bar_code,
    },
    enableReinitialize: true,
    validationSchema: productSchema,
    onSubmit: (values) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("country_name", values.country_name);
      formData.append("installation_code", values.installation_code);
      formData.append("description", values.description);
      formData.append("storehouse_place", values.storehouse_place);
      formData.append("minimum_quantity", values.minimum_quantity);
      formData.append("quantity", values.quantity);
      formData.append("selling_price", values.selling_price);
      formData.append("purchase_price", values.purchase_price);
      formData.append("serial_number", values.serial_number);
      formData.append("bar_code", values.bar_code);

      //TODO push car models
      modelsRows.map((carModel, index) => {
        formData.append(
          `car_models[${index}][car_model_id]`,
          carModel.car_model_id
        );
        formData.append(
          `car_models[${index}][model_year]`,
          carModel.model_year
        );
      });

      let tmpIndex = 0;
      for (let i = 0; i < images.length; i++) {
        if (images[i].file) {
          formData.append(`stored_images[${tmpIndex}]`, images[i].file);
          tmpIndex++;
        }
      }

      deletedImages.map((deletedImageID, index) =>
        formData.append(`deleted_images[${index}]`, deletedImageID)
      );
      const info = {
        id: id,
        data: formData,
      };
      setLoading(true);
      dispatch(UPDATE_PRODUCT(info))
        .then((res) => {
          setLoading(false);
          (res.payload.code === 200 && handleAfterEdit())})
        .catch(() => setLoading(false));

      // setLoading(false);
    },
  });
  const pageSize = 10;
  const handleAfterEdit = async () => {
    await formik.resetForm();
    await dispatch(getStudents({ pageSize }));
    await navigate("/Products", { replace: true });
  };

  const handleSelectBrand = (e) => {
    setSelectedBrand(e.target.value);
  };
  const handleSelectCarModel = (e) => {
    setSelectedCarModel(e.target.value);
  };

  const maxNumber = 3;

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const columns = [
    { field: "car_model_id", headerName: t("ID"), width: 150 },
    {
      field: "name",
      headerName: `${t("Name")}`,
      width: 250,
      cellClassName: "name-column--cell",
    },
    {
      field: "model_year",
      headerName: `${t("model_year")}`,
      width: 250,
      cellClassName: "name-column--cell",
    },
    {
      field: "actions",
      headerName: `${t("Actions")}`,
      width: 300,
      renderCell: (params) => (
        <ButtonGroup
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
        </ButtonGroup>
      ),
    },
  ];

  let [modelsRows, setModelRows] = useState([]);

  const [year, setYear] = useState(null);
  const [fullDate, setFullDate] = useState(null);
  const handleYearChange = (e) => {
    setYear(e.$y);
    setFullDate(e.$d);
  };

  const rows = oneProductData.car_models?.map(function (model, index) {
    return {
      car_model_id: model.car_model_id,
      id: index,
      model_year: model.model_year,
      name: model.name,
    };
  });

  useEffect(() => {
    setModelRows(rows);
    const allImages = oneProductData.images?.map(function (image) {
      return {
        data_url: image.url,
        id: image.id,
      };
    });
    setImages(allImages);
  }, [oneProductData]);

  const handleDeletingModel = (oneRow) => {
    const tmpArray = modelsRows.filter(
      (model, index) => model.id !== oneRow.id
    );
    setModelRows(tmpArray);
  };
  const handleModelPush = () => {
    if (selectedCarModel && year) {
      const matchedModel = modelsRows.find(
        (model) =>
          model.car_model_id === selectedCarModel && model.model_year == year
      );

      if (!matchedModel) {
        const tmpRows = [...modelsRows];

        const newIndex = tmpRows[tmpRows.length - 1]
          ? tmpRows[tmpRows.length - 1]["id"] + 1
          : 0;

        tmpRows.push({
          id: newIndex,
          car_model_id: selectedCarModel,
          model_year: year,
          name: selectCarModel.find((model) => model.id === selectedCarModel)[
            "name"
          ],
        });

        setModelRows(tmpRows);
      }
    }
  };

  const handleImageDeleting = function (index) {
    const tmpImages = [...images];

    const imageObject = tmpImages[index];

    if (imageObject.id) {
      const tmpDeletedImages = [...deletedImages];

      tmpDeletedImages.push(imageObject.id);

      setDeletedImages(tmpDeletedImages);
    }

    tmpImages.splice(index, 1);

    setImages(tmpImages);
  };
  const textFields = [
    {
      name: "name",
      col: "span 4",
      value: formik.values.name,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: t("name"),
      error: !!formik.touched.name && !!formik.errors.name,
      helperText: formik.touched.name && formik.errors.name,
    },
    {
      name: "country_name",
      value: formik.values.country_name,
      handleChange: formik.handleChange,
      col: "span 2",
      onBlur: formik.handleBlur,
      placeholder: t("country_name"),
      error: !!formik.touched.country_name && !!formik.errors.country_name,
      helperText: formik.touched.country_name && formik.errors.country_name,
    },
    {
      name: "installation_code",
      value: formik.values.installation_code,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      col: "span 2",
      placeholder: t("installation_code"),
      error:
        !!formik.touched.installation_code && !!formik.errors.installation_code,
      helperText:
        formik.touched.installation_code && formik.errors.installation_code,
    },
    {
      name: "description",
      value: formik.values.description,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      fullWidth: true,
      isMulti: true,
      col: "span 4",
      rows: 4,
      placeholder: t("description"),
      error: !!formik.touched.description && !!formik.errors.description,
      helperText: formik.touched.description && formik.errors.description,
    },
    {
      name: "storehouse_place",
      value: formik.values.storehouse_place,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      col: "span 2",
      placeholder: t("storehouse_place"),
      error:
        !!formik.touched.storehouse_place && !!formik.errors.storehouse_place,
      helperText:
        formik.touched.storehouse_place && formik.errors.storehouse_place,
    },
    {
      name: "quantity",
      value: formik.values.quantity,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      col: "span 2",
      placeholder: t("quantity"),
      error: !!formik.touched.quantity && !!formik.errors.quantity,
      helperText: formik.touched.quantity && formik.errors.quantity,
    },
    {
      name: "minimum_quantity",
      value: formik.values.minimum_quantity,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      col: "span 2",
      placeholder: t("minimum_quantity"),
      error:
        !!formik.touched.minimum_quantity && !!formik.errors.minimum_quantity,
      helperText:
        formik.touched.minimum_quantity && formik.errors.minimum_quantity,
    },
    {
      name: "selling_price",
      value: formik.values.selling_price,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      col: "span 2",
      placeholder: t("selling_price"),
      error: !!formik.touched.selling_price && !!formik.errors.selling_price,
      helperText: formik.touched.selling_price && formik.errors.selling_price,
    },
    {
      name: "purchase_price",
      value: formik.values.purchase_price,
      handleChange: formik.handleChange,
      col: "span 2",
      onBlur: formik.handleBlur,
      placeholder: t("purchase_price"),
      error: !!formik.touched.purchase_price && !!formik.errors.purchase_price,
      helperText: formik.touched.purchase_price && formik.errors.purchase_price,
    },
    {
      name: "serial_number",
      value: formik.values.serial_number,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      col: "span 2",
      placeholder: t("serial_number"),
      error: !!formik.touched.serial_number && !!formik.errors.serial_number,
      helperText: formik.touched.serial_number && formik.errors.serial_number,
    },
    {
      name: "bar_code",
      value: formik.values.bar_code,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      col: "span 2",
      placeholder: t("bar_code"),
      error: !!formik.touched.bar_code && !!formik.errors.bar_code,
      helperText: formik.touched.bar_code && formik.errors.bar_code,
    },
  ];

  return (
    <Box m="20px">
      <Header title={t("edit_product")} />
      <form onSubmit={formik.handleSubmit} dir={sidebarRTL ? "rtl" : "ltr"}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {textFields.map((item, index) => (
            <FormControl key={index} sx={{ gridColumn: item.col }}>
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
            </FormControl>
          ))}
          <FormControl sx={{ gridColumn: "span 2", marginTop: "3rem" }}>
            <BarCodeComponent value={formik.values.bar_code || "0"} />
          </FormControl>
          <FormControl
            fullWidth
            variant="outlined"
            type="text"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.address2}
            error={formik.touched.address2 && Boolean(formik.errors.address2)}
            helperText={formik.touched.address2 && formik.errors.address2}
            sx={{ gridColumn: "span 4" }}
            inputProps={{
              style: { fontSize: "18px", fontWeight: "bold" },
            }}
          >
            <label style={{ fontSize: "18px", fontWeight: "Bold" }}>
              {t("Select_Brand")}
            </label>
            <Select
              value={selectedBrand}
              onChange={handleSelectBrand}
              fullWidth
              placeholder={t("Select Option")}
            >
              {selectMenuBrands.length > 0 &&
                selectMenuBrands.map((item) => (
                  <MenuItem
                    key={item.id}
                    value={item.id}
                    dir={sidebarRTL ? "rtl" : "ltr"}
                  >
                    {t(item.name)}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            variant="outlined"
            type="text"
            placeholder="Address 2"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.address2}
            name="address2"
            error={formik.touched.address2 && Boolean(formik.errors.address2)}
            helperText={formik.touched.address2 && formik.errors.address2}
            sx={{ gridColumn: "span 4" }}
            inputProps={{
              style: { fontSize: "18px", fontWeight: "bold" },
            }}
          >
            <label style={{ fontSize: "18px", fontWeight: "Bold" }}>
              {t("Select_car")}
            </label>
            <Select
              value={selectedCarModel}
              onChange={handleSelectCarModel}
              fullWidth
              placeholder={t("Select Option")}
              disabled={!selectedBrand}
            >
              {selectCarModel.length > 0 &&
                selectCarModel.map((item) => (
                  <MenuItem
                    key={item.id}
                    value={item.id}
                    dir={sidebarRTL ? "rtl" : "ltr"}
                  >
                    {t(item.name)}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <label style={{ fontSize: "18px", fontWeight: "Bold" }}>
            {t("model_year")}
          </label>
          <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth={true}>
            <DatePicker
              views={["year"]}
              dir={sidebarRTL ? "rtl" : "ltr"}
              sx={{
                direction: sidebarRTL ? "rtl" : "ltr",
                gridColumn: "span 4",
              }}
              placeholder={t("Year Picker")}
              format="YYYY"
              value={dayjs(fullDate)}
              onChange={handleYearChange}
              name="model_year"
              renderInput={(props) => (
                <TextField {...props} variant="outlined" fullWidth />
              )}
            />
          </LocalizationProvider>

          <Button
            sx={{
              background: `${colors.blueAccent[700]}`,
              color: colors.grey[100],
            }}
            onClick={handleModelPush}
          >
            {t("Add")}
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
        <br />

        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
        >
          {({ imageList, onImageUpload, isDragging, dragProps }) => (
            // write your building UI
            <div className="upload__image-wrapper">
              <button
                type="button"
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                Click or Drop here
              </button>
              <div
                style={{
                  display: "flex",
                  gridColumn: "span 4",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                {imageList.map((image, index) => (
                  <div
                    key={index}
                    style={{ width: "18%", gridColumn: "span 2" }}
                    className="image-item"
                  >
                    <img
                      style={{ width: "100%" }}
                      src={image["data_url"]}
                      alt=""
                      width="100"
                    />
                    <div className="image-item__btn-wrapper">
                      <Box display="flex" justifyContent="center" mt="20px">
                        <Button
                          sx={{
                            backgroundColor: colors.blueAccent[700],
                            margin: "0 auto",
                            color: colors.grey[100],
                            paddin: "2rem",
                            fontWeight: "bold",
                            fontSize: "18px",
                          }}
                          onClick={() => handleImageDeleting(index)}
                          type="button"
                          variant="outlined"
                        >
                          <DeleteForeverIcon />
                        </Button>
                      </Box>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </ImageUploading>
        <Box display="flex" justifyContent="center" mt="20px">
          <DefaultButton
            type="submit"
            disabled={loading}
            fullWidth={true}
            text={loading ? t("Loading") : t("Edit")}
          />
          {/* <Button
          fullWidth={true}
            sx={{
              backgroundColor: colors.blueAccent[700],
              margin: ".5rem auto",
              color: colors.grey[100],
              paddin: "2rem",
              fontWeight: "bold",
              fontSize: "18px",
            }}
            type="submit"
            variant="outlined"
          >
            
          </Button> */}
        </Box>
      </form>
    </Box>
  );
};

export default EditProduct;
