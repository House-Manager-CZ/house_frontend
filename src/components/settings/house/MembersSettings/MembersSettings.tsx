import React from "react";
import { Box } from "@mui/material";
import { TMembersSettingsProps } from "./MembersSettings.types";
import useMembersSettings from "./useMembersSettings";
import MembersList from "../../../members/MembersTable";
import { E_MEMBERS_LIST_ACTIONS } from "../../../members/MembersTable/MembersTable.types";

const MembersSettings: React.FC<TMembersSettingsProps> = (
  props: TMembersSettingsProps
): React.ReactElement => {
  const { selectedHouse } = props;

  // eslint-disable-next-line no-empty-pattern
  const {} = useMembersSettings(props);

  return (
    <Box>
      <MembersList
        selectable
        actions={[E_MEMBERS_LIST_ACTIONS.REMOVE_MEMBER]}
      />
    </Box>
  );
};

export default MembersSettings;
