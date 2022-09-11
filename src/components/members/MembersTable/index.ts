import { memo } from "react";
import { Dispatch } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import MembersTable from "./MembersTable";
import {
  TMembersListDispatchProps,
  TMembersListStateProps,
} from "./MembersTable.types";
import { selectedHouseSelector } from "../../../redux/houses";
import { TRootState } from "../../../redux/store";

const mapStateToProps = (state: TRootState): TMembersListStateProps => ({
  selectedHouse: selectedHouseSelector(state),
});

const mapDispatchToProps = (
  dispatch: Dispatch
): TMembersListDispatchProps => ({});

export default memo(connect(mapStateToProps, mapDispatchToProps)(MembersTable));
