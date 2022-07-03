import { Point } from "geojson";

export type TApiUser = {
  id: number;
  status: "ACTIVE" | "DELETED";
  email: string;
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
