import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  TChooseHousePageHook,
  TChooseHousePageProps,
} from "./ChooseHousePage.types";

const useChooseHousePage = ({
  fetchHouses,
  setSelectedHouseId,
}: TChooseHousePageProps): TChooseHousePageHook => {
  const navigate = useNavigate();

  const handleRefreshClick = useCallback(() => {
    fetchHouses();
  }, [fetchHouses]);

  const handleSelectHouseClick = useCallback(
    (id: string) => {
      setSelectedHouseId(id);
      navigate("/");
    },
    [navigate, setSelectedHouseId]
  );

  return {
    handleRefreshClick,
    handleSelectHouseClick,
  };
};

export default useChooseHousePage;
