import React from "react";
import { TApiUser } from "../../helpers/api/types/entities.types";

export type TMembersListItemProps = {
  member: TApiUser;
  onRemoveMember: (member: TApiUser) => void;
};

export type TMembersListItemHook = {
  anchorRef: React.RefObject<HTMLDivElement>;
  isButtonGroupOpened: boolean;
  handleToggleButtonClick: () => void;
  handleButtonGroupClose: () => void;
};
