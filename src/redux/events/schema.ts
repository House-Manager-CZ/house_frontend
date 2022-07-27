import { TEventsSchema } from "./types/events.types";

export const EventsSchema: TEventsSchema = {
  events: [],
  getEventsRequestStarted: false,
  getEventsRequestFinished: false,
  getEventsRequestError: false,
};
