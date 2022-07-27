import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { THousesTableHook, THousesTableProps } from "./HousesTable.types";
import useDeleteHouseModal from "../DeleteHouseModal/useDeleteHouseModal";

const useHousesTable = ({
  fetchHouses,
  setSelectedHouseId,
}: THousesTableProps): THousesTableHook => {
  const navigate = useNavigate();

  const {
    deleteId: deleteHouseId,
    isModalOpen: isDeleteModalOpen,
    handleOpen: handleDeleteModalOpen,
    handleClose: handleDeleteModalClose,
  } = useDeleteHouseModal();

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
    deleteHouseId,
    isDeleteModalOpen,
    handleDeleteModalOpen,
    handleDeleteModalClose,
  };
};

export default useHousesTable;
