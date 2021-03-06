import { TApiUser } from "./types/entities.types";
import BaseApi from "./base";

export class UsersApi extends BaseApi {
  public async getMe(): Promise<TApiUser> {
    const response = await this.axios.get("/users/me");
    return response.data;
  }

  public async getUsers(): Promise<Array<TApiUser>> {
    const response = await this.axios.get("/users");
    return response.data;
  }

  public async searchUsers(query: string): Promise<Array<TApiUser>> {
    const response = await this.axios.get(
      `/users/?q=${encodeURIComponent(query)}`
    );
    return response.data;
  }
}
