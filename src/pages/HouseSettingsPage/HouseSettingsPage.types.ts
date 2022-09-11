import { THouseSettingsRouteDetails } from "../../helpers/routing/house-settings";

export type THouseSettingsPageStateProps = {};

export type THouseSettingsPageDispatchProps = {};

export type THouseSettingsPageProps = THouseSettingsPageStateProps &
  THouseSettingsPageDispatchProps;

export type THouseSettingsPageInfo = Partial<
  Pick<THouseSettingsRouteDetails<never>, "title" | "description">
>;

export type THouseSettingsPageHook = {
  pageInfo: THouseSettingsPageInfo;
};
