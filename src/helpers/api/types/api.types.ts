export type TApiUser = {
  id: number;
  status: "ACTIVE" | "DELETED";
  email: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type TApiLoginResponse = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};
