import React from "react";
import { TApiHouse, TApiUser } from "../../helpers/api/types/entities.types";

export type TDashboardWrapperStateProps = {
  isLogged: boolean;
  selectedHouseId: string | false;
  houses: Array<TApiHouse>;
  userInfo: TApiUser | false;
};

export type TDashboardWrapperDispatchProps = {
  logout: () => void;
  setSelectedHouseId: (houseId: string) => void;
};

export type TDashboardWrapperProps = TDashboardWrapperStateProps &
  TDashboardWrapperDispatchProps;

export type TDashboardWrapperHook = {
  housesMenuAnchorEl: HTMLElement | null;
  isDrawerOpen: boolean;
  isUserMenuOpen: boolean;
  currentHouse: TApiHouse | false;
  isHousesMenuOpen: boolean;
  handleMenuIconClick: () => void;
  handleDrawerClose: () => void;
  handleUserMenuIconClick: () => void;
  handleHousesButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleHousesMenuClose: () => void;
  handleHousesMenuItemClick: (houseId: string) => void;
};
