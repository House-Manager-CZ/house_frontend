import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TRegisterPageFormikValues,
  TRegisterPageHook,
  TRegisterPageProps,
} from "./RegisterPage.types";

const useRegisterPage = ({
  runRegister,
}: TRegisterPageProps): TRegisterPageHook => {
  const { values, errors, handleChange, handleSubmit } =
    useFormik<TRegisterPageFormikValues>({
      initialValues: {
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
      },
      validateOnChange: false,
      validationSchema: Yup.object({
        username: Yup.string().required("Username is required"),
        email: Yup.string()
          .required("Email is required")
          .email("Email isn't valid"),
        password: Yup.string()
          .required("Password is required")
          .min(6, "Password must be at least 6 characters long"),
        passwordConfirm: Yup.string()
          .required("Password confirmation is required")
          .oneOf([Yup.ref("password"), null], "Passwords must match"),
      }),
      onSubmit({ username, email, password }: TRegisterPageFormikValues) {
        runRegister(username, email, password);
      },
    });

  return {
    usernameValue: values.username,
    emailValue: values.email,
    passwordValue: values.password,
    passwordConfirmValue: values.passwordConfirm,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useRegisterPage;
