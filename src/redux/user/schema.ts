import { TUserSchema } from "./types/user.schema";

export const UserSchema: TUserSchema = {
  accessToken: false,
  refreshToken: false,
  expires: false,
  userInfo: false,
  loginRequestStarted: false,
  loginRequestFinished: false,
  loginRequestError: "",
  refreshRequestStarted: false,
  refreshRequestFinished: false,
  refreshRequestError: "",
  registerRequestStarted: false,
  registerRequestFinished: false,
  registerRequestError: "",
  getMeInfoRequestStarted: false,
  getMeInfoRequestFinished: false,
  getMeInfoRequestError: "",
};
