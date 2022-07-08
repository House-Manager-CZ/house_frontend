import React from "react";
import { connect } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Apartment, Menu, Settings } from "@mui/icons-material";
import { TRootState } from "../../redux/store";
import { isLoggedInSelector } from "../../redux/user";
import {
  TDashboardWrapperProps,
  TDashboardWrapperStateProps,
} from "./DashboardWrapper.types";
import {
  DashboardAppBarStyled,
  DashboardDrawer,
  DashboardWrapperBox,
} from "./DashboardWrapper.styled";
import useDashboardWrapper from "./useDashboardWrapper";
import { selectedHouseIdSelector } from "../../redux/houses";

const DashboardWrapper: React.FC<TDashboardWrapperProps> = (
  props: TDashboardWrapperProps
): React.ReactElement => {
  const { isLogged, selectedHouseId } = props;

  const location = useLocation();

  const { isDrawerOpen, handleMenuIconClick, handleDrawerClose } =
    useDashboardWrapper(props);

  const smDownBreakpoint = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  if (!isLogged) return <Navigate to={"/auth/login"} />;

  if (!selectedHouseId && location.pathname !== "/choose-home")
    return <Navigate to={"/choose-home"} />;

  return (
    <DashboardWrapperBox>
      <DashboardAppBarStyled position={"static"} elevation={0}>
        <Toolbar>
          {smDownBreakpoint && (
            <IconButton sx={{ mr: 2 }} onClick={handleMenuIconClick}>
              <Menu />
            </IconButton>
          )}
          <Typography variant={"h6"} color={"inherit"} sx={{ mr: 2 }}>
            Dashboard
          </Typography>
          <Box flexGrow={1} />
          <IconButton>
            <Settings />
          </IconButton>
        </Toolbar>
      </DashboardAppBarStyled>
      <DashboardDrawer
        variant={smDownBreakpoint ? "temporary" : "permanent"}
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      >
        <Toolbar>
          <Avatar sx={{ mr: 2 }} />
          <Stack direction={"column"}>
            <Typography variant={"body1"}>User</Typography>
            <Typography variant={"caption"}>email</Typography>
          </Stack>
        </Toolbar>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Apartment />
              </ListItemIcon>
              <ListItemText primary={"Houses"} secondary={"some house name"} />
            </ListItemButton>
          </ListItem>
        </List>
      </DashboardDrawer>
      <Outlet />
    </DashboardWrapperBox>
  );
};

const mapStateToProps = (state: TRootState): TDashboardWrapperStateProps => ({
  isLogged: isLoggedInSelector(state),
  selectedHouseId: selectedHouseIdSelector(state),
});

export default connect(mapStateToProps)(DashboardWrapper);
