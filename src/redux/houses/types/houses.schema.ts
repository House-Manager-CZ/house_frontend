import { TApiHouse } from "../../../helpers/api/types/entities.types";

export type THousesSchema = {
  houses: Array<TApiHouse>;
  getHousesRequestStarted: boolean;
  getHousesRequestFinished: boolean;
  getHousesRequestError: string;
};
