import { TApiLoginResponse } from "./types/api.types";
import BaseApi from "./base";

export type TAuthData = {
  email: string;
  password: string;
};

export default class AuthApi extends BaseApi {
  public async login(data: TAuthData): Promise<TApiLoginResponse> {
    const response = await this.axios.post("/auth/login", data);
    return response.data;
  }

  public async refresh(): Promise<TApiLoginResponse> {
    const response = await this.axios.post("/auth/refresh");
    return response.data;
  }
}
