export type TUserSchema = {
  accessToken: string | false;
  refreshToken: string | false;
  loginRequestStarted: boolean;
  loginRequestFinished: boolean;
  loginRequestError: string;
};

export type TFetchLoginAction = {
  email: string;
  password: string;
};
