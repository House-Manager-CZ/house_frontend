import { useCallback, useRef, useState } from "react";
import { TMembersListItemHook } from "./MembersListItem.types";

const useMembersListItem = (): TMembersListItemHook => {
  const anchorRef = useRef<HTMLDivElement>(null);

  const [isButtonGroupOpened, setIsButtonGroupOpened] =
    useState<boolean>(false);

  const handleToggleButtonClick = useCallback(() => {
    setIsButtonGroupOpened(!isButtonGroupOpened);
  }, [isButtonGroupOpened]);

  const handleButtonGroupClose = useCallback(() => {
    setIsButtonGroupOpened(false);
  }, []);

  return {
    anchorRef,
    isButtonGroupOpened,
    handleToggleButtonClick,
    handleButtonGroupClose,
  };
};

export default useMembersListItem;
