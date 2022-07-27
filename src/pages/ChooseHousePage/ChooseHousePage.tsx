import React from "react";
import { connect } from "react-redux";
import { Container } from "@mui/material";
import { TChooseHousePageProps } from "./ChooseHousePage.types";
import useChooseHousePage from "./useChooseHousePage";
import HousesTable from "../../components/HousesTable/HousesTable";
import { HOUSE_TABLE_ACTIONS } from "../../components/HousesTable/HousesTable.types";

const ChooseHousePage: React.FC<
  TChooseHousePageProps
> = (): React.ReactElement => {
  useChooseHousePage();

  return (
    <Container sx={{ mt: 2 }}>
      <HousesTable
        actions={{
          [HOUSE_TABLE_ACTIONS.ADD]: true,
          [HOUSE_TABLE_ACTIONS.REFRESH]: true,
          [HOUSE_TABLE_ACTIONS.SELECT]: true,
        }}
      />
    </Container>
  );
};

export default connect()(ChooseHousePage);
