import { isNull, isNumber, isString } from "lodash";
import { TApiUser } from "../api/types/entities.types";
import { isEmail } from "../lang/is-email";

export const checkUserData = (user: TApiUser): boolean => {
  const { id, email, status, created_at, updated_at, deleted_at } = user;

  return (
    isNumber(id) &&
    isEmail(email) &&
    (status === "ACTIVE" || status === "DELETED") &&
    isString(created_at) &&
    isString(updated_at) &&
    (isString(deleted_at) || isNull(deleted_at))
  );
};
