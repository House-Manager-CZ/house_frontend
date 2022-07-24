import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Collapse,
  Container,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Abc, Place } from "@mui/icons-material";
import useAddHousePage from "./useAddHousePage";
import {
  TAddHousePageDispatchProps,
  TAddHousePageProps,
  TAddHousePageStateProps,
} from "./AddHousePage.types";
import { TAppDispatch, TRootState } from "../../redux/store";
import { THouseApiCreateData } from "../../helpers/api/houses.api";
import {
  createHouseRequestErrorSelector,
  createHouseRequestLoadingSelector,
  createHouseRequestSuccessSelector,
  runCreateHouseRequest,
} from "../../redux/houses";
import MembersList from "../../components/MembersList/MembersList";
import UsersSearch from "../../components/UsersSearch/UsersSearch";
import { userInfoSelector } from "../../redux/user";

const AddHousePage: React.FC<TAddHousePageProps> = (
  props: TAddHousePageProps
): React.ReactElement => {
  const {
    createHouseRequestLoading,
    createHouseRequestSuccess,
    createHouseRequestError,
  } = props;

  const {
    nameValue,
    locationValue,
    selectedMembers,
    errors,
    handleChange,
    handleMemberAdd,
    handleMemberRemove,
    handleFormSubmit,
  } = useAddHousePage(props);

  const navigate = useNavigate();

  useEffect(() => {
    if (createHouseRequestSuccess) navigate(-1);
  }, [createHouseRequestSuccess, navigate]);

  return (
    <Container sx={{ mt: 2 }}>
      <Stack component={"form"} onSubmit={handleFormSubmit} spacing={3}>
        <Typography variant={"h5"}>Add house</Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label={"Name *"}
            name={"name"}
            placeholder={"My home"}
            value={nameValue}
            onChange={handleChange}
            disabled={createHouseRequestLoading}
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
              endAdornment: createHouseRequestLoading && (
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
            disabled={createHouseRequestLoading}
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
              endAdornment: createHouseRequestLoading && (
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
        <Collapse in={!!createHouseRequestError}>
          <Alert severity={"error"}>
            {createHouseRequestError && (
              <>
                <AlertTitle>{createHouseRequestError.title}</AlertTitle>
                {createHouseRequestError.message}
              </>
            )}
          </Alert>
        </Collapse>
        <Stack direction={"row"}>
          <Box flexGrow={1} />
          <Button
            type={"submit"}
            variant={"contained"}
            disabled={createHouseRequestLoading}
            startIcon={
              createHouseRequestLoading && (
                <CircularProgress color={"inherit"} size={"1em"} />
              )
            }
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

const mapStateToProps = (state: TRootState): TAddHousePageStateProps => ({
  userInfo: userInfoSelector(state),
  createHouseRequestLoading: createHouseRequestLoadingSelector(state),
  createHouseRequestSuccess: createHouseRequestSuccessSelector(state),
  createHouseRequestError: createHouseRequestErrorSelector(state),
});

const mapDispatchToProps = (
  dispatch: TAppDispatch
): TAddHousePageDispatchProps => ({
  runCreateHouse: (data: THouseApiCreateData) =>
    dispatch(runCreateHouseRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddHousePage);
