import axios, { AxiosInstance } from "axios";
import AuthApi from "./auth.api";

export default class Api {
  private static instance: Api;

  private readonly authApi: AuthApi;

  private readonly axios: AxiosInstance;

  private constructor() {
    if (!process.env.REACT_APP_API_URL)
      throw new Error("REACT_APP_API_URL is not defined");

    this.axios = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });

    this.authApi = new AuthApi(this.axios);
  }

  public static getInstance(): Api {
    if (!Api.instance) Api.instance = new Api();
    return Api.instance;
  }

  public get auth(): AuthApi {
    return this.authApi;
  }
}
