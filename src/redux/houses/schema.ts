import { THousesSchema } from "./types/houses.schema";

export const HousesSchema: THousesSchema = {
  houses: [],
  selectedHouseId: false,
  getHousesRequestStarted: false,
  getHousesRequestFinished: false,
  getHousesRequestError: "",
};
