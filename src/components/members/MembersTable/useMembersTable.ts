import React, { useCallback, useRef, useState } from "react";
import { useFormik } from "formik";
import {
  E_MEMBERS_LIST_FORM_FIELDS,
  TMemberListFormValues,
  TMembersListHook,
  TMembersListProps,
} from "./MembersTable.types";
import { E_HOUSE_ENTITY_KEYS } from "../../../helpers/api/types/entities.types";

// eslint-disable-next-line no-empty-pattern
const useMembersTable = ({
  selectedHouse,
}: TMembersListProps): TMembersListHook => {
  const selectedButtonRef = useRef<HTMLButtonElement>(null);

  const [selectedMenuOpen, setSelectedMenuOpen] = useState(false);

  const {
    values: { selectedMembers },
    handleChange,
    setFieldValue,
  } = useFormik<TMemberListFormValues>({
    initialValues: {
      [E_MEMBERS_LIST_FORM_FIELDS.SELECTED_MEMBERS]: [],
    },
    onSubmit: () => {},
  });

  const handleAllCheckboxChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!selectedHouse) return;

      setFieldValue(
        E_MEMBERS_LIST_FORM_FIELDS.SELECTED_MEMBERS,
        event.target.checked
          ? selectedHouse[E_HOUSE_ENTITY_KEYS.MEMBERS].map((member) =>
              String(member.id)
            )
          : []
      );
    },
    [selectedHouse, setFieldValue]
  );

  const handleSelectedMenuButtonClick = useCallback(() => {
    setSelectedMenuOpen(true);
  }, []);

  const handleSelectedMenuClose = useCallback(() => {
    setSelectedMenuOpen(false);
  }, []);

  return {
    selectedButtonRef,
    selectedMenuOpen,
    selectedMembers,
    handleChange,
    handleAllCheckboxChange,
    handleSelectedMenuButtonClick,
    handleSelectedMenuClose,
  };
};

export default useMembersTable;
