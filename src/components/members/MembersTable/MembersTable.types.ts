import React from "react";
import { TApiHouse } from "../../../helpers/api/types/entities.types";

export type TMembersListStateProps = {
  selectedHouse: TApiHouse | false;
};

export type TMembersListDispatchProps = {};

export enum E_MEMBERS_LIST_ACTIONS {
  CHANGE_ROLE = "CHANGE_ROLE",
  REMOVE_MEMBER = "REMOVE_MEMBER",
}

export type TMembersListProps = TMembersListStateProps &
  TMembersListDispatchProps & {
    selectable?: boolean;
    actions?: Array<E_MEMBERS_LIST_ACTIONS>;
  };

export enum E_MEMBERS_LIST_FORM_FIELDS {
  SELECTED_MEMBERS = "selectedMembers",
}

export type TMembersListHook = {
  selectedButtonRef: React.RefObject<HTMLButtonElement>;
  selectedMenuOpen: boolean;
  [E_MEMBERS_LIST_FORM_FIELDS.SELECTED_MEMBERS]: TMemberListFormValues[E_MEMBERS_LIST_FORM_FIELDS.SELECTED_MEMBERS];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAllCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectedMenuButtonClick: () => void;
  handleSelectedMenuClose: () => void;
};

export type TMemberListFormValues = {
  [E_MEMBERS_LIST_FORM_FIELDS.SELECTED_MEMBERS]: Array<string>;
};
