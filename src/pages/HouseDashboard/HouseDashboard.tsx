import React from "react";
import { connect } from "react-redux";
import { Container, Grid } from "@mui/material";
import { THouseDashboardProps } from "./HouseDashboard.types";
import HouseDashboardSidebar from "../../components/HouseDashboardSidebar/HouseDashboardSidebar";

const HouseDashboard: React.FC<
  THouseDashboardProps
> = (): // props: THouseDashboardProps
React.ReactElement => {
  return (
    <Container sx={{ mt: 2 }} maxWidth={"xl"}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8} />
        <Grid item xs={12} sm={4}>
          <HouseDashboardSidebar />
        </Grid>
      </Grid>
    </Container>
  );
};

// const mapStateToProps = (state: TRootState): THouseDashboardStateProps => ({});

export default connect()(HouseDashboard);
