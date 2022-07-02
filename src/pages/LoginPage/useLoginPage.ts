import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TLoginPageFormikValues,
  TLoginPageHook,
  TLoginPageProps,
} from "./LoginPage.types";

const useLoginPage = ({ runLogin }: TLoginPageProps): TLoginPageHook => {
  const { values, errors, handleChange, handleSubmit } =
    useFormik<TLoginPageFormikValues>({
      initialValues: {
        email: "",
        password: "",
      },
      validateOnChange: false,
      validationSchema: Yup.object({
        email: Yup.string()
          .required("Email is required")
          .email("Email isn't valid"),
        password: Yup.string()
          .required("Password is required")
          .min(6, "Password must be at least 6 characters long"),
      }),
      onSubmit({ email, password }: TLoginPageFormikValues) {
        runLogin(email, password);
      },
    });

  return {
    emailValue: values.email,
    passwordValue: values.password,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useLoginPage;
