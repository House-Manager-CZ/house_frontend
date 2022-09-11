import React from "react";
import { TApiUser } from "../../../helpers/api/types/entities.types";
import { E_MEMBERS_LIST_ACTIONS } from "../MembersTable/MembersTable.types";

export type TMembersTableItemStateProps = {};

export type TMembersTableItemDispatchProps = {};

export type TMembersTableItemProps = TMembersTableItemStateProps &
  TMembersTableItemDispatchProps & {
    member: TApiUser;
    actions?: Array<E_MEMBERS_LIST_ACTIONS>;
    selectable?: boolean;
    selected?: boolean;
    handleCheckboxChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };

export type TMembersTableItemHook = {
  menuAnchorRef: React.RefObject<HTMLButtonElement>;
  menuOpen: boolean;
  handleListItemButtonClick: () => void;
  handleMenuClose: () => void;
};
