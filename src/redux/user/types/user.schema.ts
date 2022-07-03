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
  registerRequestStarted: boolean;
  registerRequestFinished: boolean;
  registerRequestError: string;
};

export type TFetchLoginAction = {
  email: string;
  password: string;
};

export type TFetchRegisterAction = TFetchLoginAction;
