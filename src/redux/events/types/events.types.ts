import { TApiEvent } from "../../../helpers/api/types/entities.types";

export type TGetEventsError = {
  title: string;
  message: string;
};

export type TEventsSchema = {
  events: Array<TApiEvent>;
  getEventsRequestStarted: boolean;
  getEventsRequestFinished: boolean;
  getEventsRequestError: TGetEventsError | false;
};
