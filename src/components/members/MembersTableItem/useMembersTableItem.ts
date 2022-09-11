import { useCallback, useRef, useState } from "react";
import {
  TMembersTableItemHook,
  TMembersTableItemProps,
} from "./MembersTableItem.types";

const useMembersTableItem =
  // eslint-disable-next-line no-empty-pattern
  ({}: TMembersTableItemProps): TMembersTableItemHook => {
    const menuAnchorRef = useRef<HTMLButtonElement>(null);

    const [menuOpen, setMenuOpen] = useState(false);

    const handleListItemButtonClick = useCallback(() => {
      setMenuOpen(true);
    }, []);

    const handleMenuClose = useCallback(() => {
      setMenuOpen(false);
    }, []);

    return {
      menuAnchorRef,
      menuOpen,
      handleListItemButtonClick,
      handleMenuClose,
    };
  };

export default useMembersTableItem;
