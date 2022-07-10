import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TAddHousePageFormValues,
  TAddHousePageHook,
  TAddHousePageProps,
} from "./AddHousePage.types";

const useAddHousePage = ({
  runCreateHouse,
}: TAddHousePageProps): TAddHousePageHook => {
  const { values, errors, handleChange, handleSubmit } =
    useFormik<TAddHousePageFormValues>({
      initialValues: {
        name: "",
        location: "",
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
        runCreateHouse(submitValues);
      },
    });

  return {
    nameValue: values.name,
    locationValue: values.location,
    errors,
    handleChange,
    handleFormSubmit: handleSubmit,
  };
};

export default useAddHousePage;
