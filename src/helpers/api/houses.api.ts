import BaseApi from "./base";
import { TApiHouse } from "./types/entities.types";

export default class HousesApi extends BaseApi {
  public async getHouses(): Promise<Array<TApiHouse>> {
    const response = await this.axios.get<Array<TApiHouse>>("/houses");
    return response.data;
  }
}
