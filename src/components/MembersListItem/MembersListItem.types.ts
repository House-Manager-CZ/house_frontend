import React from "react";
import { TApiUser } from "../../helpers/api/types/entities.types";

export type TMembersListItemStateProps = {
  userInfo: TApiUser | false;
};

export type TMembersListItemProps = TMembersListItemStateProps & {
  member: TApiUser;
  onRemoveMember: (member: TApiUser) => void;
};

export type TMembersListItemHook = {
  anchorRef: React.RefObject<HTMLDivElement>;
  isButtonGroupOpened: boolean;
  handleToggleButtonClick: () => void;
  handleButtonGroupClose: () => void;
  handleDeleteButtonClick: () => void;
};
