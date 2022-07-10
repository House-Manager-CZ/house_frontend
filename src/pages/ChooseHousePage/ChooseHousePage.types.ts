import { TApiHouse } from "../../helpers/api/types/entities.types";

export type TChooseHousePageStateProps = {
  houses: Array<TApiHouse>;
  selectedHouseId: string | false;
  housesLoading: boolean;
};

export type TChooseHousePageDispatchProps = {
  fetchHouses: () => void;
  setSelectedHouseId: (id: string) => void;
};

export type TChooseHousePageProps = TChooseHousePageStateProps &
  TChooseHousePageDispatchProps;

export type TChooseHousePageHook = {
  handleRefreshClick: () => void;
  handleSelectHouseClick: (id: string) => void;
};
