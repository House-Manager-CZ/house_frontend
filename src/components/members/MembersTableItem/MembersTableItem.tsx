import React from "react";
import {
  Button,
  Checkbox,
  Menu,
  MenuItem,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import { TMembersTableItemProps } from "./MembersTableItem.types";
import useMembersTableItem from "./useMembersTableItem";
import {
  E_MEMBERS_LIST_ACTIONS,
  E_MEMBERS_LIST_FORM_FIELDS,
} from "../MembersTable/MembersTable.types";

const MembersTableItem: React.FC<TMembersTableItemProps> = (
  props: TMembersTableItemProps
): React.ReactElement => {
  const { member, selectable, selected, actions, handleCheckboxChange } = props;

  const {
    menuAnchorRef,
    menuOpen,
    handleListItemButtonClick,
    handleMenuClose,
  } = useMembersTableItem(props);

  return (
    <>
      <TableRow>
        {selectable ? (
          <TableCell>
            <Checkbox
              name={E_MEMBERS_LIST_FORM_FIELDS.SELECTED_MEMBERS}
              onChange={handleCheckboxChange}
              value={member.id}
              checked={selected}
            />
          </TableCell>
        ) : null}
        <TableCell>
          <Stack direction={"column"} spacing={0.5}>
            <Typography variant={"body1"}>
              {member.first_name && member.last_name
                ? `${member.first_name} ${member.last_name}`
                : member.username}
            </Typography>
            <Typography variant={"subtitle2"} color={"text.secondary"}>
              {member.first_name && member.last_name
                ? member.username
                : member.email}
            </Typography>
          </Stack>
        </TableCell>
        {actions && actions.length ? (
          <TableCell>
            <Button
              ref={menuAnchorRef}
              variant={"outlined"}
              endIcon={<ArrowDropDown />}
              onClick={handleListItemButtonClick}
            >
              Settings
            </Button>
          </TableCell>
        ) : null}
      </TableRow>
      {actions && actions.length ? (
        <Menu
          sx={{ mt: 1 }}
          open={menuOpen}
          anchorEl={menuAnchorRef.current}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          MenuListProps={{
            dense: true,
          }}
        >
          {actions.includes(E_MEMBERS_LIST_ACTIONS.CHANGE_ROLE) ? (
            <MenuItem disabled>Change Role</MenuItem>
          ) : null}
          {actions.includes(E_MEMBERS_LIST_ACTIONS.REMOVE_MEMBER) ? (
            <MenuItem>Remove</MenuItem>
          ) : null}
        </Menu>
      ) : null}
    </>
  );
};

export default MembersTableItem;
