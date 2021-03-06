import { FormikErrors } from "formik";
import React from "react";

export type TRegisterPageStateProps = {
  isLogged: boolean;
  registerRequestLoading: boolean;
  registerRequestError: string;
};

export type TRegisterPageDispatchProps = {
  runRegister: (username: string, email: string, password: string) => void;
};

export type TRegisterPageProps = TRegisterPageStateProps &
  TRegisterPageDispatchProps;

export type TRegisterPageHook = {
  usernameValue: string;
  emailValue: string;
  passwordValue: string;
  passwordConfirmValue: string;
  errors: FormikErrors<TRegisterPageFormikValues>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export type TRegisterPageFormikValues = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};
