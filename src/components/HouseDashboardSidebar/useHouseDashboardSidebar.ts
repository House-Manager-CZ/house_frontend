import { useEffect, useState } from "react";
import { Feature, Geometry } from "geojson";
import {
  THouseDashboardSidebarHook,
  THouseDashboardSidebarProps,
} from "./HouseDashboardSidebar.types";
import Nominatim, {
  TNominatimFeatureProperties,
} from "../../helpers/geo/nominatim";
import MapboxHelper from "../../helpers/geo/mapbox";

const useHouseDashboardSidebar = ({
  selectedHouse,
}: THouseDashboardSidebarProps): THouseDashboardSidebarHook => {
  const [mapImageUrl, setMapImageUrl] = useState<string | false>(false);
  const [addressInfo, setAddressInfo] = useState<
    Feature<Geometry, TNominatimFeatureProperties> | false
  >(false);

  useEffect(() => {
    if (selectedHouse) {
      Nominatim.getCoordinatesInfo(
        selectedHouse.location.coordinates[0],
        selectedHouse.location.coordinates[1]
      ).then((data) => setAddressInfo(data.features[0]));

      setMapImageUrl(
        MapboxHelper.getInstance()
          .staticClient.getStaticImage({
            ownerId: "nicksettler",
            styleId: "ckytdjqxk000d14lcmq0ib37y",
            width: 600,
            height: 300,
            position: {
              coordinates: [
                selectedHouse.location.coordinates[1],
                selectedHouse.location.coordinates[0],
              ],
              zoom: 16,
            },
            overlays: [
              {
                marker: {
                  coordinates: [
                    selectedHouse.location.coordinates[1],
                    selectedHouse.location.coordinates[0],
                  ],
                  color: "#FF0000",
                },
              },
            ],
          })
          .url()
      );
    }
  }, [selectedHouse]);

  return {
    mapImageUrl,
    addressInfo,
  };
};

export default useHouseDashboardSidebar;
