import React from "react";
import { TRouteDetails } from "./index";

export enum E_HOUSE_SETTINGS_ROUTES {
  GENERAL = "general",
}

export type THouseSettingsRouteDetails<
  T extends keyof typeof E_HOUSE_SETTINGS_ROUTES
> = TRouteDetails<typeof E_HOUSE_SETTINGS_ROUTES, T> & {
  readonly title: React.ReactNode | string;
  readonly description: React.ReactNode | string;
};

export type THouseSettingsRoute = {
  [key in keyof typeof E_HOUSE_SETTINGS_ROUTES]: THouseSettingsRouteDetails<key>;
};

export const houseSettingsRoutes: THouseSettingsRoute = {
  GENERAL: {
    path: E_HOUSE_SETTINGS_ROUTES.GENERAL,
    readableName: "General",
    component: React.lazy(
      () => import("../../components/settings/house/GeneralSettings")
    ),
    title: "General",
    description: "General settings for your house",
  },
};
