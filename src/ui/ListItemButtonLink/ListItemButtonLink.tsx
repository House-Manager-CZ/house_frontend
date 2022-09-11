import { ListItemButtonProps } from "@mui/material";
import { LinkProps, useNavigate } from "react-router-dom";
import React, { useCallback } from "react";
import { ListItemButtonLinkStyled } from "./ListItemButtonLink.styled";

const ListItemButtonLink = (
  props: ListItemButtonProps & Pick<LinkProps, "to">
): React.ReactElement => {
  const { to, onClick } = props;
  const navigate = useNavigate();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (onClick) onClick(e);
      navigate(to);
    },
    [navigate, onClick, to]
  );

  return <ListItemButtonLinkStyled {...props} onClick={handleClick} />;
};

export default ListItemButtonLink;
