import React from "react";
import { TApiHouse } from "../../helpers/api/types/entities.types";

export type TDashboardWrapperStateProps = {
  isLogged: boolean;
  selectedHouseId: string | false;
  houses: Array<TApiHouse>;
};

export type TDashboardWrapperDispatchProps = {
  setSelectedHouseId: (houseId: string) => void;
};

export type TDashboardWrapperProps = TDashboardWrapperStateProps &
  TDashboardWrapperDispatchProps;

export type TDashboardWrapperHook = {
  housesMenuAnchorEl: HTMLElement | null;
  isDrawerOpen: boolean;
  currentHouse: TApiHouse | false;
  isHousesMenuOpen: boolean;
  handleMenuIconClick: () => void;
  handleDrawerClose: () => void;
  handleHousesButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleHousesMenuClose: () => void;
  handleHousesMenuItemClick: (houseId: string) => void;
};
