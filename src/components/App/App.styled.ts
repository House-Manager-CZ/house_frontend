import { styled } from "@mui/material";
import Box from "@mui/material/Box";

export const AppBox = styled(Box)(({ theme }) => ({
  height: "100%",
  backgroundColor: theme.palette.background.default,
}));
