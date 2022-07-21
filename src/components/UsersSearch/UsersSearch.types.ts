import React from "react";
import { FormikErrors } from "formik";
import { TApiUser } from "../../helpers/api/types/entities.types";

export type TUsersSearchStateProps = {
  searchResults: Array<TApiUser>;
  searchUsersLoading: boolean;
};

export type TUsersSearchDispatchProps = {
  runSearchUsers: (query: string) => void;
  setSearchResults: (results: Array<TApiUser>) => void;
};

export type TUsersSearchProps = TUsersSearchStateProps &
  TUsersSearchDispatchProps & {
    onUserAdd: (user: TApiUser) => void;
  };

export type TUsersSearchHook = {
  dropdownAnchorRef: React.RefObject<HTMLDivElement>;
  queryValue: string;
  errors: FormikErrors<TUsersSearchFormValues>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleItemClick: (member: TApiUser) => void;
};

export type TUsersSearchFormValues = {
  query: string;
};
