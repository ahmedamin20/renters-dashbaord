import {
    Button,
    FormControl,
    MenuItem,
    Select,
    TextareaAutosize,
  } from "@mui/material";
  import React, { useCallback, useEffect, useRef, useState } from "react";
  import { useTranslation } from "react-i18next";
  import { Tab, Tabs, IconButton } from "@mui/material";
  import "./ProductEdit.css";
  import SelectBox from "../SelectBox/SelectBox";
  import img from "../../assets/Img/default.jpg";
  import ImageUploading from "react-images-uploading";
  import { DeleteForever } from "@mui/icons-material";
  import { useDispatch, useSelector } from "react-redux";
  import { SelectAllCategoriesThunk } from "../../RTK/Thunk/SelectAllCategoriesThunk";
  import { SelectBrandThunk } from "../../RTK/Thunk/SelectBrandThunk";
  import { SelectUnitThunk } from "../../RTK/Thunk/SelectUnitThunk";
  import { SelectAttributesThunk } from "../../RTK/Thunk/SelectAttributesThunk";
  import { useNavigate, useParams } from "react-router-dom";
  import { OneProductThunk } from "../../RTK/Thunk/OneProductThunk";
  import { UploadImgThunk } from "../../RTK/Thunk/uploadImgThunk";
  import {
    DataView,
    closeError,
    closeSelect,
  } from "../../RTK/Reducers/ProductReducer";
  import { UpdateProductThunk } from "../../RTK/Thunk/UpdateProductThunk";
  import { openMessageAlert } from "../../RTK/Reducers/MessageReducer";
  import { SelectSubCategoriesThunk } from "../../RTK/Thunk/SelectSubCategoriesThunk";
  import { SelectSubSubCategoriesThunk } from "../../RTK/Thunk/SelectSubSubCategoriesThunk";
  import SelectCategoriesBox from "../SelectCategoriesBox/SelectCategoriesBox";
  import TextFieldComponent from "../TextField/TextField";
  import SubmitButton from "../Button/SubmitButton";
  import AddButton from "../Button/AddButton";
  // import { SelectSubCategoriesThunk } from "../../RTK/Thunk/SelectSubCategoriesThunk";
  let selectData = ["name", "email", "pass"];
  const ProductEdit = () => {
    let { t, i18n } = useTranslation();
    let dispatch = useDispatch();
    let param = useParams();
  
    let navigate = useNavigate();
    const [value, setValue] = React.useState(0);
    const [images, setImages] = React.useState([]);
  
    const [imgeDataTarget, setImgeDataTarget] = useState([]);
    const [imgeTargetAction, setImgeTargetAction] = useState({
      index: "",
      type: "",
    });
    const [selectTarget, setSelectTarget] = React.useState({
      Brand: "",
      Attributes: "",
      Categories: "",
      Sub_Categories: "",
      Sub_Sub_Categories: "",
      Unit: "",
    });
    const [inputValue, setInputValue] = useState({
      category_Name_en: "",
      category_Name_ar: "",
      category_Name_fr: "",
      desc_en: "",
      desc_ar: "",
      desc_fr: "",
      price: "",
      total: "",
      minimum: "",
      selling_price: ""
    });
    const [targetIdSelect, setTargetIdSelect] = React.useState({
      categories: "",
      brand: "",
      attribute: "",
      unit: "",
    });
    const [selectIndex, setSelectIndex] = React.useState({
      categories: "",
      Sub_Categories: "",
      Sub_Sub_Categories: "",
      brand: "",
      attribute: "",
      unit: "",
    });
    const [selectCategoriesTarget, setSelectCategoriesTarget] =
      React.useState("");
    let {
      unitSelectData,
      attributesSelectData,
      brandSelectData,
      categoriesSelectData,
      sub_categoriesSelectData,
      sub_subcategoriesSelectData,
      oneImgData,
      oneDataProduct,
      price_Error,
      quantity_Error,
      category_id_Error,
      brand_id_Error,
      minimum_Error,
      unit_id_Error,
      att_id_Error,
      images_Error,
      name_Error_en,
      name_Error_ar,
      name_Error_fr,
      desc_Error_en,
      desc_Error_ar,
      desc_Error_fr,
    } = useSelector((state) => state.ProductReducer);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    useEffect(() => {
      if (i18n.language === "en") {
        setValue(0);
      }
      if (i18n.language === "ar") {
        setValue(1);
      }
      if (i18n.language === "fr") {
        setValue(2);
      }
    }, [i18n.language]);
    // =====data===========
    const dataRef = useRef(true);
    useEffect(() => {
      if (dataRef.current) {
        dispatch(SelectAllCategoriesThunk());
        dispatch(SelectBrandThunk());
        dispatch(SelectUnitThunk());
        dispatch(SelectAttributesThunk());
        dataRef.current = false;
      }
    }, [dispatch]);
    useEffect(() => {
      if (targetIdSelect.categories == "" && categoriesSelectData.length) {
        setTargetIdSelect({
          ...targetIdSelect,
          categories: categoriesSelectData[0]?.id,
        });
        dispatch(SelectSubCategoriesThunk({ id: categoriesSelectData[0]?.id }));
        setSelectCategoriesTarget(categoriesSelectData[0]?.id);
      }
    }, [categoriesSelectData, targetIdSelect, dispatch]);
  
    //  delete categories id
    useEffect(() => {
      if (
        categoriesSelectData.length < 1 &&
        (targetIdSelect.sub_sub_categories !== "" ||
          targetIdSelect.sub_categories !== "" ||
          targetIdSelect.categories !== "")
      ) {
        setTargetIdSelect({
          ...targetIdSelect,
          categories: "",
          sub_categories: "",
          sub_sub_categories: "",
        });
      }
      if (
        sub_categoriesSelectData.length < 1 &&
        (targetIdSelect.sub_sub_categories !== "" ||
          targetIdSelect.sub_categories !== "")
      ) {
        setTargetIdSelect({
          ...targetIdSelect,
          sub_categories: "",
          sub_sub_categories: "",
        });
      }
      if (
        sub_subcategoriesSelectData.length < 1 &&
        targetIdSelect.sub_sub_categories !== ""
      ) {
        setTargetIdSelect({
          ...targetIdSelect,
          sub_sub_categories: "",
        });
      }
    }, [
      sub_subcategoriesSelectData.length,
      sub_categoriesSelectData.length,
      categoriesSelectData.length,
      targetIdSelect,
    ]);
    const OneRef = useRef(true);
    useEffect(() => {
      if (oneDataProduct == "" && OneRef.current) {
        dispatch(OneProductThunk({ id: param.productEdit }));
        OneRef.current = false;
      }
    }, [dispatch, param.productEdit, oneDataProduct]);
    // handle select on loading
  
    useEffect(() => {
      if (targetIdSelect.brand == "" && brandSelectData.length) {
        if (oneDataProduct?.brand_id) {
          let data = brandSelectData.findIndex(
            (el) => el.id == oneDataProduct?.brand_id
          );
          setSelectIndex({ ...selectIndex, brand: data });
          setTargetIdSelect({
            ...targetIdSelect,
            brand: brandSelectData[data]?.id,
          });
        }
      }
    }, [brandSelectData, targetIdSelect, oneDataProduct?.brand_id, selectIndex]);
    useEffect(() => {
      if (targetIdSelect.attribute == "" && attributesSelectData.length) {
        if (oneDataProduct?.attribute_id) {
          let data = attributesSelectData.findIndex(
            (el) => el.id == oneDataProduct?.attribute_id
          );
          setSelectIndex({ ...selectIndex, attribute: data });
          setTargetIdSelect({
            ...targetIdSelect,
            attribute: attributesSelectData[data]?.id,
          });
        }
      }
    }, [
      attributesSelectData,
      targetIdSelect,
      oneDataProduct?.attribute_id,
      selectIndex,
    ]);
    useEffect(() => {
      if (targetIdSelect.unit == "" && unitSelectData.length) {
        if (oneDataProduct?.unit_id) {
          let data = unitSelectData.findIndex(
            (el) => el.id == oneDataProduct?.unit_id
          );
          setSelectIndex({ ...selectIndex, unit: data });
          setTargetIdSelect({
            ...targetIdSelect,
            unit: unitSelectData[data]?.id,
          });
        }
      }
    }, [unitSelectData, targetIdSelect, oneDataProduct?.unit_id, selectIndex]);
    // OneProductThunk
    // handle input on loading
    useEffect(() => {
      if (oneDataProduct !== null) {
        setInputValue({
          category_Name_en: oneDataProduct.name?.en,
          category_Name_ar: oneDataProduct.name?.ar,
          category_Name_fr: oneDataProduct.name?.fr,
          desc_en: oneDataProduct.description?.en,
          desc_ar: oneDataProduct.description?.ar,
          desc_fr: oneDataProduct.description?.fr,
          price: oneDataProduct?.unit_price,
          total: oneDataProduct?.quantity,
          selling_price: oneDataProduct?.selling_price,
        });
      }
    }, [oneDataProduct]);
  
    /// handle img all
    const onChange = (imageList, addUpdateIndex) => {
      if (imgeTargetAction.type == "upload") {
        dispatch(UploadImgThunk({ img: imageList[addUpdateIndex]?.file }))
          .unwrap()
          .then((res) => {
            // //  console.log(res.data[0]);
            let getRes = [...imgeDataTarget];
            getRes.push(res.data[0]);
            // //  console.log(getRes)
            setImgeDataTarget(getRes);
            setImgeTargetAction({
              index: "",
              type: "",
            });
          })
          .catch((error) => {
            // //  console.log(error);
            // handle error here
          });
      }
      if (imgeTargetAction.type == "update") {
        dispatch(UploadImgThunk({ img: imageList[addUpdateIndex]?.file }))
          .unwrap()
          .then((res) => {
            let getRes = [...imgeDataTarget];
            // getRes.splice(imgeTargetAction.index, 1, res.data[0]);
            getRes[imgeTargetAction.index] = res.data[0];
            setImgeDataTarget(getRes);
            // //  console.log(getRes)
            setImgeTargetAction({
              index: "",
              type: "",
            });
          })
          .catch((error) => {
            // handle error here
          });
      }
      setImages(imageList);
    };
    const RefImg = useRef(true);
    useEffect(() => {
      if (oneImgData.length && images.length < 1 && RefImg.current) {
        let dataGet = [...oneImgData];
        let data = [];
        for (let index = 0; index < oneImgData.length; index++) {
          data.push("");
        }
        setImgeDataTarget(data);
  
        let dataString = ImageToString(oneImgData);
  
        dataGet = dataGet.map((el, index) => {
          return {
            data_url: el,
            key: dataString[index],
          };
        });
        setImages(dataGet);
        RefImg.current = false;
      }
    }, [oneImgData, images]);
    let ImageToString = (imagesFromApi) => {
      let index;
      let keptImages = [];
      for (index in imagesFromApi) {
        /*
              Split The Url Of Image Ang Get Only Image Name
  
              example: if Url Of Image is => http://api.abdjan/storage/default/default.png
  
              if will get only => default.png
          */
  
        let splitedImage = imagesFromApi[index].split("/");
  
        keptImages.push(splitedImage[splitedImage.length - 1] || null);
      }
      return keptImages;
    };
  
    useEffect(() => {
      if (imgeTargetAction.type == "remove") {
        let getRes = [...imgeDataTarget];
        getRes.splice(imgeTargetAction.index, 1);
  
        setImgeDataTarget(getRes);
        setImgeTargetAction({
          index: "",
          type: "",
        });
      }
    }, [imgeTargetAction, imgeDataTarget]);
  
    useEffect(() => {
      return () => {
        dispatch(closeError());
        dispatch(DataView());
        dispatch(closeSelect());
      };
    }, []);
  
    useEffect(() => {
      dispatch(closeError());
    }, [dispatch, inputValue]);
  
    let handleSubmit = (e) => {
      e.preventDefault();
      let handleKeepImg = () => {
        let data = [...images];
        data = data.map((el) => {
          if (el?.key) {
            return el;
          }
        });
        data = data.filter((el) => el?.key);
        data = data.map((el) => {
          return el.key;
        });
        return data;
      };
      let handleImg = () => {
        let data = [...imgeDataTarget];
  
        data = data.filter((el) => el !== "");
  
        return data;
      };
  
      let data = {
        id: param.productEdit,
        name: {
          en: inputValue.category_Name_en,
          ar: inputValue.category_Name_ar,
          fr: inputValue.category_Name_fr,
        },
        description: {
          en: inputValue.desc_en,
          ar: inputValue.desc_ar,
          fr: inputValue.desc_fr,
        },
        unit_price: inputValue.price,
        quantity: inputValue.total,
        category_id: selectCategoriesTarget,
        attribute_id: targetIdSelect.attribute,
        minimum_quantity: inputValue.minimum,
        selling_price: inputValue.selling_price,
        unit_id: targetIdSelect.unit,
        brand_id: targetIdSelect.brand,
        images: handleImg(),
        keep_images: handleKeepImg(),
      };
      // //  console.log(data)
  
      dispatch(UpdateProductThunk(data))
        .unwrap()
        .then((data) => {
          // //  console.log(data);
          dispatch(openMessageAlert());
  
          navigate("/admin/product");
        })
        .catch((error) => {
          // //  console.log(error);
          //    setCode(error.code);
        });
    };
    // //  console.log(imgeDataTarget)
    // //  console.log(images)
  
    console.log(categoriesSelectData);
  
    return (
      <>
        <>
          <div className="p-[20px] mt-[40px]">
            <form
              action=""
              className="add-box flex  items-start justify-start flex-col px-5 py-[60px]  mb-[40px] add-shadow  "
              onSubmit={handleSubmit}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                centered
                sx={{ mb: "20px" }}
                className="justify-start"
              >
                <Tab
                  label={t("Language.English")}
                  className="!p-2 text-black dark:text-white"
                />
                <Tab
                  label={t("Language.Arabic")}
                  className="!p-2 text-black dark:text-white"
                />
                <Tab
                  label={t("Language.French")}
                  className="!p-2 text-black dark:text-white"
                />
              </Tabs>
              <hr className=" w-full my-[40px]" />
              <div className="flex justify-center flex-col lg:flex-row lg:items-start items-center w-full   gap-[30px] h-full">
                <>
                  <div
                    className=" w-full "
                    style={{
                      display: value === 0 ? "block" : "none",
                    }}
                  >
                    <TextFieldComponent
                      sx={{ width: "100%" }}
                      className="w-full !bg-secondaryBg outline-none p-8 dark:!bg-transparent dark:border-white dark:!rounded-md dark:!border dark:!border-solid dark:!border-white"
                      id="name"
                      type="text"
                      name="Name"
                      label={t("pages.ProductNew.Sub_category_Name")}
                      value={inputValue.category_Name_en}
                      handleChange={(e) => {
                        setInputValue({
                          ...inputValue,
                          category_Name_en: e.target.value,
                        });
                      }}
                    />
                    {name_Error_en !== null && (
                      <span
                        style={{
                          width: "100%",
                          color: "red",
                          fontSize: "15px",
                          marginBottom: "15px",
                          marginTop: "15px",
                          display: "block",
                        }}
                      >
                        {name_Error_en}
                      </span>
                    )}{" "}
                  </div>
                  <div
                    className=" w-full "
                    style={{
                      display: value === 1 ? "block" : "none",
                    }}
                  >
                    <TextFieldComponent
                      sx={{ width: "100%" }}
                      className="w-full !bg-secondaryBg outline-none p-8 dark:!bg-transparent dark:border-white dark:!rounded-md dark:!border dark:!border-solid dark:!border-white"
                      id="name"
                      type="text"
                      name="Name"
                      label={t("pages.ProductNew.Sub_category_Name")}
                      value={inputValue.category_Name_ar}
                      handleChange={(e) => {
                        setInputValue({
                          ...inputValue,
                          category_Name_ar: e.target.value,
                        });
                      }}
                    />
                    {name_Error_ar !== null && (
                      <span
                        style={{
                          width: "100%",
                          color: "red",
                          fontSize: "15px",
                          marginBottom: "15px",
                          marginTop: "15px",
                          display: "block",
                        }}
                      >
                        {name_Error_ar}
                      </span>
                    )}{" "}
                  </div>
                  <div
                    className=" w-full "
                    style={{
                      display: value === 2 ? "block" : "none",
                    }}
                  >
                    <TextFieldComponent
                      sx={{ width: "100%" }}
                      className="w-full !bg-secondaryBg outline-none p-8 dark:!bg-transparent dark:border-white dark:!rounded-md dark:!border dark:!border-solid dark:!border-white"
                      id="name"
                      type="text"
                      name="Name"
                      label={t("pages.ProductNew.Sub_category_Name")}
                      value={inputValue.category_Name_fr}
                      handleChange={(e) => {
                        setInputValue({
                          ...inputValue,
                          category_Name_fr: e.target.value,
                        });
                      }}
                    />
                    {name_Error_fr !== null && (
                      <span
                        style={{
                          width: "100%",
                          color: "red",
                          fontSize: "15px",
                          marginBottom: "15px",
                          marginTop: "15px",
                          display: "block",
                        }}
                      >
                        {name_Error_fr}
                      </span>
                    )}{" "}
                  </div>
                </>
                <div
                  className=" w-full "
                  style={{
                    display: value === 0 ? "block" : "none",
                  }}
                >
                  <TextareaAutosize
                   className="dark:!bg-transparent dark:!text-white min-h-[150px] w-80 text-sm font-normal font-sans leading-5 p-3 rounded-xl rounded-br-none shadow-md shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-blue dark:focus:shadow-outline-blue focus:shadow-lg border border-solid border-slate-300 hover:border-blue-500 dark:hover:border-blue-500 focus:border-blue-500 dark:focus:border-blue-500 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0"
                    aria-label="Demo input"
                    placeholder={t("pages.ProductNew.Description")}
                    onChange={(e) => {
                      setInputValue({
                        ...inputValue,
                        desc_en: e.target.value,
                      });
                    }}
                    value={inputValue.desc_en}
                  />
                  {desc_Error_en !== null && (
                    <span
                      style={{
                        width: "100%",
                        color: "red",
                        fontSize: "15px",
                        marginBottom: "15px",
                        marginTop: "15px",
                        display: "block",
                      }}
                    >
                      {desc_Error_en}
                    </span>
                  )}{" "}
                </div>
                <div
                  className=" w-full "
                  style={{
                    display: value === 1 ? "block" : "none",
                  }}
                >
                  <TextareaAutosize
                   className="dark:!bg-transparent dark:!text-white min-h-[150px] w-80 text-sm font-normal font-sans leading-5 p-3 rounded-xl rounded-br-none shadow-md shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-blue dark:focus:shadow-outline-blue focus:shadow-lg border border-solid border-slate-300 hover:border-blue-500 dark:hover:border-blue-500 focus:border-blue-500 dark:focus:border-blue-500 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0"
                    aria-label="Demo input"
                    placeholder={t("pages.ProductNew.Description")}
                    onChange={(e) => {
                      setInputValue({
                        ...inputValue,
                        desc_ar: e.target.value,
                      });
                    }}
                    value={inputValue.desc_ar}
                  />
                  {desc_Error_ar !== null && (
                    <span
                      style={{
                        width: "100%",
                        color: "red",
                        fontSize: "15px",
                        marginBottom: "15px",
                        marginTop: "15px",
                        display: "block",
                      }}
                    >
                      {desc_Error_ar}
                    </span>
                  )}{" "}
                </div>
                <div
                  className=" w-full "
                  style={{
                    display: value === 2 ? "block" : "none",
                  }}
                >
                  <TextareaAutosize
                    className="dark:!bg-transparent dark:!text-white min-h-[150px] w-80 text-sm font-normal font-sans leading-5 p-3 rounded-xl rounded-br-none shadow-md shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-blue dark:focus:shadow-outline-blue focus:shadow-lg border border-solid border-slate-300 hover:border-blue-500 dark:hover:border-blue-500 focus:border-blue-500 dark:focus:border-blue-500 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0"
                    aria-label="Demo input"
                    placeholder={t("pages.ProductNew.Description")}
                    onChange={(e) => {
                      setInputValue({
                        ...inputValue,
                        desc_fr: e.target.value,
                      });
                    }}
                    value={inputValue.desc_fr}
                  />
                  {desc_Error_fr !== null && (
                    <span
                      style={{
                        width: "100%",
                        color: "red",
                        fontSize: "15px",
                        marginBottom: "15px",
                        marginTop: "15px",
                        display: "block",
                      }}
                    >
                      {desc_Error_fr}
                    </span>
                  )}{" "}
                </div>
              </div>
  
              <hr className=" w-full my-[40px]" />
              <div className=" flex flex-wrap  w-full gap-[30px] justify-start items-center">
              <FormControl
                                  className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[340px]"
                                  onClick={(e) => {
                                      // //  console.log(e.target.textContent)
                                      if (
                                          e.target.tagName == "LI" &&
                                          categoriesSelectData.length
                                      ) {
                                          // //  console.log(e.target.textContent);
                                          setSelectTarget({
                                              ...selectTarget,
                                              Main_Category: e.target.textContent,
                                          });
                                          let data = categoriesSelectData.filter(
                                              (el) =>
                                                  el.name === e.target.textContent
                                          );
  
                                          setTargetIdSelect({
                                              ...targetIdSelect,
                                              categories: data[0].id,
                                          });
                                          dispatch(
                                              SelectSubCategoriesThunk({
                                                  id: data[0]?.id,
                                              })
                                          );
                                          setSelectCategoriesTarget(data[0].id);
                                      }
                                  }}
                              >
                                  <h6 className=" text-[17px]  mb-3 font-[500] capitalize dark:!text-white">
                                      {t("pages.ProductNew.Categories")}
                                  </h6>
                                  <SelectBox TargetData={categoriesSelectData} />
                                  {category_id_Error !== null && (
                                      <span
                                          style={{
                                              width: "100%",
                                              color: "red",
                                              fontSize: "15px",
                                              marginBottom: "15px",
                                              marginTop: "15px",
                                              display: "block",
                                          }}
                                      >
                                          {category_id_Error}
                                      </span>
                                  )}
                              </FormControl>
                              <FormControl
                                  className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[340px]"
                                  onClick={(e) => {
                                      // //  console.log(e.target.textContent)
                                      if (
                                          e.target.tagName == "LI" &&
                                          sub_categoriesSelectData.length
                                      ) {
                                          // //  console.log(e.target.textContent);
                                          setSelectTarget({
                                              ...selectTarget,
                                              Main_Category: e.target.textContent,
                                          });
                                          let data =
                                              sub_categoriesSelectData.filter(
                                                  (el) =>
                                                      el.name ===
                                                      e.target.textContent
                                              );
  
                                          setTargetIdSelect({
                                              ...targetIdSelect,
                                              sub_categories: data[0].id,
                                          });
                                          dispatch(
                                              SelectSubSubCategoriesThunk({
                                                  id: data[0]?.id,
                                              })
                                          );
                                          setSelectCategoriesTarget(data[0].id);
                                      }
                                  }}
                              >
                                  <h6 className=" text-[17px]  mb-3 font-[500] capitalize dark:!text-white">
                                      {t("pages.ProductNew.Sub_Categories")}
                                  </h6>
                                  <SelectCategoriesBox
                                      TargetData={sub_categoriesSelectData}
                                  />
                                  {category_id_Error !== null && (
                                      <span
                                          style={{
                                              width: "100%",
                                              color: "red",
                                              fontSize: "15px",
                                              marginBottom: "15px",
                                              marginTop: "15px",
                                              display: "block",
                                          }}
                                      >
                                          {category_id_Error}
                                      </span>
                                  )}
                              </FormControl>
                              <FormControl
                                  className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[340px]"
                                  onClick={(e) => {
                                      // //  console.log(e.target.textContent)
                                      if (
                                          e.target.tagName == "LI" &&
                                          sub_subcategoriesSelectData.length
                                      ) {
                                          // //  console.log(e.target.textContent);
                                          setSelectTarget({
                                              ...selectTarget,
                                              Main_Category: e.target.textContent,
                                          });
                                          let data =
                                              sub_subcategoriesSelectData.filter(
                                                  (el) =>
                                                      el.name ===
                                                      e.target.textContent
                                              );
  
                                          setTargetIdSelect({
                                              ...targetIdSelect,
                                              sub_sub_categories: data[0].id,
                                          });
                                          setSelectCategoriesTarget(data[0].id);
                                      }
                                  }}
                              >
                                  <h6 className=" text-[17px]  mb-3 font-[500] capitalize dark:!text-white">
                                      {t("pages.ProductNew.Sub_Sub_category")}
                                  </h6>
                                  <SelectCategoriesBox
                                      TargetData={sub_subcategoriesSelectData}
                                  />
                                  {category_id_Error !== null && (
                                      <span
                                          style={{
                                              width: "100%",
                                              color: "red",
                                              fontSize: "15px",
                                              marginBottom: "15px",
                                              marginTop: "15px",
                                              display: "block",
                                          }}
                                      >
                                          {category_id_Error}
                                      </span>
                                  )}
                              </FormControl>
                              <FormControl
                                  className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[340px]"
                                  onClick={(e) => {
                                      // //  console.log(e.target.textContent)
  
                                      if (e.target.tagName == "LI") {
                                          // //  console.log(e.target.textContent);
                                          setSelectTarget({
                                              ...selectTarget,
                                              Unit: e.target.textContent,
                                          });
                                          let data = unitSelectData.filter(
                                              (el) =>
                                                  el.name === e.target.textContent
                                          );
  
                                          setTargetIdSelect({
                                              ...targetIdSelect,
                                              unit: data[0].id,
                                          });
                                      }
                                  }}
                              >
                                  <h6 className=" text-[17px]  mb-3 font-[500] capitalize dark:!text-white">
                                      {t("pages.ProductNew.Unit")}
                                  </h6>
                                  <SelectBox
                                      TargetData={unitSelectData}
                                      selectIndex={selectIndex.unit}
                                  />
                                  {unit_id_Error !== null && (
                                      <span
                                          style={{
                                              width: "100%",
                                              color: "red",
                                              fontSize: "15px",
                                              marginBottom: "15px",
                                              marginTop: "15px",
                                              display: "block",
                                          }}
                                      >
                                          {unit_id_Error}
                                      </span>
                                  )}{" "}
                              </FormControl>
              </div>
              <hr className=" w-full my-[40px]" />
              <div className=" w-full flex gap-[30px] md:flex-row flex-col  ">
                <div className=" w-full ">
                  <TextFieldComponent
                    sx={{ width: "100%" }}
                    className="w-full !bg-secondaryBg outline-none p-8 dark:!bg-transparent dark:border-white dark:!rounded-md dark:!border dark:!border-solid dark:!border-white"
                    id="price"
                    type="text"
                    name="price"
                    label={t("pages.ProductNew.Unit_Price")}
                    value={inputValue.price}
                    handleChange={(e) => {
                      setInputValue({
                        ...inputValue,
                        price: e.target.value,
                      });
                    }}
                  />
                  {price_Error !== null && (
                    <span
                      style={{
                        width: "100%",
                        color: "red",
                        fontSize: "15px",
                        marginBottom: "15px",
                        marginTop: "15px",
                        display: "block",
                      }}
                    >
                      {price_Error}
                    </span>
                  )}{" "}
                </div>
                <div className=" w-full ">
                  <TextFieldComponent
                    sx={{ width: "100%" }}
                    className="w-full !bg-secondaryBg outline-none p-8 dark:!bg-transparent dark:border-white dark:!rounded-md dark:!border dark:!border-solid dark:!border-white"
                    id="minimum"
                    type="text"
                    name="minimum"
                    label={t("pages.ProductNew.minimum")}
                    value={inputValue.minimum}
                    handleChange={(e) => {
                      setInputValue({
                        ...inputValue,
                        minimum: e.target.value,
                      });
                    }}
                  />
                  {minimum_Error !== null && (
                    <span
                      style={{
                        width: "100%",
                        color: "red",
                        fontSize: "15px",
                        marginBottom: "15px",
                        marginTop: "15px",
                        display: "block",
                      }}
                    >
                      {minimum_Error}
                    </span>
                  )}{" "}
                </div>
                <div className=" w-full ">
                  <TextFieldComponent
                    sx={{ width: "100%" }}
                    className="w-full !bg-secondaryBg outline-none p-8 dark:!bg-transparent dark:border-white dark:!rounded-md dark:!border dark:!border-solid dark:!border-white"
                    id="total"
                    type="text"
                    name="total"
                    label={t("pages.ProductNew.Total_Quantity")}
                    value={inputValue.total}
                    handleChange={(e) => {
                      setInputValue({
                        ...inputValue,
                        total: e.target.value,
                      });
                    }}
                  />
                  {quantity_Error !== null && (
                    <span
                      style={{
                        width: "100%",
                        color: "red",
                        fontSize: "15px",
                        marginBottom: "15px",
                        marginTop: "15px",
                        display: "block",
                      }}
                    >
                      {quantity_Error}
                    </span>
                  )}{" "}
                </div>
                <div className=" w-full ">
                  <TextFieldComponent
                    sx={{ width: "100%" }}
                    className="w-full !bg-secondaryBg outline-none p-8 dark:!bg-transparent dark:border-white dark:!rounded-md dark:!border dark:!border-solid dark:!border-white"
                    id="selling_price"
                    type="text"
                    name="selling_price"
                    label={t("pages.ProductBox.table.selling_price")}
                    value={inputValue.selling_price}
                    handleChange={(e) => {
                      setInputValue({
                        ...inputValue,
                        selling_price: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <hr className=" w-full my-[40px]" />
              <div className=" w-full relative ">
                <ImageUploading
                  multiple
                  value={images}
                  onChange={onChange}
                  maxNumber={"1000"}
                  dataURLKey="data_url"
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                  }) => (
                    // write your building UI
                    <div className=" flex flex-col justify-end gap-[40px]  items-end">
                      <AddButton
                        text={t("pages.ServicesEdit.ADD_Images")}
                        className=" !bg-primaryBg w-[200px] h-[50px] "
                        onClick={() => {
                          setImgeTargetAction({
                            index: "",
                            type: "upload",
                          });
                          onImageUpload();
                        }}
                      />
                      <div className=" w-full flex flex-wrap gap-[30px] justify-center lg:justify-start items-start">
                        {imageList.length ? (
                          imageList.map((image, index) => (
                            <div
                              key={index}
                              className="image-item  w-full max-w-[300px] min-w-[200px] border p-3 border-primaryBg  relative "
                            >
                              <div className=" flex justify-between gap-5 items-center mb-3 ">
                                <h6 className="mb-[10px] text-[17px] font-[500] capitalize dark:!text-white">
                                  {t("pages.ServicesEdit.Img")} :{index + 1}
                                </h6>
                                <IconButton
                                  aria-label=""
                                  onClick={() => {
                                    setImgeTargetAction({
                                      index: index,
                                      type: "remove",
                                    });
                                    onImageRemove(index);
                                  }}
                                >
                                  <DeleteForever className="dark:!text-white"/>
                                </IconButton>
                              </div>
                              <img
                                src={image["data_url"]}
                                className=" rounded-[6px]  w-full cursor-pointer object-cover !aspect-square	"
                                alt=""
                                width="100"
                                onClick={() => {
                                  onImageUpdate(index);
                                  setImgeTargetAction({
                                    index: index,
                                    type: "update",
                                  });
                                }}
                              />
                            </div>
                          ))
                        ) : (
                          <div className="image-item  w-full max-h-[300px]">
                            <img
                              src={img}
                              className=" object-cover w-full max-h-[300px]"
                              alt=""
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </ImageUploading>
                {images_Error !== null && (
                  <span
                    style={{
                      width: "100%",
                      color: "red",
                      fontSize: "15px",
                      marginBottom: "15px",
                      marginTop: "15px",
                      display: "block",
                    }}
                  >
                    {images_Error}
                  </span>
                )}
              </div>
              {/* ======================== */}
              <hr className=" w-full my-[40px]" />
              <SubmitButton
                text={t("pages.ProductEdit.Submit")}
                className=" !bg-primaryBg  !w-full md:!w-[130px] !h-[50px]  !mt-[30px] !ml-auto"
              />
            </form>
          </div>
        </>
      </>
    );
  };
  
  export default React.memo(ProductEdit);