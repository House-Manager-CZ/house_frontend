import React from "react";
import ChooseHousePage from "../../pages/ChooseHousePage/ChooseHousePage";
import AddHousePage from "../../pages/AddHousePage/AddHousePage";
import HouseDashboard from "../../pages/HouseDashboard/HouseDashboard";
import HousesPage from "../../pages/HousesPage/HousesPage";
import EditHousePage from "../../pages/EditHousePage/EditHousePage";
import HouseSettingsPage from "../../pages/HouseSettingsPage";

export enum APP_ROUTES {
  HOME = "/",
  HOUSES = "/houses",
  CHOOSE_HOUSE = "/choose-house",
  ADD_HOUSE = "/add-house",
  EDIT_HOUSE = "/edit-house/:id",
  HOUSE_SETTINGS = "/house-settings/*",
  LOGIN = "/auth/login",
  REGISTER = "/auth/register",
}

export type TRouteDetails<U extends unknown, T extends keyof U> = {
  readonly path: U[T];
  readonly readableName: string;
  readonly component: React.ComponentType<any>;
};

export type TAppRouteDetails<T extends keyof typeof APP_ROUTES> = TRouteDetails<
  typeof APP_ROUTES,
  T
>;

export type TAppRoute = {
  [key in keyof typeof APP_ROUTES]: TAppRouteDetails<key>;
};

export const appRoutes: Omit<TAppRoute, "LOGIN" | "REGISTER"> = {
  HOME: {
    path: APP_ROUTES.HOME,
    readableName: "Home",
    component: HouseDashboard,
  },
  HOUSES: {
    path: APP_ROUTES.HOUSES,
    readableName: "Houses",
    component: HousesPage,
  },
  CHOOSE_HOUSE: {
    path: APP_ROUTES.CHOOSE_HOUSE,
    readableName: "Choose House",
    component: ChooseHousePage,
  },
  ADD_HOUSE: {
    path: APP_ROUTES.ADD_HOUSE,
    readableName: "Add House",
    component: AddHousePage,
  },
  EDIT_HOUSE: {
    path: APP_ROUTES.EDIT_HOUSE,
    readableName: "Edit House",
    component: EditHousePage,
  },
  HOUSE_SETTINGS: {
    path: APP_ROUTES.HOUSE_SETTINGS,
    readableName: "House Settings",
    component: HouseSettingsPage,
  },
};
