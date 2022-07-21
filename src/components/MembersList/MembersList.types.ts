import { TApiUser } from "../../helpers/api/types/entities.types";

export type TMembersListProps = {
  members: Array<TApiUser>;
  onRemoveMember: (member: TApiUser) => void;
};
