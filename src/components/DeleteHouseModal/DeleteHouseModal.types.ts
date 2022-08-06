import { TApiHouse } from "../../helpers/api/types/entities.types";
import { THouseDeleteError } from "../../redux/houses/types/houses.schema";

export type TDeleteHouseModalStateProps = {
  houses: Array<TApiHouse>;
  deleteHouseRequestLoading: boolean;
  deleteHouseRequestSuccess: boolean;
  deleteHouseRequestError: THouseDeleteError | false;
};

export type TDeleteHouseModalDispatchProps = {
  deleteHouse: (id: string) => void;
  setDeleteError: (error: THouseDeleteError | false) => void;
};

export type TDeleteHouseModalProps = TDeleteHouseModalStateProps &
  TDeleteHouseModalDispatchProps & {
    houseId: string | false;
    open: boolean;
    onClose: () => void;
  };

export type TDeleteHouseModalHook = {
  deleteId: string | false;
  isModalOpen: boolean;
  handleOpen: (id?: string) => void;
  handleClose: () => void;
};
