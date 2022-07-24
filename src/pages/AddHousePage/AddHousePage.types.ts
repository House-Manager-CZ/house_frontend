import React from "react";
import { FormikErrors } from "formik";
import { THouseApiCreateData } from "../../helpers/api/houses.api";
import { THouseCreateError } from "../../redux/houses/types/houses.schema";
import { TApiUser } from "../../helpers/api/types/entities.types";

export type TAddHousePageStateProps = {
  userInfo: TApiUser | false;
  createHouseRequestLoading: boolean;
  createHouseRequestSuccess: boolean;
  createHouseRequestError: THouseCreateError | false;
};

export type TAddHousePageDispatchProps = {
  runCreateHouse: (data: THouseApiCreateData) => void;
};

export type TAddHousePageProps = TAddHousePageStateProps &
  TAddHousePageDispatchProps;

export type TAddHousePageHook = {
  nameValue: string;
  locationValue: string;
  selectedMembers: Array<TApiUser>;
  errors: FormikErrors<TAddHousePageFormValues>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMemberAdd: (member: TApiUser) => void;
  handleMemberRemove: (member: TApiUser) => void;
  handleFormSubmit: (events: React.FormEvent<HTMLFormElement>) => void;
};

export type TAddHousePageFormValues = {
  name: string;
  location: string;
  members: Array<TApiUser>;
};
