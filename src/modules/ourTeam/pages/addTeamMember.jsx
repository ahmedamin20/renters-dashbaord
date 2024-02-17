import { useState } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useFormik } from "formik";
import { CustomFormikTextFeild } from "../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import CustomLable from "../../../components/CustomLable.jsx";
import { StatuseCode } from "../../../statuseCodes.js";
import CustomSelectMenu from "../../../components/CustomSelect/CustomSelect.jsx";
import { useEffect } from "react";
import { addOurTeam, getOurTeam } from "../redux/ourTeam.js";
import { getOurTeamMenu } from "../../../redux/select_menus.js";
import useMainHooks from "../../../hooks/useMainHooks.jsx";

const AddTeamMember = () => {
  const { sidebarRTL, t, navigate, dispatch, colors, isLoading, setIsLoading } =
    useMainHooks();
  const teamSelectMenu = useSelector((state) => state.selectMenu.teamMenu.data);
  const [img, setImg] = useState("/assets/mainImg.png");
  const fileRef = useRef();
  const formik = useFormik({
    initialValues: {
      name: "",
      facebook: "",
      linkedin: "",
      whatsApp: "",
      youtube: "",
      tiktok: "",
    },
    enableReinitialize: true,
    // validationSchema: BlogsSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = (values) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("facebook", values.facebook);
    formData.append("linkedin", values.linkedin);
    formData.append("whatsApp", values.whatsApp);
    formData.append("youtube", values.youtube);
    formData.append("tiktok", values.tiktok);
    formData.append("section_id", values.section_id);
    formData.append("team_member", values.team_member);
    dispatch(addOurTeam(formData))
      .then((res) => {
        if (res.payload.code === StatuseCode.CREATED) {
          navigate(-1, { replace: true });
          dispatch(getOurTeam({ pageSize: 10 }));
          setIsLoading(false);
        }
      })
      .catch(() => setIsLoading(false));
  };
  const teamMenuRef = useRef(true);

  useEffect(() => {
    dispatch(getOurTeamMenu());
  }, [teamMenuRef, dispatch]);

  const handleChangePhoto = async (e) => {
    await formik.setFieldValue("team_member", e.target.files[0]);
    await setImg(URL.createObjectURL(e.target.files[0]));
  };
  const handleFileRef = () => {
    fileRef.current.click();
  };
  const textField = [
    {
      name: "name",
      value: formik.values.name,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: "name",
      error: !!formik.touched.name && !!formik.errors.name,
      helperText: formik.touched.name && formik.errors.name,
    },
    {
      name: "facebook",
      value: formik.values.facebook,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: "facebook",
      error: !!formik.touched.facebook && !!formik.errors.facebook,
      helperText: formik.touched.facebook && formik.errors.facebook,
    },
    {
      name: "linkedin",
      value: formik.values.linkedin,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: "linkedin",
      error: !!formik.touched.linkedin && !!formik.errors.linkedin,
      helperText: formik.touched.linkedin && formik.errors.linkedin,
    },
    {
      name: "whatsApp",
      value: formik.values.whatsApp,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: "whatsApp",
      error: !!formik.touched.whatsApp && !!formik.errors.whatsApp,
      helperText: formik.touched.whatsApp && formik.errors.whatsApp,
    },
    {
      name: "youtube",
      value: formik.values.youtube,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: "youtube",
      error: !!formik.touched.youtube && !!formik.errors.youtube,
      helperText: formik.touched.youtube && formik.errors.youtube,
    },
    {
      name: "tiktok",
      value: formik.values.tiktok,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: "tiktok",
      error: !!formik.touched.tiktok && !!formik.errors.tiktok,
      helperText: formik.touched.tiktok && formik.errors.tiktok,
    },
  ];
  const handleSectionChange = (item) => {
    formik.setFieldValue("section_id", item?.id);
  };
  return (
    <Box m={2} dir={sidebarRTL ? "rtl" : "ltr"}>
      <form onSubmit={formik.handleSubmit}>
        {textField.map((item, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <CustomLable title={item.name} />
            <CustomFormikTextFeild
              placeholder={item.name}
              isMulti={item.isMulti}
              onBlur={item.onBlur}
              fullWidth={true}
              value={item.value}
              onChange={formik.handleChange}
              helperText={item.helperText}
              error={item.error}
              name={item.name}
            />
          </div>
        ))}
        <CustomSelectMenu
          onChange={handleSectionChange}
          lable="select_section"
          options={teamSelectMenu}
        />
        <div
          style={{
            width: "400px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem",
            margin: ".5rem auto",
          }}
        >
          <input
            type="file"
            id="fileInput"
            onChange={handleChangePhoto}
            style={{ display: "none" }}
            ref={fileRef}
          />
          <img
            src={img}
            alt="img"
            style={{ margin: "1rem auto", width: "300px" }}
            onClick={handleFileRef}
          />
        </div>
      </form>
      <Button
        type="submit"
        onClick={formik.handleSubmit}
        fullWidth
        sx={{
          backgroundColor: colors.blueAccent[700],
          color: colors.grey[100],
          fontSize: "14px",
          fontWeight: "bold",
          padding: "10px 15px",
        }}
        disabled={isLoading}
      >
        {isLoading ? t('loading') :t("Add")}
      </Button>
    </Box>
  );
};

export default AddTeamMember;
