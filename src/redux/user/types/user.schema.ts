export type TUserSchema = {
  accessToken: string | false;
  refreshToken: string | false;
  expires: number | false;
  loginRequestStarted: boolean;
  loginRequestFinished: boolean;
  loginRequestError: string;
  refreshRequestStarted: boolean;
  refreshRequestFinished: boolean;
  refreshRequestError: string;
};

export type TFetchLoginAction = {
  email: string;
  password: string;
};
