export type TApiError = {
  errors: Array<Record<string, string>>;
  error: string;
  message: string;
  statusCode: number;
};
