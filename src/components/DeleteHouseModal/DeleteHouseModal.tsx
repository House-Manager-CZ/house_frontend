import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { TAppDispatch, TRootState } from "../../redux/store";
import {
  TDeleteHouseModalDispatchProps,
  TDeleteHouseModalProps,
  TDeleteHouseModalStateProps,
} from "./DeleteHouseModal.types";
import {
  deleteHouseRequestErrorSelector,
  deleteHouseRequestLoadingSelector,
  deleteHouseRequestSuccessSelector,
  housesSelector,
  runDeleteHouseRequest,
  setDeleteHouseRequestError,
} from "../../redux/houses";
import { TApiHouse } from "../../helpers/api/types/entities.types";
import { THouseDeleteError } from "../../redux/houses/types/houses.schema";

const DeleteHouseModal: React.FC<TDeleteHouseModalProps> = (
  props: TDeleteHouseModalProps
): React.ReactElement => {
  const {
    houses,
    houseId,
    open,
    onClose,
    deleteHouse,
    setDeleteError,
    deleteHouseRequestLoading,
    deleteHouseRequestSuccess,
    deleteHouseRequestError,
  } = props;

  const [selectedHouse, setSelectedHouse] = React.useState<TApiHouse | false>(
    false
  );
  const [houseName, setHouseName] = React.useState<string>("");

  useEffect(() => {
    if (houseId) {
      setSelectedHouse(houses.find((house) => house.id === houseId) || false);
    }
  }, [houseId, houses]);

  const handleClose = useCallback(() => {
    onClose();
    setDeleteError(false);
    setHouseName("");
  }, [onClose, setDeleteError]);

  const handleHouseNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setHouseName(event.target.value);
    },
    []
  );

  useEffect(() => {
    if (deleteHouseRequestSuccess) {
      handleClose();
    }
  }, [deleteHouseRequestSuccess, handleClose]);

  if (!selectedHouse)
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>No house selected</DialogTitle>
      </Dialog>
    );

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Deleting {selectedHouse.name}</DialogTitle>
      <DialogContent>
        <Stack direction={"column"} spacing={2}>
          <DialogContentText>
            Are you sure you want to delete {selectedHouse.name}?
            <br />
            This action cannot be undone.
            <br />
            <br />
            To confirm type the house name below.
          </DialogContentText>
          <TextField
            variant={"standard"}
            value={houseName}
            onChange={handleHouseNameChange}
            label={"House name"}
            placeholder={"House name"}
            fullWidth
            disabled={deleteHouseRequestLoading}
            error={!!deleteHouseRequestError}
            helperText={
              deleteHouseRequestError &&
              `${deleteHouseRequestError.title}
              (${deleteHouseRequestError.message})`
            }
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={deleteHouseRequestLoading}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            if (houseId) deleteHouse(houseId);
          }}
          color={"error"}
          disabled={
            selectedHouse.name !== houseName || deleteHouseRequestLoading
          }
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = (state: TRootState): TDeleteHouseModalStateProps => ({
  houses: housesSelector(state),
  deleteHouseRequestLoading: deleteHouseRequestLoadingSelector(state),
  deleteHouseRequestSuccess: deleteHouseRequestSuccessSelector(state),
  deleteHouseRequestError: deleteHouseRequestErrorSelector(state),
});

const mapDispatchToProps = (
  dispatch: TAppDispatch
): TDeleteHouseModalDispatchProps => ({
  deleteHouse: (houseId: string) => dispatch(runDeleteHouseRequest(houseId)),
  setDeleteError: (error: THouseDeleteError | false) =>
    dispatch(setDeleteHouseRequestError(error)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteHouseModal);
