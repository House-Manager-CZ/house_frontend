import { AppBar, Box, Drawer, styled } from "@mui/material";

export const drawerWidth = 240;

export const DashboardWrapperBox = styled(Box)({
  display: "flex",
});

export const DashboardAppBarStyled = styled(AppBar)({
  width: `calc(100% - ${drawerWidth}px)`,
  marginLeft: drawerWidth,
});

export const DashboardWrapperDrawerBox = styled(Box)({
  width: drawerWidth,
  flexShrink: 0,
});

export const DashboardDrawer = styled(Drawer)({
  display: "block",
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});
