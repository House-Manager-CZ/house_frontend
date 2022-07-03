import { AxiosInstance } from "axios";

export default class BaseApi {
  protected axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }
}
