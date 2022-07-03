import React from "react";
import { connect } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
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
  Toolbar,
  Typography,
} from "@mui/material";
import { Apartment, Settings } from "@mui/icons-material";
import useDashboardWrapper from "./useDashboardWrapper";
import { TRootState } from "../../redux/store";
import { isLoggedInSelector } from "../../redux/user/selectors";
import {
  TDashboardWrapperProps,
  TDashboardWrapperStateProps,
} from "./DashboardWrapper.types";
import {
  DashboardAppBarStyled,
  DashboardDrawer,
  DashboardWrapperBox,
  DashboardWrapperDrawerBox,
} from "./DashboardWrapper.styled";

const DashboardWrapper: React.FC<TDashboardWrapperProps> = (
  props: TDashboardWrapperProps
): React.ReactElement => {
  const { isLogged } = props;
  useDashboardWrapper(props);

  if (!isLogged) return <Navigate to={"/auth/login"} />;

  return (
    <DashboardWrapperBox>
      <DashboardAppBarStyled position={"static"} elevation={0}>
        <Toolbar>
          <Typography variant={"h6"} color={"inherit"} sx={{ mr: 2 }}>
            Dashboard
          </Typography>
          <Box flexGrow={1} />
          <IconButton>
            <Settings />
          </IconButton>
        </Toolbar>
      </DashboardAppBarStyled>
      <DashboardWrapperDrawerBox>
        <DashboardDrawer variant={"permanent"} open>
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
                <ListItemText
                  primary={"Houses"}
                  secondary={"some house name"}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </DashboardDrawer>
      </DashboardWrapperDrawerBox>
      <Outlet />
    </DashboardWrapperBox>
  );
};

const mapStateToProps = (state: TRootState): TDashboardWrapperStateProps => ({
  isLogged: isLoggedInSelector(state),
});

export default connect(mapStateToProps)(DashboardWrapper);
