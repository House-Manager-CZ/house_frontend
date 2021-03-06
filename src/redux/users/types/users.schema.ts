import { TApiUser } from "../../../helpers/api/types/entities.types";

export type TUsersSearchError = {
  title: string;
  message: string;
};

export type TUsersSchema = {
  searchResults: Array<TApiUser>;
  searchUsersRequestStarted: boolean;
  searchUsersRequestFinished: boolean;
  searchUsersRequestError: TUsersSearchError | false;
};
