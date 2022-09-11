import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { pick, values } from "lodash";
import { THouseSettingsPageHook } from "./HouseSettingsPage.types";
import { houseSettingsRoutes } from "../../helpers/routing/house-settings";

const useHouseSettingsPage = (): THouseSettingsPageHook => {
  const location = useLocation();

  const pageInfo = useMemo(() => {
    const subPath = location.pathname.split("/").pop();

    return pick(
      values(houseSettingsRoutes).find(({ path }) => path === subPath),
      ["title", "description"]
    );
  }, [location.pathname]);

  return {
    pageInfo,
  };
};

export default useHouseSettingsPage;
