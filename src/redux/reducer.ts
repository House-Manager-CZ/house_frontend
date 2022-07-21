import { combineReducers } from "@reduxjs/toolkit";
import usersReducer, { moduleName as usersModuleName } from "./users";
import userReducer, { moduleName as userModuleName } from "./user";
import housesReducer, { moduleName as housesModuleName } from "./houses";

const rootReducer = combineReducers({
  [userModuleName]: userReducer,
  [housesModuleName]: housesReducer,
  [usersModuleName]: usersReducer,
});

export default rootReducer;
