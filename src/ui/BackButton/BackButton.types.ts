import { ButtonProps } from "@mui/material";

export type TBackButtonProps =
  | {
      variant: "text";
      text: string;
      icon?: boolean;
      buttonVariant?: ButtonProps["variant"];
    }
  | {
      variant?: "icon";
    };
