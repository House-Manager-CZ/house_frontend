import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { THouseSettingsPageProps } from "./HouseSettingsPage.types";
import { houseSettingsRoutes } from "../../helpers/routing/house-settings";
import useHouseSettingsPage from "./useHouseSettingsPage";

const HouseSettingsPage: React.FC<
  THouseSettingsPageProps
> = (): React.ReactElement => {
  const { pageInfo } = useHouseSettingsPage();

  return (
    <Container sx={{ p: 2 }}>
      <Stack spacing={4}>
        <Stack spacing={1}>
          <Typography variant={"h4"}>{pageInfo.title}</Typography>
          <Typography variant={"body1"} color={"text.secondary"}>
            {pageInfo.description}
          </Typography>
        </Stack>
        <Divider />
        <Box>
          <Suspense fallback={<CircularProgress />}>
            <Routes>
              {Object.values(houseSettingsRoutes).map(
                ({ path, component: Component }) => (
                  <Route key={path} path={path} element={<Component />} />
                )
              )}
            </Routes>
          </Suspense>
        </Box>
      </Stack>
    </Container>
  );
};

export default HouseSettingsPage;
