import { useCallback, useState } from "react";
import { TDeleteHouseModalHook } from "./DeleteHouseModal.types";

const useDeleteHouseModal = (): TDeleteHouseModalHook => {
  const [deleteId, setDeleteId] = useState<string | false>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpen = useCallback((id?: string) => {
    if (id) setDeleteId(id);
    setIsModalOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setDeleteId(false);
    setIsModalOpen(false);
  }, []);

  return {
    deleteId,
    isModalOpen,
    handleOpen,
    handleClose,
  };
};

export default useDeleteHouseModal;
