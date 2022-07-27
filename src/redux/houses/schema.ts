import { THousesSchema } from "./types/houses.schema";

export const HousesSchema: THousesSchema = {
  houses: [],
  selectedHouseId: false,
  getHousesRequestStarted: false,
  getHousesRequestFinished: false,
  getHousesRequestError: "",
  createHouseRequestStarted: false,
  createHouseRequestFinished: false,
  createHouseRequestError: false,
  deleteHouseRequestStarted: false,
  deleteHouseRequestFinished: false,
  deleteHouseRequestError: false,
};
