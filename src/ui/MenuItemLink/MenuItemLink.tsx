import React, { useCallback } from "react";
import { MenuItem, MenuItemProps } from "@mui/material";
import { LinkProps, useNavigate } from "react-router-dom";

const MenuItemLink = (
  props: MenuItemProps & Pick<LinkProps, "to">
): React.ReactElement => {
  const { to, onClick } = props;
  const navigate = useNavigate();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      if (onClick) onClick(e);
      navigate(to);
    },
    [navigate, onClick, to]
  );

  return <MenuItem {...props} onClick={handleClick} />;
};

export default MenuItemLink;
