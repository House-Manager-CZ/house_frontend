import { combineReducers } from "@reduxjs/toolkit";
import userReducer, { moduleName as usersModuleName } from "./user";
import housesReducer, { moduleName as housesModuleName } from "./houses";

const rootReducer = combineReducers({
  [usersModuleName]: userReducer,
  [housesModuleName]: housesReducer,
});

export default rootReducer;
