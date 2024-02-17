// validationSchemas.js

import * as yup from "yup";
const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
const mastervalidationSchema = yup.object().shape({
  text: yup.string().required("Required"),
  email: yup.string().email("Invalid email!").required("Required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid!")
    .required("Required"),
  number: yup.number().required("Required"),
  bool: yup.boolean().required("Required"),
  address: yup.string().required("Required"),
  socialMedia: yup.string().url("Invalid URL").required("Required"),
  description: yup
    .string()
    .min(10, "Description must be at least 10 characters")
    .required("Description is required"),
  password: yup
    .string()
    // .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[A-Z][a-z])/,
      "Password must contain at least one uppercase letter and least one lowercase letter"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),

  image: yup
    .mixed()
    .test("fileSize", "File size is too large", (value) => {
      return value && value.size <= 1024000 * 3; // 3MB maximum file size
    })
    .required("required")
    .test("fileType", "Unsupported file type", (value) => {
      return (
        value && ["image/jpeg", "image/png", "image/gif"].includes(value.type)
      );
    }),
});

export default mastervalidationSchema.fields;
