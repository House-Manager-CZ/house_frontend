import React from "react";
import { Container, Stack, Typography } from "@mui/material";
import { connect } from "react-redux";
import HouseForm from "../../components/HouseForm/HouseForm";

const EditHousePage: React.FC = (): React.ReactElement => {
  return (
    <Container sx={{ mt: 2 }}>
      <Stack spacing={3}>
        <Typography variant={"h5"}>Edit house</Typography>
        <HouseForm mode={"edit"} />
      </Stack>
    </Container>
  );
};

export default connect()(EditHousePage);
