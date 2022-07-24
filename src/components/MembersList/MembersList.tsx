import React from "react";
import { List, Typography } from "@mui/material";
import MembersListItem from "../MembersListItem/MembersListItem";
import { TMembersListProps } from "./MembersList.types";
import { TApiUser } from "../../helpers/api/types/entities.types";

const MembersList: React.FC<TMembersListProps> = (
  props: TMembersListProps
): React.ReactElement => {
  const { members, onRemoveMember } = props;

  if (members.length === 0)
    return (
      <Typography variant={"h6"} sx={{ mt: 2 }}>
        No members
      </Typography>
    );

  return (
    <List dense>
      {members.map((member: TApiUser) => (
        <MembersListItem
          key={member.id}
          member={member}
          onRemoveMember={onRemoveMember}
        />
      ))}
    </List>
  );
};

export default MembersList;
