import React from "react";
import { FormikErrors } from "formik";

export type TLoginPageStateProps = {
  isLogged: boolean;
  loginRequestLoading: boolean;
  loginRequestError: string;
};

export type TLoginPageDispatchProps = {
  runLogin: (email: string, password: string) => void;
};

export type TLoginPageProps = TLoginPageStateProps & TLoginPageDispatchProps;

export type TLoginPageHook = {
  emailValue: string;
  passwordValue: string;
  errors: FormikErrors<TLoginPageFormikValues>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export type TLoginPageFormikValues = {
  email: string;
  password: string;
};
