import { memo } from "react";
import { Dispatch } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import GeneralSettings from "./GeneralSettings";
import {
  TGeneralSettingsDispatchProps,
  TGeneralSettingsStateProps,
} from "./GeneralSettings.types";
import { TRootState } from "../../../../redux/store";
import {
  runEditHouseRequest,
  selectedHouseSelector,
} from "../../../../redux/houses";
import { THouseEditAction } from "../../../../redux/houses/types/houses.schema";
import { E_HOUSE_ENTITY_KEYS } from "../../../../helpers/api/types/entities.types";

const mapStateToProps = (state: TRootState): TGeneralSettingsStateProps => ({
  selectedHouse: selectedHouseSelector(state),
});

const mapDispatchToProps = (
  dispatch: Dispatch
): TGeneralSettingsDispatchProps => ({
  runEditHouse: (
    id: THouseEditAction[E_HOUSE_ENTITY_KEYS.ID],
    data: THouseEditAction["data"]
  ) => dispatch(runEditHouseRequest({ id, data })),
});

export default memo(
  connect(mapStateToProps, mapDispatchToProps)(GeneralSettings)
);
