import Box from "@mui/material/Box";
import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useState } from "react";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { userLogin } from "../../modules/auth/redux/auth.js";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";

import { LazyLoadImage } from "react-lazy-load-image-component";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [disable, setDisable] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    username: yup.string().required("Required"),
    password: yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handelSubmit(values);
    },
  });
  const handelSubmit = async (values) => {
    setDisable(true);
    await dispatch(userLogin(values))
      .then(() => setDisable(false))
      .catch(() => setDisable(false));
      setDisable(false)
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        width: "100vw",
        height: "100vh",
        backgroundImage: `url('/assets/login_img.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontWeight: "bold",
        gap: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            p: 2,
            background:
              "linear-gradient(219.64deg, #102F8A 7.91%, #4E6ABB 92.12%)",
            flexGrow: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            borderRadius: { md: "12px 0px 0px 12px", xs: "12px 12px 0px 0px" },
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: "bold", color: "#fff" }}>
            Welcome to ..
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "11px",
            }}
          >
            <LazyLoadImage
              effect="blur"
              wrapperProps={{
                style: { transitionDelay: "1s" },
              }}
              src="/assets/left_login_logo.png"
              alt="logo"
              width="40px"
            />
            <Typography
              variant="h1"
              sx={{
                fontWeight: "bold",
                textTransform: "uppercase",
                color: "#fff",
              }}
            >
              Educator
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
            System for managing students' notes
            <br /> at various educational stages
          </Typography>
        </Box>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 3,
            minWidth: { xs: "100%", md: 350 },
            bgcolor: "#fff",
            flex: 1,
            borderRadius: { md: "0px 12px 12px 0px", xs: "0px 0px 12px 12px" },
            justifyContent: "center",
          }}
        >
          <img src="/assets/educator_icons.png" alt="icon" />
          <OutlinedInput
            required
            type="text"
            placeholder="username"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.username}
            name="username"
            error={!!formik.touched.username && !!formik.errors.username}
            helperText={formik.touched.username && formik.errors.username}
            sx={{
              color: "#000",
              width: "100%",
              marginTop: "16px",
              borderRadius: "5px",
              border: "1px solid #000",
              outline: "none",
            }}
          />
          <OutlinedInput
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            name="password"
            required
            error={!!formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  sx={{ color: "#000" }}
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            sx={{
              color: "#000",
              width: "100%",
              marginTop: "16px",
              borderRadius: "5px",
              border: "1px solid #000",
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              width: "35%",
              padding: "12px",
              marginTop: "16px",
              borderRadius: "25px",
              background:
                "linear-gradient(219.64deg, #4E6ABB 7.91%, #3F579E 92.12%)",
              color: "#fff",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
              
            }}
            disabled={disable}
          >
            {disable ? "wait..." : "Sign In"}
          </button>
        </Box>
      </Box>
    </Box>
  );
}
