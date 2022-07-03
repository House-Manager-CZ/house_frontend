import { TUserSchema } from "./types/user.schema";

export const UserSchema: TUserSchema = {
  accessToken: false,
  refreshToken: false,
  expires: false,
  loginRequestStarted: false,
  loginRequestFinished: false,
  loginRequestError: "",
  refreshRequestStarted: false,
  refreshRequestFinished: false,
  refreshRequestError: "",
};
