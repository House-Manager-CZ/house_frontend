import { useFormik } from "formik";
import * as Yup from "yup";
import { ChangeEvent, useCallback, useEffect, useRef } from "react";
import {
  TUsersSearchFormValues,
  TUsersSearchHook,
  TUsersSearchProps,
} from "./UsersSearch.types";
import useDebounce from "../../helpers/hooks/useDebounce";
import { TApiUser } from "../../helpers/api/types/entities.types";

const useUsersSearch = ({
  runSearchUsers,
  setSearchResults,
  onUserAdd,
}: TUsersSearchProps): TUsersSearchHook => {
  const {
    values,
    errors,
    handleChange: handleFormikChange,
    resetForm,
  } = useFormik<TUsersSearchFormValues>({
    initialValues: {
      query: "",
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      query: Yup.string(),
    }),
    onSubmit() {
      //
    },
  });

  const dropdownAnchorRef = useRef<HTMLDivElement>(null);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      handleFormikChange(e);
    },
    [handleFormikChange]
  );

  const debouncedChange = useDebounce(() => {
    if (values.query) runSearchUsers(values.query);
  }, 300);

  useEffect(debouncedChange, [debouncedChange, values.query]);

  const handleItemClick = useCallback(
    (member: TApiUser) => {
      onUserAdd(member);
      resetForm();
      setSearchResults([]);
    },
    [onUserAdd, resetForm, setSearchResults]
  );

  return {
    dropdownAnchorRef,
    queryValue: values.query,
    errors,
    handleChange,
    handleItemClick,
  };
};

export default useUsersSearch;
