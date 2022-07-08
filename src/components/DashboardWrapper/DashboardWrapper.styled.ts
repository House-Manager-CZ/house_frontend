import { AppBar, Box, Drawer, styled, Toolbar } from "@mui/material";

export const drawerWidth = 240;

export const DashboardWrapperBox = styled(Box)({
  display: "flex",
});

export const DashboardAppBarStyled = styled(AppBar)(({ theme }) => ({
  width: `calc(100% - ${drawerWidth}px)`,
  position: "absolute",
  marginLeft: drawerWidth,
  zIndex: theme.zIndex.appBar,

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginLeft: 0,
  },
}));

export const DashboardDrawer = styled(Drawer)({
  display: "block",
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

export const DashboardContainer = styled(Box)(({ theme }) => ({
  width: `calc(100% - ${drawerWidth}px)`,
  marginLeft: drawerWidth,

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginLeft: 0,
  },
}));

export const DashboardContainerToolbar = styled(Toolbar)(({ theme }) => ({
  zIndex: theme.zIndex.appBar - 1,
}));
