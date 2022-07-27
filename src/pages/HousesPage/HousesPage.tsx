import React from "react";
import { connect } from "react-redux";
import { Container } from "@mui/material";
import HousesTable from "../../components/HousesTable/HousesTable";
import { HOUSE_TABLE_ACTIONS } from "../../components/HousesTable/HousesTable.types";

const HousesPage: React.FC<any> = (): React.ReactElement => {
  return (
    <Container sx={{ mt: 2 }}>
      <HousesTable
        actions={{
          [HOUSE_TABLE_ACTIONS.ADD]: true,
          [HOUSE_TABLE_ACTIONS.DELETE]: true,
          [HOUSE_TABLE_ACTIONS.REFRESH]: true,
        }}
      />
    </Container>
  );
};

export default connect()(HousesPage);
