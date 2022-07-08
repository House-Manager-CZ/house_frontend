import { TApiUser } from "../../../helpers/api/types/entities.types";

export type TUserSchema = {
  accessToken: string | false;
  refreshToken: string | false;
  expires: number | false;
  userInfo: TApiUser | false;
  loginRequestStarted: boolean;
  loginRequestFinished: boolean;
  loginRequestError: string;
  refreshRequestStarted: boolean;
  refreshRequestFinished: boolean;
  refreshRequestError: string;
  registerRequestStarted: boolean;
  registerRequestFinished: boolean;
  registerRequestError: string;
  getMeInfoRequestStarted: boolean;
  getMeInfoRequestFinished: boolean;
  getMeInfoRequestError: string;
};

export type TFetchLoginAction = {
  email: string;
  password: string;
};

export type TFetchRegisterAction = TFetchLoginAction;
