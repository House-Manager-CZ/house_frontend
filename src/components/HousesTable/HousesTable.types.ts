import { TApiHouse } from "../../helpers/api/types/entities.types";

export type THousesTableStateProps = {
  houses: Array<TApiHouse>;
  selectedHouseId: string | false;
  housesLoading: boolean;
};

export type THousesTableDispatchProps = {
  fetchHouses: () => void;
  setSelectedHouseId: (id: string) => void;
};

export enum HOUSE_TABLE_ACTIONS {
  OPEN = "open",
  ADD = "add",
  EDIT = "edit",
  DELETE = "delete",
  REFRESH = "refresh",
  SELECT = "select",
}

export type THousesTableProps = THousesTableStateProps &
  THousesTableDispatchProps & {
    actions: Partial<Record<HOUSE_TABLE_ACTIONS, boolean>>;
  };

export type THousesTableHook = {
  handleRefreshClick: () => void;
  handleSelectHouseClick: (id: string) => void;
};
