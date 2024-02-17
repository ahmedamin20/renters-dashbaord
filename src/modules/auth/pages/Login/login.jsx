import { useState } from "react";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/auth.js";
import { StatuseCode } from "../../../../statuseCodes.js";
// import { useNavigate } from "react-router-dom";
import Copyright from "../../../../components/copywrite/copyWrite.jsx";
import { userProfile } from "../../redux/profile.js";

const Login = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [disable, setDisable] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      fcm_token:"1233"
    },
    // validationSchema:LoginSchema,
    onSubmit: (values) => {
      setDisable(true);
      dispatch(userLogin(values))
        .then((res) => {
          if (res.payload.code === StatuseCode.OK) {
            dispatch(userProfile());
            setDisable(false);
          }
        })
        .catch(() => setDisable(false));
      setDisable(false);
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <Container
      component="main"
      sx={{
        minWidth: "100vw",
        minHeight: "100vh",
        backgroundImage: "url('assets/backGround.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          margin: "1rem auto",
          position: "relative",
          width: "70%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#ffffffde",
          padding: "2rem",
          borderRadius: ".5rem",
        }}
      >
        <img
          src="/assets/logo.png"
          alt="KSB logo"
          style={{ width: 300, height: 150, margin: "1rem auto" }}
        />
        <Typography component="h1" sx={{ fontWeight: "bold" }} variant="h5">
          Sign in
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <FormControl
            sx={{ color: "white" }}
            required
            fullWidth
            variant="outlined"
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div style={{ width: "100%", color: "red" }}>
                {formik.errors.email}
              </div>
            )}
          </FormControl>
          <FormControl
            sx={{ color: "white" }}
            required
            fullWidth
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                    required
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <div style={{ width: "100%", color: "red" }}>
                {formik.errors.password}
              </div>
            )}
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="text"
            sx={{
              mt: 3,
              mb: 2,
              fontWeight: "bold",
              fontSize: "22px",
              backgroundColor: "#ff7205",
              color: "white",
              borderRadius: ".5rem",
              transition: "all .5s ease-in-out",
              ":hover": {
                backgroundColor: "black",
                color: "#ff7205",
              },
            }}
            disabled={disable}
          >
            Sign In
          </Button>
        </form>
        <Copyright variant={"h6"} />
      </Box>
    </Container>
  );
};

export default Login;
