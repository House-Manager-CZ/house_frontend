import { AxiosInstance } from "axios";
import { TApiUser } from "./types/api.types";

export class UsersApi {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  public async getUsers(): Promise<Array<TApiUser>> {
    const response = await this.axios.get("/users");
    return response.data;
  }
}
