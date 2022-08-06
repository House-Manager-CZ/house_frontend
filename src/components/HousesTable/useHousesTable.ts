import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { THousesTableHook, THousesTableProps } from "./HousesTable.types";

const useHousesTable = ({
  fetchHouses,
  setSelectedHouseId,
}: THousesTableProps): THousesTableHook => {
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

export default useHousesTable;
