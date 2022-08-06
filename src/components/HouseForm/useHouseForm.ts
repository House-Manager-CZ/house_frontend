import { useFormik } from "formik";
import * as Yup from "yup";
import { useCallback, useEffect, useMemo, useState } from "react";
import { differenceWith, isEqual, some } from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import {
  THouseFormHook,
  THouseFormProps,
  THouseFormValues,
} from "./HouseForm.types";
import { TApiHouse, TApiUser } from "../../helpers/api/types/entities.types";

const useHouseForm = ({
  mode,
  userInfo,
  houses,
  runCreateHouse,
  runEditHouse,
  createHouseRequestSuccess,
  editHouseRequestSuccess,
}: THouseFormProps): THouseFormHook => {
  const navigate = useNavigate();

  const {
    initialValues,
    values,
    errors,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik<THouseFormValues>({
    initialValues: {
      name: "",
      location: "",
      members: [...(userInfo !== false ? [userInfo] : [])],
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      location: Yup.string()
        .required("Location is required")
        .matches(
          /^(-?\d{1,3}(\.\d+)?)\s(-?\d{1,3}(\.\d+)?)$/gm,
          "Location should have format -34(.397) 150(.644)"
        ),
    }),
    onSubmit: (submitValues: THouseFormValues) => {
      if (!valuesChanged) {
        navigate(-1);
        return;
      }

      if (mode === "add")
        runCreateHouse({
          ...submitValues,
          members: submitValues.members.map((member) => member.id),
        });
      else if (mode === "edit" && currentEditHouse)
        runEditHouse(currentEditHouse.id, {
          ...submitValues,
          members: submitValues.members.map((member) => member.id),
        });
    },
  });

  const [currentEditHouse, setCurrentEditHouse] = useState<TApiHouse | false>(
    false
  );

  const { id: editHouseId } = useParams<{ id: string }>();

  const valuesChanged = useMemo(() => {
    return (
      !isEqual(initialValues.name, values.name) ||
      !isEqual(initialValues.location, values.location) ||
      !!differenceWith(values.members, initialValues.members, (m1, m2) =>
        isEqual(m1.id, m2.id)
      ).length ||
      !!differenceWith(initialValues.members, values.members, (m1, m2) =>
        isEqual(m1.id, m2.id)
      ).length
    );
  }, [initialValues, values]);

  useEffect(() => {
    if (houses && editHouseId)
      setCurrentEditHouse(
        houses.find((house) => house.id === editHouseId) || false
      );
  }, [editHouseId, houses]);

  useEffect(() => {
    if (currentEditHouse)
      resetForm({
        values: {
          name: currentEditHouse.name,
          location: `${currentEditHouse.location.coordinates[0]} ${currentEditHouse.location.coordinates[1]}`,
          members: currentEditHouse.members,
        },
      });
  }, [currentEditHouse, resetForm]);

  useEffect(() => {
    if (mode === "add" && createHouseRequestSuccess) {
      navigate(-1);
      resetForm({
        values: {
          name: "",
          location: "",
          members: [],
        },
      });
    } else if (mode === "edit" && editHouseRequestSuccess) {
      navigate(-1);
      resetForm({
        values: {
          name: "",
          location: "",
          members: [],
        },
      });
    }
  }, [
    createHouseRequestSuccess,
    editHouseRequestSuccess,
    mode,
    navigate,
    resetForm,
  ]);

  const handleMemberAdd = useCallback(
    (member: TApiUser) => {
      if (some(values.members, { id: member.id })) return;

      setFieldValue("members", [...values.members, member]);
    },
    [setFieldValue, values.members]
  );

  const handleMemberRemove = useCallback(
    (member: TApiUser) => {
      setFieldValue(
        "members",
        values.members.filter((m) => m !== member)
      );
    },
    [setFieldValue, values.members]
  );

  const handleCancelClick = useCallback(() => {
    resetForm();
    navigate(-1);
  }, [navigate, resetForm]);

  return {
    nameValue: values.name,
    locationValue: values.location,
    selectedMembers: values.members,
    errors,
    handleChange,
    handleMemberAdd,
    handleMemberRemove,
    handleCancelClick,
    handleFormSubmit: handleSubmit,
  };
};

export default useHouseForm;
