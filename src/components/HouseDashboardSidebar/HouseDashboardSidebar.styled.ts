import { Box, styled } from "@mui/material";
import Image from "mui-image";

export const HouseDashboardSidebarMapImageWrapper = styled(Box)({
  width: "100%",
  height: "0",
  position: "relative",
  paddingBottom: "50%",
});

export const HouseDashboardSidebarMapImage = styled(Image)(({ theme }) => ({
  width: "100%",
  height: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  borderRadius: theme.spacing(1),
}));
