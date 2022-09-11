import { memo } from "react";
import { Dispatch } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import MembersTableItem from "./MembersTableItem";
import {
  TMembersTableItemDispatchProps,
  TMembersTableItemStateProps,
} from "./MembersTableItem.types";
import { TRootState } from "../../../redux/store";

const mapStateToProps = (
  state: TRootState
): TMembersTableItemStateProps => ({});

const mapDispatchToProps = (
  dispatch: Dispatch
): TMembersTableItemDispatchProps => ({});

export default memo(
  connect(mapStateToProps, mapDispatchToProps)(MembersTableItem)
);
