import React from "react";
import { connect } from "react-redux";
import { Container, Stack, Typography } from "@mui/material";
import HouseForm from "../../components/HouseForm/HouseForm";

const AddHousePage: React.FC = (): React.ReactElement => {
  return (
    <Container sx={{ mt: 2 }}>
      <Stack spacing={3}>
        <Typography variant={"h5"}>Add house</Typography>
        <HouseForm mode={"add"} />
      </Stack>
    </Container>
  );
};

export default connect()(AddHousePage);
