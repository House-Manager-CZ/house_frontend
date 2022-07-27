import { Feature, Geometry } from "geojson";
import { TApiEvent, TApiHouse } from "../../helpers/api/types/entities.types";
import { TNominatimFeatureProperties } from "../../helpers/geo/nominatim";

export type THouseDashboardSidebarStateProps = {
  selectedHouse: TApiHouse | false;
  events: Array<TApiEvent>;
  eventsLoading: boolean;
};

export type THouseDashboardSidebarDispatchProps = {};

export type THouseDashboardSidebarProps = THouseDashboardSidebarStateProps &
  THouseDashboardSidebarDispatchProps;

export type THouseDashboardSidebarHook = {
  mapImageUrl: string | false;
  addressInfo: Feature<Geometry, TNominatimFeatureProperties> | false;
};
