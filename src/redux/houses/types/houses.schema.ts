import { TApiHouse } from "../../../helpers/api/types/entities.types";

export type THouseCreateError = {
  title: string;
  message: string;
};

export type THouseEditError = {
  title: string;
  message: string;
};

export type THouseDeleteError = {
  title: string;
  message: string;
};

export type THousesSchema = {
  houses: Array<TApiHouse>;
  selectedHouseId: string | false;
  getHousesRequestStarted: boolean;
  getHousesRequestFinished: boolean;
  getHousesRequestError: string;
  createHouseRequestStarted: boolean;
  createHouseRequestFinished: boolean;
  createHouseRequestError: THouseCreateError | false;
  editHouseRequestStarted: boolean;
  editHouseRequestFinished: boolean;
  editHouseRequestError: THouseEditError | false;
  deleteHouseRequestStarted: boolean;
  deleteHouseRequestFinished: boolean;
  deleteHouseRequestError: THouseDeleteError | false;
};
