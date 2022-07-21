import { TApiUser } from "../../../helpers/api/types/entities.types";

export type TUsersSchema = {
  searchResults: Array<TApiUser>;
  searchUsersRequestStarted: boolean;
  searchUsersRequestFinished: boolean;
  searchUsersRequestError: string;
};
