import React from "react";
import ChooseHousePage from "../../pages/ChooseHousePage/ChooseHousePage";
import AddHousePage from "../../pages/AddHousePage/AddHousePage";

export enum APP_ROUTES {
  HOME = "/",
  CHOOSE_HOUSE = "/choose-house",
  ADD_HOUSE = "/add-house",
  LOGIN = "/auth/login",
  REGISTER = "/auth/register",
}

export type TAppRouteDetails<T extends keyof typeof APP_ROUTES> = {
  readonly path: typeof APP_ROUTES[T];
  readonly readableName: string;
  readonly component: React.ComponentType<any>;
};

export type TAppRoute = {
  [key in keyof typeof APP_ROUTES]: TAppRouteDetails<key>;
};

export const appRoutes: Omit<TAppRoute, "HOME" | "LOGIN" | "REGISTER"> = {
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
};
