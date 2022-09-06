import { Point } from "geojson";

export enum E_HOUSE_ENTITY_KEYS {
  ID = "id",
  NAME = "name",
  STATUS = "status",
  LOCATION = "location",
  CREATED_AT = "created_at",
  UPDATED_AT = "updated_at",
  DELETED_AT = "deleted_at",
  OWNER = "owner",
  MEMBERS = "members",
}

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
  [E_HOUSE_ENTITY_KEYS.ID]: string;
  [E_HOUSE_ENTITY_KEYS.NAME]: string;
  [E_HOUSE_ENTITY_KEYS.STATUS]: TEntityStatus;
  [E_HOUSE_ENTITY_KEYS.LOCATION]: Point;
  [E_HOUSE_ENTITY_KEYS.CREATED_AT]: string;
  [E_HOUSE_ENTITY_KEYS.UPDATED_AT]: string;
  [E_HOUSE_ENTITY_KEYS.DELETED_AT]: string | null;
  [E_HOUSE_ENTITY_KEYS.OWNER]: TApiUser;
  [E_HOUSE_ENTITY_KEYS.MEMBERS]: Array<TApiUser>;
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
