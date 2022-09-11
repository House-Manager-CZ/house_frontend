import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import {
  TGeneralSettingsFormValues,
  TGeneralSettingsHook,
  TGeneralSettingsProps,
} from "./GeneralSettings.types";
import { E_HOUSE_ENTITY_KEYS } from "../../../../helpers/api/types/entities.types";

const useGeneralSettings = ({
  selectedHouse,
  runEditHouse,
}: TGeneralSettingsProps): TGeneralSettingsHook => {
  const { values, errors, handleChange, handleSubmit, resetForm } =
    useFormik<TGeneralSettingsFormValues>({
      initialValues: {
        [E_HOUSE_ENTITY_KEYS.NAME]: "",
        [E_HOUSE_ENTITY_KEYS.LOCATION]: "",
      },
      validationSchema: Yup.object().shape({
        [E_HOUSE_ENTITY_KEYS.NAME]: Yup.string().required("Name is required"),
        [E_HOUSE_ENTITY_KEYS.LOCATION]: Yup.string()
          .required("Location is required")
          .matches(
            /^(-?\d{1,3}(\.\d+)?)\s(-?\d{1,3}(\.\d+)?)$/gm,
            "Location should have format -34(.397) 150(.644)"
          ),
      }),
      onSubmit(submitValues: TGeneralSettingsFormValues) {
        if (!selectedHouse) return;

        runEditHouse(selectedHouse.id, {
          ...submitValues,
        });
      },
    });

  useEffect(() => {
    if (!selectedHouse) return;

    resetForm({
      values: {
        [E_HOUSE_ENTITY_KEYS.NAME]: selectedHouse.name,
        [E_HOUSE_ENTITY_KEYS.LOCATION]: `${selectedHouse.location.coordinates[0]} ${selectedHouse.location.coordinates[1]}`,
      },
    });
  }, [resetForm, selectedHouse]);

  return {
    nameValue: values[E_HOUSE_ENTITY_KEYS.NAME],
    locationValue: values[E_HOUSE_ENTITY_KEYS.LOCATION],
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useGeneralSettings;
