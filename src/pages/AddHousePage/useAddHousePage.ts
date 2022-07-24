import { useFormik } from "formik";
import * as Yup from "yup";
import { useCallback } from "react";
import { some } from "lodash";
import {
  TAddHousePageFormValues,
  TAddHousePageHook,
  TAddHousePageProps,
} from "./AddHousePage.types";
import { TApiUser } from "../../helpers/api/types/entities.types";

const useAddHousePage = ({
  userInfo,
  runCreateHouse,
}: TAddHousePageProps): TAddHousePageHook => {
  const { values, errors, handleChange, handleSubmit, setFieldValue } =
    useFormik<TAddHousePageFormValues>({
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
      onSubmit: (submitValues: TAddHousePageFormValues) => {
        runCreateHouse({
          ...submitValues,
          members: submitValues.members.map((member) => member.id),
        });
      },
    });

  const handleMemberAdd = useCallback(
    (member: TApiUser) => {
      if (some(values.members, member)) return;

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

  return {
    nameValue: values.name,
    locationValue: values.location,
    selectedMembers: values.members,
    errors,
    handleChange,
    handleMemberAdd,
    handleMemberRemove,
    handleFormSubmit: handleSubmit,
  };
};

export default useAddHousePage;
