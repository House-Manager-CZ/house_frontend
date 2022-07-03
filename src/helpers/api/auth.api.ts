import { AxiosInstance } from "axios";
import { TApiLoginResponse } from "./types/api.types";

export type TAuthData = {
  email: string;
  password: string;
};

export default class AuthApi {
  private readonly axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  public async login(data: TAuthData): Promise<TApiLoginResponse> {
    const response = await this.axios.post("/auth/login", data);
    return response.data;
  }

  public async refresh(): Promise<TApiLoginResponse> {
    const response = await this.axios.post("/auth/refresh");
    return response.data;
  }
}
