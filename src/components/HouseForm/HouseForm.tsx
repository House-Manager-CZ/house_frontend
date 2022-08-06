import React from "react";
import { connect } from "react-redux";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Collapse,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Abc, Place } from "@mui/icons-material";
import {
  THouseFormDispatchProps,
  THouseFormProps,
  THouseFormStateProps,
} from "./HouseForm.types";
import useHouseForm from "./useHouseForm";
import { TAppDispatch, TRootState } from "../../redux/store";
import {
  createHouseRequestErrorSelector,
  createHouseRequestLoadingSelector,
  createHouseRequestSuccessSelector,
  editHouseRequestErrorSelector,
  editHouseRequestLoadingSelector,
  editHouseRequestSuccessSelector,
  housesSelector,
  runCreateHouseRequest,
  runEditHouseRequest,
} from "../../redux/houses";
import { userInfoSelector } from "../../redux/user";
import {
  THouseApiCreateData,
  THouseApiEditData,
} from "../../helpers/api/houses.api";
import UsersSearch from "../UsersSearch/UsersSearch";
import MembersList from "../MembersList/MembersList";

const HouseForm: React.FC<THouseFormProps> = (
  props: THouseFormProps
): React.ReactElement => {
  const {
    mode,
    createHouseRequestLoading,
    createHouseRequestError,
    editHouseRequestLoading,
    editHouseRequestError,
  } = props;

  const {
    nameValue,
    locationValue,
    selectedMembers,
    errors,
    handleChange,
    handleMemberAdd,
    handleMemberRemove,
    handleCancelClick,
    handleFormSubmit,
  } = useHouseForm(props);

  return (
    <Stack component={"form"} onSubmit={handleFormSubmit} spacing={3}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          label={"Name *"}
          name={"name"}
          placeholder={"My home"}
          value={nameValue}
          onChange={handleChange}
          disabled={
            (mode === "add" && createHouseRequestLoading) ||
            (mode === "edit" && editHouseRequestLoading)
          }
          fullWidth
          error={!!errors.name}
          color={errors.name ? "error" : "primary"}
          helperText={errors.name}
          InputProps={{
            startAdornment: (
              <InputAdornment position={"start"}>
                <Abc />
              </InputAdornment>
            ),
            endAdornment: ((mode === "add" && createHouseRequestLoading) ||
              (mode === "edit" && editHouseRequestLoading)) && (
              <InputAdornment position={"end"}>
                <CircularProgress size={"1.5em"} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label={"Location *"}
          name={"location"}
          placeholder={"-34(.397) 150(.644)"}
          value={locationValue}
          onChange={handleChange}
          disabled={
            (mode === "add" && createHouseRequestLoading) ||
            (mode === "edit" && editHouseRequestLoading)
          }
          fullWidth
          error={!!errors.location}
          color={errors.location ? "error" : "primary"}
          helperText={errors.location}
          InputProps={{
            startAdornment: (
              <InputAdornment position={"start"}>
                <Place />
              </InputAdornment>
            ),
            endAdornment: ((mode === "add" && createHouseRequestLoading) ||
              (mode === "edit" && editHouseRequestLoading)) && (
              <InputAdornment position={"end"}>
                <CircularProgress size={"1.5em"} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <UsersSearch onUserAdd={handleMemberAdd} />
      {selectedMembers.length > 0 && (
        <Stack>
          <Typography variant={"body1"}>Members</Typography>
          <MembersList
            members={selectedMembers}
            onRemoveMember={handleMemberRemove}
          />
        </Stack>
      )}
      <Collapse
        in={
          (mode === "add" && !!createHouseRequestError) ||
          (mode === "edit" && !!editHouseRequestError)
        }
      >
        <Alert severity={"error"}>
          {createHouseRequestError && (
            <>
              <AlertTitle>{createHouseRequestError.title}</AlertTitle>
              {createHouseRequestError.message}
            </>
          )}
          {editHouseRequestError && (
            <>
              <AlertTitle>{editHouseRequestError.title}</AlertTitle>
              {editHouseRequestError.message}
            </>
          )}
        </Alert>
      </Collapse>
      <Stack direction={"row"}>
        <Box flexGrow={1} />
        <Stack direction={"row"} spacing={1}>
          {mode === "edit" && (
            <Button variant={"text"} onClick={handleCancelClick}>
              Cancel
            </Button>
          )}
          <Button
            type={"submit"}
            variant={"contained"}
            disabled={
              (mode === "add" && createHouseRequestLoading) ||
              (mode === "edit" && editHouseRequestLoading)
            }
            startIcon={
              ((mode === "add" && createHouseRequestLoading) ||
                (mode === "edit" && editHouseRequestLoading)) && (
                <CircularProgress color={"inherit"} size={"1em"} />
              )
            }
          >
            {mode === "edit" ? "Apply" : "Create"}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

const mapStateToProps = (state: TRootState): THouseFormStateProps => ({
  userInfo: userInfoSelector(state),
  houses: housesSelector(state),
  createHouseRequestLoading: createHouseRequestLoadingSelector(state),
  createHouseRequestSuccess: createHouseRequestSuccessSelector(state),
  createHouseRequestError: createHouseRequestErrorSelector(state),
  editHouseRequestLoading: editHouseRequestLoadingSelector(state),
  editHouseRequestSuccess: editHouseRequestSuccessSelector(state),
  editHouseRequestError: editHouseRequestErrorSelector(state),
});

const mapDispatchToProps = (
  dispatch: TAppDispatch
): THouseFormDispatchProps => ({
  runCreateHouse: (data: THouseApiCreateData) =>
    dispatch(runCreateHouseRequest(data)),
  runEditHouse: (id: string, data: THouseApiEditData) =>
    dispatch(
      runEditHouseRequest({
        id,
        data,
      })
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(HouseForm);
