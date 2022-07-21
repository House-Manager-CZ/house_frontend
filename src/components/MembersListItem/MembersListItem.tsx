import React from "react";
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Divider,
  Grow,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Theme,
} from "@mui/material";
import { ArrowDropDown, Person } from "@mui/icons-material";
import useMembersListItem from "./useMembersListItem";
import { TMembersListItemProps } from "./MembersListItem.types";

const MembersListItem: React.FC<TMembersListItemProps> = (
  props: TMembersListItemProps
): React.ReactElement => {
  const { member, onRemoveMember } = props;

  const {
    anchorRef,
    isButtonGroupOpened,
    handleToggleButtonClick,
    handleButtonGroupClose,
  } = useMembersListItem();

  return (
    <ListItem disableGutters>
      <ListItemIcon>
        <Person />
      </ListItemIcon>
      <ListItemText
        primary={
          member.first_name && member.last_name
            ? `${member.first_name} ${member.last_name}`
            : member.search_name
        }
        secondary={member.email}
      />
      <ListItemSecondaryAction
        sx={(theme: Theme) => ({
          zIndex: isButtonGroupOpened ? theme.zIndex.tooltip : 10,
        })}
      >
        <ButtonGroup variant={"contained"} ref={anchorRef}>
          <Button>Member</Button>
          <Button size={"small"} onClick={handleToggleButtonClick}>
            <ArrowDropDown />
          </Button>
        </ButtonGroup>
        <Popper
          open={isButtonGroupOpened}
          anchorEl={anchorRef.current}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper elevation={2}>
                <ClickAwayListener onClickAway={handleButtonGroupClose}>
                  <MenuList autoFocusItem>
                    <MenuItem disabled>Admin</MenuItem>
                    <Divider />
                    <MenuItem onClick={() => onRemoveMember(member)}>
                      Delete
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default MembersListItem;
