import React from "react";
import {
  Button,
  Checkbox,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import {
  E_MEMBERS_LIST_ACTIONS,
  E_MEMBERS_LIST_FORM_FIELDS,
  TMembersListProps,
} from "./MembersTable.types";
import MembersTableItem from "../MembersTableItem/MembersTableItem";
import { MembersTableBody } from "./MembersTable.styled";
import useMembersTable from "./useMembersTable";
import { E_HOUSE_ENTITY_KEYS } from "../../../helpers/api/types/entities.types";

const MembersTable: React.FC<TMembersListProps> = (
  props: TMembersListProps
): React.ReactElement => {
  const { selectedHouse, selectable, actions } = props;

  const {
    selectedButtonRef,
    selectedMenuOpen,
    selectedMembers,
    handleChange,
    handleAllCheckboxChange,
    handleSelectedMenuButtonClick,
    handleSelectedMenuClose,
  } = useMembersTable(props);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!selectedHouse) return <></>;

  return (
    <>
      <TableContainer component={Paper} variant={"outlined"}>
        <Table size={"small"}>
          <TableHead>
            <TableRow>
              {selectable ? (
                <TableCell>
                  <Checkbox
                    name={E_MEMBERS_LIST_FORM_FIELDS.SELECTED_MEMBERS}
                    checked={
                      selectedMembers.length ===
                      selectedHouse[E_HOUSE_ENTITY_KEYS.MEMBERS].length
                    }
                    indeterminate={
                      selectedMembers.length > 0 &&
                      selectedMembers.length <
                        selectedHouse[E_HOUSE_ENTITY_KEYS.MEMBERS].length
                    }
                    onChange={handleAllCheckboxChange}
                  />
                </TableCell>
              ) : null}
              <TableCell width={"100%"}>
                {selectedMembers.length ? (
                  <Button
                    variant={"outlined"}
                    size={"small"}
                    ref={selectedButtonRef}
                    onClick={handleSelectedMenuButtonClick}
                    endIcon={<ArrowDropDown />}
                  >
                    {selectedMembers.length} member
                    {selectedMembers.length > 1 ? "s" : ""} selected
                  </Button>
                ) : (
                  "Members"
                )}
              </TableCell>
              {actions && actions.length ? <TableCell /> : null}
            </TableRow>
          </TableHead>
          <MembersTableBody>
            {selectedHouse.members.map((member) => (
              <MembersTableItem
                key={member.id}
                member={member}
                selectable={selectable}
                selected={selectedMembers.includes(`${member.id}`)}
                actions={actions}
                handleCheckboxChange={handleChange}
              />
            ))}
          </MembersTableBody>
        </Table>
      </TableContainer>
      {actions?.length ? (
        <Menu
          sx={{ mt: 0.5 }}
          open={selectedMenuOpen}
          anchorEl={selectedButtonRef.current}
          onClose={handleSelectedMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          MenuListProps={{
            dense: true,
          }}
        >
          {actions.includes(E_MEMBERS_LIST_ACTIONS.REMOVE_MEMBER) ? (
            <MenuItem>Remove</MenuItem>
          ) : null}
        </Menu>
      ) : null}
    </>
  );
};

export default MembersTable;
