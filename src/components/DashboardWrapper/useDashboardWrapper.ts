import { useCallback, useEffect, useState } from "react";
import { Theme, useMediaQuery } from "@mui/material";
import {
  TDashboardWrapperHook,
  TDashboardWrapperProps,
} from "./DashboardWrapper.types";

const useDashboardWrapper = (
  // eslint-disable-next-line no-unused-vars
  props: TDashboardWrapperProps
): TDashboardWrapperHook => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true);

  const smDownBreakpoint = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  useEffect(() => {
    if (smDownBreakpoint) setIsDrawerOpen(false);
  }, [smDownBreakpoint]);

  const handleMenuIconClick = useCallback(() => {
    setIsDrawerOpen(!isDrawerOpen);
  }, [isDrawerOpen]);

  const handleDrawerClose = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  return {
    isDrawerOpen,
    handleMenuIconClick,
    handleDrawerClose,
  };
};

export default useDashboardWrapper;
