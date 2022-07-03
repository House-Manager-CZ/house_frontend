import { AxiosResponse } from "axios";
import { TApiLoginResponse } from "./types/api.types";
import BaseApi from "./base";

export type TLoginRequestData = {
  email: string;
  password: string;
};

export type TRegisterRequestData = TLoginRequestData;

export default class AuthApi extends BaseApi {
  public async login(data: TLoginRequestData): Promise<TApiLoginResponse> {
    const response = await this.axios.post<
      TApiLoginResponse,
      AxiosResponse<TApiLoginResponse>,
      TLoginRequestData
    >("/auth/login", data);
    return response.data;
  }

  public async refresh(): Promise<TApiLoginResponse> {
    const response = await this.axios.post("/auth/refresh");
    return response.data;
  }

  public async register(
    data: TRegisterRequestData
  ): Promise<TApiLoginResponse> {
    const response = await this.axios.post<
      TApiLoginResponse,
      AxiosResponse<TApiLoginResponse>,
      TRegisterRequestData
    >("/auth/register", data);
    return response.data;
  }
}
