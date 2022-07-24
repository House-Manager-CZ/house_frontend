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
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { ArrowDropDown, Person } from "@mui/icons-material";
import { connect } from "react-redux";
import useMembersListItem from "./useMembersListItem";
import {
  TMembersListItemProps,
  TMembersListItemStateProps,
} from "./MembersListItem.types";
import { TRootState } from "../../redux/store";
import { userInfoSelector } from "../../redux/user";

const MembersListItem: React.FC<TMembersListItemProps> = (
  props: TMembersListItemProps
): React.ReactElement => {
  const { userInfo, member } = props;

  const {
    anchorRef,
    isButtonGroupOpened,
    handleToggleButtonClick,
    handleButtonGroupClose,
    handleDeleteButtonClick,
  } = useMembersListItem(props);

  const smDownBreakpoint = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  return (
    <ListItem disableGutters>
      {!smDownBreakpoint && (
        <ListItemIcon>
          <Person />
        </ListItemIcon>
      )}
      <ListItemText
        primary={
          member.first_name && member.last_name
            ? `${member.first_name} ${member.last_name}`
            : member.search_name
        }
        secondary={
          member.first_name && member.last_name
            ? member.search_name
            : member.email
        }
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
          sx={{ width: anchorRef.current?.clientWidth }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper
                elevation={2}
                sx={{
                  mt: 1,
                }}
              >
                <ClickAwayListener onClickAway={handleButtonGroupClose}>
                  <MenuList autoFocusItem dense>
                    <MenuItem disabled>
                      <ListItemText>Admin</ListItemText>
                    </MenuItem>
                    <Divider />
                    {userInfo && userInfo.id === member.id ? (
                      <Tooltip title={"You cannot delete yourself"}>
                        <MenuItem disabled style={{ pointerEvents: "auto" }}>
                          <ListItemText>Delete</ListItemText>
                        </MenuItem>
                      </Tooltip>
                    ) : (
                      <MenuItem onClick={handleDeleteButtonClick}>
                        <ListItemText>Delete</ListItemText>
                      </MenuItem>
                    )}
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

const mapStateToProps = (state: TRootState): TMembersListItemStateProps => ({
  userInfo: userInfoSelector(state),
});

export default connect(mapStateToProps)(MembersListItem);
