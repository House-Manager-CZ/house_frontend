import { Stack, styled } from "@mui/material";

export const NotificationStackStyled = styled(Stack)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(4),
  right: theme.spacing(4),
  zIndex: theme.zIndex.tooltip,
}));
