import { Point } from "geojson";

export type TEntityStatus = "ACTIVE" | "DELETED";

export type TApiUserSearchKey = `${number}${number}${number}${number}`;

export type TApiUser = {
  id: number;
  status: TEntityStatus;
  status_key: TApiUserSearchKey;
  search_name: `${string}#${TApiUserSearchKey}`;
  username: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type TApiHouse = {
  id: string;
  name: string;
  status: TEntityStatus;
  location: Point;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  owner: TApiUser;
  members: Array<TApiUser>;
};

export type TApiEvent = {
  id: string;
  status: TEntityStatus;
  name: string;
  house: TApiHouse;
  holding_at: string;
  owner: TApiUser;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};
