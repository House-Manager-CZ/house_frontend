import React from "react";
import { connect } from "react-redux";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
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
import { TAppDispatch, TRootState } from "../../redux/store";
import {
  getHousesRequestLoadingSelector,
  housesSelector,
  runHousesRequest,
  setSelectedHouseId,
} from "../../redux/houses";
import {
  TChooseHousePageDispatchProps,
  TChooseHousePageProps,
  TChooseHousePageStateProps,
} from "./ChooseHousePage.types";
import { TApiHouse } from "../../helpers/api/types/entities.types";
import useChooseHousePage from "./useChooseHousePage";

const ChooseHousePage: React.FC<TChooseHousePageProps> = (
  props: TChooseHousePageProps
): React.ReactElement => {
  const { houses, housesLoading } = props;

  const { handleRefreshClick, handleSelectHouseClick } =
    useChooseHousePage(props);

  return (
    <Container sx={{ mt: 2 }}>
      <Stack direction={"row"} sx={{ mb: 2 }}>
        <Button startIcon={<Refresh />} onClick={handleRefreshClick}>
          Refresh
        </Button>
        <Box flexGrow={1} />
        <Button variant={"contained"} disableElevation startIcon={<Add />}>
          Add house
        </Button>
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
                    <Button
                      variant={"text"}
                      onClick={() => handleSelectHouseClick(house.id)}
                    >
                      Select
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

const mapStateToProps = (state: TRootState): TChooseHousePageStateProps => ({
  houses: housesSelector(state),
  housesLoading: getHousesRequestLoadingSelector(state),
});

const mapDispatchToProps = (
  dispatch: TAppDispatch
): TChooseHousePageDispatchProps => ({
  fetchHouses: () => dispatch(runHousesRequest()),
  setSelectedHouseId: (id: string) => dispatch(setSelectedHouseId(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseHousePage);
