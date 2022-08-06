import React, { useCallback } from "react";
import { Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { TBackButtonProps } from "./BackButton.types";

const BackButton: React.FC<TBackButtonProps> = (
  props: TBackButtonProps
): React.ReactElement => {
  const { variant } = props;

  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  if (variant === "text") {
    const { text, buttonVariant, icon } = props;
    return (
      <Button
        variant={buttonVariant}
        startIcon={icon && <ArrowBack />}
        onClick={handleClick}
      >
        {text}
      </Button>
    );
  }

  return (
    <IconButton onClick={handleClick} color={"primary"}>
      <ArrowBack />
    </IconButton>
  );
};

export default BackButton;
