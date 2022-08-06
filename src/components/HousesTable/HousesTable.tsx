import React from "react";
import { connect } from "react-redux";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Add, Refresh } from "@mui/icons-material";
import ButtonLink from "../../ui/ButtonLink/ButtonLink";
import { APP_ROUTES } from "../../helpers/routing";
import useHousesTable from "./useHousesTable";
import { TAppDispatch, TRootState } from "../../redux/store";
import {
  HOUSE_TABLE_ACTIONS,
  THousesTableDispatchProps,
  THousesTableProps,
  THousesTableStateProps,
} from "./HousesTable.types";
import {
  getHousesRequestLoadingSelector,
  housesSelector,
  runGetHousesRequest,
  selectedHouseIdSelector,
  setSelectedHouseId,
} from "../../redux/houses";
import { TApiHouse } from "../../helpers/api/types/entities.types";
import DeleteHouseModal from "../DeleteHouseModal/DeleteHouseModal";
import useDeleteHouseModal from "../DeleteHouseModal/useDeleteHouseModal";

const HousesTable: React.FC<THousesTableProps> = (
  props: THousesTableProps
): React.ReactElement => {
  const { actions, houses, selectedHouseId, housesLoading } = props;

  const { handleRefreshClick, handleSelectHouseClick } = useHousesTable(props);

  const {
    deleteId: deleteHouseId,
    isModalOpen: isDeleteModalOpen,
    handleOpen: handleDeleteModalOpen,
    handleClose: handleDeleteModalClose,
  } = useDeleteHouseModal();

  return (
    <>
      <Stack direction={"row"} sx={{ mb: 2 }}>
        {actions[HOUSE_TABLE_ACTIONS.REFRESH] && (
          <Button startIcon={<Refresh />} onClick={handleRefreshClick}>
            Refresh
          </Button>
        )}
        <Box flexGrow={1} />
        {actions[HOUSE_TABLE_ACTIONS.ADD] && (
          <ButtonLink
            to={APP_ROUTES.ADD_HOUSE}
            variant={"contained"}
            disableElevation
            startIcon={<Add />}
          >
            Add house
          </ButtonLink>
        )}
      </Stack>
      {housesLoading ? (
        <Paper sx={{ p: 2 }}>
          <Stack alignItems={"center"}>
            <CircularProgress />
          </Stack>
        </Paper>
      ) : (
        <TableContainer component={Card} sx={{ pb: 1 }}>
          <Table size={"small"}>
            <TableHead>
              <TableRow>
                <TableCell width={"75%"}>Name</TableCell>
                <TableCell>People</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {houses.map((house: TApiHouse) => (
                <TableRow key={house.id}>
                  <TableCell>{house.name}</TableCell>
                  <TableCell>{house.members.length}</TableCell>
                  <TableCell>
                    <Stack direction={"row"} spacing={1}>
                      {actions[HOUSE_TABLE_ACTIONS.DELETE] && (
                        <Button
                          variant={"text"}
                          onClick={() => handleDeleteModalOpen(house.id)}
                        >
                          Delete
                        </Button>
                      )}
                      {actions[HOUSE_TABLE_ACTIONS.SELECT] && (
                        <Button
                          variant={"text"}
                          onClick={() => handleSelectHouseClick(house.id)}
                          disabled={selectedHouseId === house.id}
                        >
                          {selectedHouseId === house.id ? "Selected" : "Select"}
                        </Button>
                      )}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <DeleteHouseModal
        houseId={deleteHouseId}
        open={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
      />
    </>
  );
};

HousesTable.defaultProps = {
  actions: {},
};

const mapStateToProps = (state: TRootState): THousesTableStateProps => ({
  houses: housesSelector(state),
  selectedHouseId: selectedHouseIdSelector(state),
  housesLoading: getHousesRequestLoadingSelector(state),
});

const mapDispatchToProps = (
  dispatch: TAppDispatch
): THousesTableDispatchProps => ({
  fetchHouses: () => dispatch(runGetHousesRequest()),
  setSelectedHouseId: (id: string) => dispatch(setSelectedHouseId(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HousesTable);
