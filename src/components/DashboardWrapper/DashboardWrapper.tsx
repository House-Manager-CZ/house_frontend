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
  DashboardContainer,
  DashboardContainerToolbar,
  DashboardDrawer,
  DashboardWrapperBox,
} from "./DashboardWrapper.styled";
import useDashboardWrapper from "./useDashboardWrapper";
import { selectedHouseIdSelector } from "../../redux/houses";
import { APP_ROUTES } from "../../helpers/routing";

const DashboardWrapper: React.FC<TDashboardWrapperProps> = (
  props: TDashboardWrapperProps
): React.ReactElement => {
  const { isLogged, selectedHouseId } = props;

  const { pathname } = useLocation();

  const { isDrawerOpen, handleMenuIconClick, handleDrawerClose } =
    useDashboardWrapper(props);

  const smDownBreakpoint = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  if (!isLogged) return <Navigate to={APP_ROUTES.LOGIN} />;

  if (
    !selectedHouseId &&
    pathname !== APP_ROUTES.CHOOSE_HOUSE &&
    pathname !== APP_ROUTES.ADD_HOUSE
  )
    return <Navigate to={APP_ROUTES.CHOOSE_HOUSE} />;

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
        anchor={"left"}
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
      <DashboardContainer>
        <DashboardContainerToolbar />
        <Outlet />
      </DashboardContainer>
    </DashboardWrapperBox>
  );
};

const mapStateToProps = (state: TRootState): TDashboardWrapperStateProps => ({
  isLogged: isLoggedInSelector(state),
  selectedHouseId: selectedHouseIdSelector(state),
});

export default connect(mapStateToProps)(DashboardWrapper);
