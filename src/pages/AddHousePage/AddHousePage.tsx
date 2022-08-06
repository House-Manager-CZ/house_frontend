import React from "react";
import { connect } from "react-redux";
import { Container, Stack, Typography } from "@mui/material";
import HouseForm from "../../components/HouseForm/HouseForm";
import BackButton from "../../ui/BackButton/BackButton";

const AddHousePage: React.FC = (): React.ReactElement => {
  return (
    <Container sx={{ mt: 2 }}>
      <Stack spacing={3}>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <BackButton />
          <Typography variant={"h5"}>Add house</Typography>
        </Stack>
        <HouseForm mode={"add"} />
      </Stack>
    </Container>
  );
};

export default connect()(AddHousePage);
