import React, { useCallback } from "react";
import { Button, ButtonProps } from "@mui/material";
import { LinkProps, useNavigate } from "react-router-dom";

const ButtonLink = (
  props: ButtonProps & Pick<LinkProps, "to">
): React.ReactElement => {
  const { to } = props;
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(to);
  }, [navigate, to]);

  return <Button {...props} onClick={handleClick} />;
};

export default ButtonLink;
