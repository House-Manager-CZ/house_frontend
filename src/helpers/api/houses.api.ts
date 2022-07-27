import { AxiosResponse } from "axios";
import BaseApi from "./base";
import { TApiHouse } from "./types/entities.types";

export type THouseApiCreateData = {
  name: string;
  location: string;
  members: Array<number>;
};

export default class HousesApi extends BaseApi {
  public async getHouses(): Promise<Array<TApiHouse>> {
    const response = await this.axios.get<Array<TApiHouse>>("/houses");
    return response.data;
  }

  public async createHouse(data: THouseApiCreateData): Promise<TApiHouse> {
    const response = await this.axios.post<
      TApiHouse,
      AxiosResponse<TApiHouse>,
      THouseApiCreateData
    >("/houses", data);

    return response.data;
  }

  public async deleteHouse(id: string): Promise<void> {
    const response = await this.axios.delete<void>(`/houses/${id}`);

    return response.data;
  }
}
