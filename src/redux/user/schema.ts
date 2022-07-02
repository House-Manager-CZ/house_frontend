import { TUserSchema } from "./types/user.schema";

export const UserSchema: TUserSchema = {
  accessToken: false,
  refreshToken: false,
  loginRequestStarted: false,
  loginRequestFinished: false,
  loginRequestError: "",
};
