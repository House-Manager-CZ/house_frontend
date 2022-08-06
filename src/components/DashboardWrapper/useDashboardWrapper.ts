import React, { useCallback, useEffect, useState } from "react";
import { Theme, useMediaQuery } from "@mui/material";
import {
  TDashboardWrapperHook,
  TDashboardWrapperProps,
} from "./DashboardWrapper.types";
import { TApiHouse } from "../../helpers/api/types/entities.types";

const useDashboardWrapper = ({
  houses,
  selectedHouseId,
  setSelectedHouseId,
}: TDashboardWrapperProps): TDashboardWrapperHook => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const [currentHouse, setCurrentHouse] = useState<TApiHouse | false>(false);
  const [housesMenuAnchorEl, setHousesMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const [isHousesMenuOpen, setIsHousesMenuOpen] = useState<boolean>(false);

  const smDownBreakpoint = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  useEffect(() => {
    if (smDownBreakpoint) setIsDrawerOpen(false);
  }, [smDownBreakpoint]);

  useEffect(() => {
    setCurrentHouse(
      houses.find((house) => house.id === selectedHouseId) || false
    );
  }, [houses, selectedHouseId]);

  const handleMenuIconClick = useCallback(() => {
    setIsDrawerOpen(!isDrawerOpen);
  }, [isDrawerOpen]);

  const handleDrawerClose = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  const handleUserMenuIconClick = useCallback(() => {
    setIsUserMenuOpen(!isUserMenuOpen);
  }, [isUserMenuOpen]);

  const handleHousesButtonClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setHousesMenuAnchorEl(e.currentTarget);
      setIsHousesMenuOpen(!isHousesMenuOpen);
    },
    [isHousesMenuOpen]
  );

  const handleHousesMenuClose = useCallback(() => {
    setIsHousesMenuOpen(false);
  }, []);

  const handleHousesMenuItemClick = useCallback(
    (houseId: string) => {
      setSelectedHouseId(houseId);
      setIsHousesMenuOpen(false);
    },
    [setSelectedHouseId]
  );

  return {
    housesMenuAnchorEl,
    isDrawerOpen,
    isUserMenuOpen,
    currentHouse,
    isHousesMenuOpen,
    handleMenuIconClick,
    handleDrawerClose,
    handleUserMenuIconClick,
    handleHousesButtonClick,
    handleHousesMenuClose,
    handleHousesMenuItemClick,
  };
};

export default useDashboardWrapper;
