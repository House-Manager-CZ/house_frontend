import { combineReducers } from "@reduxjs/toolkit";
import userReducer, { moduleName } from "./user";

const rootReducer = combineReducers({
  [moduleName]: userReducer,
});

export default rootReducer;
