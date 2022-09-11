import { TApiHouse } from "../../../../helpers/api/types/entities.types";

export type TMembersSettingsStateProps = {
  selectedHouse: TApiHouse | false;
};

export type TMembersSettingsDispatchProps = {};

export type TMembersSettingsProps = TMembersSettingsStateProps &
  TMembersSettingsDispatchProps;

export type TMembersSettingsHook = {};
