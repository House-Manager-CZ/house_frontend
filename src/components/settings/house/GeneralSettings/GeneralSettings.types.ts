import { FormikErrors } from "formik";
import React from "react";
import {
  E_HOUSE_ENTITY_KEYS,
  TApiHouse,
} from "../../../../helpers/api/types/entities.types";
import { THouseEditAction } from "../../../../redux/houses/types/houses.schema";

export type TGeneralSettingsStateProps = {
  selectedHouse: TApiHouse | false;
};

export type TGeneralSettingsDispatchProps = {
  runEditHouse: (
    id: THouseEditAction[E_HOUSE_ENTITY_KEYS.ID],
    data: THouseEditAction["data"]
  ) => void;
};

export type TGeneralSettingsProps = TGeneralSettingsStateProps &
  TGeneralSettingsDispatchProps;

export type TGeneralSettingsHook = {
  nameValue: TGeneralSettingsFormValues[E_HOUSE_ENTITY_KEYS.NAME];
  locationValue: TGeneralSettingsFormValues[E_HOUSE_ENTITY_KEYS.LOCATION];
  errors: FormikErrors<TGeneralSettingsFormValues>;
  handleChange: (e: React.ChangeEvent<HTMLFormElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export type TGeneralSettingsFormValues = Pick<
  TApiHouse,
  E_HOUSE_ENTITY_KEYS.NAME
> & {
  [E_HOUSE_ENTITY_KEYS.LOCATION]: string;
};
