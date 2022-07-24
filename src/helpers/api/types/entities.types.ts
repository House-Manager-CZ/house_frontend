import { Point } from "geojson";

export type TApiUserSearchKey = `${number}${number}${number}${number}`;

export type TApiUser = {
  id: number;
  status: "ACTIVE" | "DELETED";
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
  status: "ACTIVE" | "DELETED";
  location: Point;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  owner: TApiUser;
  members: Array<TApiUser>;
};
