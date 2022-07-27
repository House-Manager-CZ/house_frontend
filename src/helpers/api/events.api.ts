import { AxiosResponse } from "axios";
import BaseApi from "./base";
import { TApiEvent } from "./types/entities.types";

export type TEventsApiGetDirection = "upcoming" | "finished";

export type TEventsApiGetParams = {
  owner?: number;
  house?: string;
  direction?: TEventsApiGetDirection;
};

export default class EventsApi extends BaseApi {
  public async getEvents(
    params?: TEventsApiGetParams
  ): Promise<Array<TApiEvent>> {
    const response = await this.axios.get<
      Array<TApiEvent>,
      AxiosResponse<Array<TApiEvent>>,
      null
    >("/events", {
      params,
    });

    return response.data;
  }
}
