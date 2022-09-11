import { memo } from "react";
import { Dispatch } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import MembersSettings from "./MembersSettings";
import {
  TMembersSettingsDispatchProps,
  TMembersSettingsStateProps,
} from "./MembersSettings.types";
import { TRootState } from "../../../../redux/store";
import { selectedHouseSelector } from "../../../../redux/houses";

const mapStateToProps = (state: TRootState): TMembersSettingsStateProps => ({
  selectedHouse: selectedHouseSelector(state),
});

const mapDispatchToProps = (
  dispatch: Dispatch
): TMembersSettingsDispatchProps => ({});

export default memo(
  connect(mapStateToProps, mapDispatchToProps)(MembersSettings)
);
