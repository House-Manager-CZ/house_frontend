import React from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { TGeneralSettingsProps } from "./GeneralSettings.types";
import useGeneralSettings from "./useGeneralSettings";
import { E_HOUSE_ENTITY_KEYS } from "../../../../helpers/api/types/entities.types";

const GeneralSettings: React.FC<TGeneralSettingsProps> = (
  props: TGeneralSettingsProps
): React.ReactElement => {
  const { nameValue, locationValue, errors, handleChange, handleSubmit } =
    useGeneralSettings(props);

  return (
    <Box component={"form"} onSubmit={handleSubmit} onChange={handleChange}>
      <Grid container spacing={4}>
        <Grid item container xs={12} spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant={"h6"}>House name</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              placeholder={"My house"}
              value={nameValue}
              name={E_HOUSE_ENTITY_KEYS.NAME}
              error={!!errors[E_HOUSE_ENTITY_KEYS.NAME]}
              helperText={errors[E_HOUSE_ENTITY_KEYS.NAME]}
            />
          </Grid>
        </Grid>
        <Grid item container xs={12} spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant={"h6"}>House location</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              placeholder={"49.19507 16.60796"}
              value={locationValue}
              name={E_HOUSE_ENTITY_KEYS.LOCATION}
              error={!!errors[E_HOUSE_ENTITY_KEYS.LOCATION]}
              helperText={errors[E_HOUSE_ENTITY_KEYS.LOCATION]}
            />
          </Grid>
        </Grid>
        <Grid item container xs={12} spacing={2}>
          <Box sx={{ flexGrow: 1 }} />
          <Button variant={"contained"} disableElevation type={"submit"}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GeneralSettings;
