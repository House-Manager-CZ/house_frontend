import { useCallback, useRef, useState } from "react";
import {
  TMembersListItemHook,
  TMembersListItemProps,
} from "./MembersListItem.types";

const useMembersListItem = ({
  userInfo,
  member,
  onRemoveMember,
}: TMembersListItemProps): TMembersListItemHook => {
  const anchorRef = useRef<HTMLDivElement>(null);

  const [isButtonGroupOpened, setIsButtonGroupOpened] =
    useState<boolean>(false);

  const handleToggleButtonClick = useCallback(() => {
    setIsButtonGroupOpened(!isButtonGroupOpened);
  }, [isButtonGroupOpened]);

  const handleButtonGroupClose = useCallback(() => {
    setIsButtonGroupOpened(false);
  }, []);

  const handleDeleteButtonClick = useCallback(() => {
    if (userInfo && userInfo.id !== member.id) onRemoveMember(member);
  }, [member, onRemoveMember, userInfo]);

  return {
    anchorRef,
    isButtonGroupOpened,
    handleToggleButtonClick,
    handleButtonGroupClose,
    handleDeleteButtonClick,
  };
};

export default useMembersListItem;
