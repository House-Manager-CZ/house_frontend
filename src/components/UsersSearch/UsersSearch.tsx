import React from "react";
import {
  ClickAwayListener,
  Grow,
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Popper,
  Stack,
  TextField,
} from "@mui/material";
import { connect } from "react-redux";
import { Search } from "@mui/icons-material";
import useUsersSearch from "./useUsersSearch";
import {
  runSearchUsers,
  searchUsersRequestLoading,
  setSearchResults,
  usersSearchResultsSelector,
} from "../../redux/users";
import {
  TUsersSearchDispatchProps,
  TUsersSearchProps,
  TUsersSearchStateProps,
} from "./UsersSearch.types";
import { TApiUser } from "../../helpers/api/types/entities.types";

const UsersSearch: React.FC<TUsersSearchProps> = (
  props: TUsersSearchProps
): React.ReactElement => {
  const { searchResults, searchUsersLoading } = props;

  const {
    dropdownAnchorRef,
    queryValue,
    errors,
    handleChange,
    handleItemClick,
  } = useUsersSearch(props);

  return (
    <Stack>
      <TextField
        ref={dropdownAnchorRef}
        sx={{ flexGrow: 1 }}
        size={"small"}
        label={"Search members"}
        name={"query"}
        placeholder={"user#0000"}
        value={queryValue}
        onChange={handleChange}
        autoComplete={"off"}
        error={!!errors.query}
        color={errors.query ? "error" : "primary"}
        helperText={errors.query}
        InputProps={{
          inputProps: {
            autoCapitalize: "off",
            autoCorrect: "off",
            spellCheck: "false",
            inputMode: "search",
          },
          startAdornment: (
            <InputAdornment position={"start"}>
              <Search />
            </InputAdornment>
          ),
        }}
      />
      <Popper
        open={!!searchResults.length && !!queryValue && !searchUsersLoading}
        anchorEl={dropdownAnchorRef.current}
        transition
        disablePortal
        sx={(theme) => ({
          width: dropdownAnchorRef.current?.clientWidth,
          zIndex: theme.zIndex.tooltip,
        })}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper elevation={2} sx={{ width: "100%", mt: 1 }}>
              <ClickAwayListener onClickAway={() => {}}>
                <List>
                  {searchResults.map((searchUser: TApiUser) => (
                    <ListItemButton
                      key={searchUser.id}
                      onClick={() => handleItemClick(searchUser)}
                    >
                      <ListItemText
                        primary={
                          searchUser.first_name && searchUser.last_name
                            ? `${searchUser.first_name} ${searchUser.last_name}`
                            : searchUser.search_name
                        }
                        secondary={searchUser.email}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Stack>
  );
};

const mapStateToProps = (state: any): TUsersSearchStateProps => ({
  searchResults: usersSearchResultsSelector(state),
  searchUsersLoading: searchUsersRequestLoading(state),
});

const mapDispatchToProps = (dispatch: any): TUsersSearchDispatchProps => ({
  runSearchUsers: (query: string) => dispatch(runSearchUsers(query)),
  setSearchResults: (results: Array<TApiUser>) =>
    dispatch(setSearchResults(results)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersSearch);
