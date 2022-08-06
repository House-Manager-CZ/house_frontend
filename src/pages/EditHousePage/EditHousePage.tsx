import React from "react";
import { Container, Stack, Typography } from "@mui/material";
import { connect } from "react-redux";
import HouseForm from "../../components/HouseForm/HouseForm";
import BackButton from "../../ui/BackButton/BackButton";

const EditHousePage: React.FC = (): React.ReactElement => {
  return (
    <Container sx={{ mt: 2 }}>
      <Stack spacing={3}>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <BackButton />
          <Typography variant={"h5"}>Edit house</Typography>
        </Stack>
        <HouseForm mode={"edit"} />
      </Stack>
    </Container>
  );
};

export default connect()(EditHousePage);
