import React from "react";
import { connect } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Collapse,
  Divider,
  Icon,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  Skeleton,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  Apartment,
  ArrowDropDown,
  Dashboard,
  ExpandLess,
  ExpandMore,
  Logout,
  Menu as MenuIcon,
  Settings,
} from "@mui/icons-material";
import { TAppDispatch, TRootState } from "../../redux/store";
import {
  isLoggedInSelector,
  runLogout,
  userInfoSelector,
} from "../../redux/user";
import {
  TDashboardWrapperDispatchProps,
  TDashboardWrapperProps,
  TDashboardWrapperStateProps,
} from "./DashboardWrapper.types";
import {
  DashboardAppBarStyled,
  DashboardContainer,
  DashboardContainerToolbar,
  DashboardDrawer,
  DashboardUserInfoStack,
  DashboardUserInfoUsername,
  DashboardWrapperBox,
} from "./DashboardWrapper.styled";
import useDashboardWrapper from "./useDashboardWrapper";
import {
  housesSelector,
  selectedHouseIdSelector,
  setSelectedHouseId,
} from "../../redux/houses";
import { APP_ROUTES, appRoutes } from "../../helpers/routing";
import { TApiHouse } from "../../helpers/api/types/entities.types";
import MenuItemLink from "../../ui/MenuItemLink/MenuItemLink";
import NotificationStack from "../NotificationStack/NotificationStack";
import ListItemButtonLink from "../../ui/ListItemButtonLink/ListItemButtonLink";
import TextSkeleton from "../../ui/TextSkeleton/TextSkeleton";
import { houseSettingsRoutes } from "../../helpers/routing/house-settings";

const DashboardWrapper: React.FC<TDashboardWrapperProps> = (
  props: TDashboardWrapperProps
): React.ReactElement => {
  const { isLogged, selectedHouseId, houses, userInfo, logout } = props;

  const { pathname } = useLocation();

  const {
    housesMenuAnchorEl,
    isDrawerOpen,
    isUserMenuOpen,
    currentHouse,
    isHousesMenuOpen,
    handleMenuIconClick,
    handleDrawerClose,
    handleUserMenuIconClick,
    handleHousesButtonClick,
    handleHousesMenuClose,
    handleHousesMenuItemClick,
  } = useDashboardWrapper(props);

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
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant={"h6"} sx={{ mr: 2 }}>
            Dashboard
          </Typography>

          {selectedHouseId &&
            (currentHouse ? (
              <>
                <Button
                  variant={"text"}
                  onClick={handleHousesButtonClick}
                  endIcon={<ArrowDropDown />}
                >
                  {currentHouse.name}
                </Button>
                <Menu
                  open={isHousesMenuOpen}
                  anchorEl={housesMenuAnchorEl}
                  onClose={handleHousesMenuClose}
                  MenuListProps={{
                    dense: true,
                  }}
                >
                  {houses.map((house: TApiHouse) => (
                    <MenuItem
                      key={house.id}
                      onClick={() => handleHousesMenuItemClick(house.id)}
                      selected={house.id === selectedHouseId}
                    >
                      {house.name}
                    </MenuItem>
                  ))}
                  <Divider />
                  <MenuItemLink
                    to={appRoutes.CHOOSE_HOUSE.path}
                    onClick={handleHousesMenuClose}
                  >
                    Manage houses
                  </MenuItemLink>
                </Menu>
              </>
            ) : (
              <Skeleton
                variant={"rectangular"}
                width={100}
                height={"2em"}
                animation={"wave"}
              />
            ))}
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
          <DashboardUserInfoStack>
            {userInfo ? (
              <Tooltip
                title={
                  userInfo.first_name && userInfo.last_name
                    ? `${userInfo.first_name} ${userInfo.last_name}`
                    : userInfo.username
                }
              >
                <DashboardUserInfoUsername variant={"body1"}>
                  {userInfo.first_name && userInfo.last_name
                    ? `${userInfo.first_name} ${userInfo.last_name}`
                    : userInfo.username}
                </DashboardUserInfoUsername>
              </Tooltip>
            ) : (
              <TextSkeleton
                variant={"text"}
                animation={"wave"}
                textVariant={"body1"}
              />
            )}
            {userInfo ? (
              <Tooltip title={userInfo.email}>
                <DashboardUserInfoUsername variant={"caption"}>
                  {userInfo.email}
                </DashboardUserInfoUsername>
              </Tooltip>
            ) : (
              <TextSkeleton
                variant={"text"}
                animation={"wave"}
                textVariant={"body1"}
              />
            )}
          </DashboardUserInfoStack>
          <Box flexGrow={1} />
          <IconButton size={"small"} onClick={handleUserMenuIconClick}>
            {isUserMenuOpen ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Toolbar>
        <Collapse in={isUserMenuOpen} timeout={"auto"}>
          <>
            <List disablePadding>
              <ListItemButton onClick={logout}>
                <ListItemText
                  primary={
                    <Typography variant={"subtitle2"}>Logout</Typography>
                  }
                />
                <ListItemSecondaryAction>
                  <Icon>
                    <Logout />
                  </Icon>
                </ListItemSecondaryAction>
              </ListItemButton>
            </List>
            <Divider />
          </>
        </Collapse>
        <List>
          <ListItemButtonLink to={appRoutes.HOME.path}>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItemButtonLink>
          <ListItemButtonLink to={appRoutes.HOUSES.path}>
            <ListItemIcon>
              <Apartment />
            </ListItemIcon>
            <ListItemText primary={"Houses"} secondary={"some house name"} />
          </ListItemButtonLink>
          {selectedHouseId && (
            <>
              <ListItemButtonLink
                to={appRoutes.HOUSE_SETTINGS.path.replace(
                  "*",
                  houseSettingsRoutes.GENERAL.path
                )}
                selected={
                  pathname.indexOf(
                    appRoutes.HOUSE_SETTINGS.path.split("/")[1]
                  ) !== -1
                }
              >
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText primary={"Settings"} />
              </ListItemButtonLink>
              <Collapse
                in={
                  pathname.indexOf(
                    appRoutes.HOUSE_SETTINGS.path.split("/")[1]
                  ) !== -1
                }
              >
                <List disablePadding>
                  {Object.values(houseSettingsRoutes).map((route) => (
                    <ListItemButtonLink
                      key={route.path}
                      to={appRoutes.HOUSE_SETTINGS.path.replace(
                        "*",
                        route.path
                      )}
                      sx={{ pl: 6 }}
                      selected={pathname.endsWith(route.path)}
                    >
                      <ListItemText primary={route.title} />
                    </ListItemButtonLink>
                  ))}
                </List>
              </Collapse>
            </>
          )}
        </List>
      </DashboardDrawer>
      <DashboardContainer>
        <DashboardContainerToolbar />
        <NotificationStack />
        <Outlet />
      </DashboardContainer>
    </DashboardWrapperBox>
  );
};

const mapStateToProps = (state: TRootState): TDashboardWrapperStateProps => ({
  isLogged: isLoggedInSelector(state),
  selectedHouseId: selectedHouseIdSelector(state),
  houses: housesSelector(state),
  userInfo: userInfoSelector(state),
});

const mapDispatchToProps = (
  dispatch: TAppDispatch
): TDashboardWrapperDispatchProps => ({
  logout: () => dispatch(runLogout()),
  setSelectedHouseId: (houseId: string) =>
    dispatch(setSelectedHouseId(houseId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardWrapper);
