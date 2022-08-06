import { FormikErrors } from "formik";
import React from "react";
import { TApiHouse, TApiUser } from "../../helpers/api/types/entities.types";
import {
  THouseApiCreateData,
  THouseApiEditData,
} from "../../helpers/api/houses.api";
import {
  THouseCreateError,
  THouseEditError,
} from "../../redux/houses/types/houses.schema";

export type THouseFormStateProps = {
  userInfo: TApiUser | false;
  houses: Array<TApiHouse>;
  createHouseRequestLoading: boolean;
  createHouseRequestSuccess: boolean;
  createHouseRequestError: THouseCreateError | false;
  editHouseRequestLoading: boolean;
  editHouseRequestSuccess: boolean;
  editHouseRequestError: THouseEditError | false;
};

export type THouseFormDispatchProps = {
  runCreateHouse: (data: THouseApiCreateData) => void;
  runEditHouse: (id: string, data: THouseApiEditData) => void;
};

export type THouseFormProps = THouseFormStateProps &
  THouseFormDispatchProps & {
    mode: "add" | "edit";
  };

export type THouseFormHook = {
  nameValue: string;
  locationValue: string;
  selectedMembers: Array<TApiUser>;
  errors: FormikErrors<THouseFormValues>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMemberAdd: (member: TApiUser) => void;
  handleMemberRemove: (member: TApiUser) => void;
  handleCancelClick: () => void;
  handleFormSubmit: (events: React.FormEvent<HTMLFormElement>) => void;
};

export type THouseFormValues = {
  name: string;
  location: string;
  members: Array<TApiUser>;
};
