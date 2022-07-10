import React from "react";
import { connect } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  Apartment,
  ArrowDropDown,
  Menu as MenuIcon,
  Settings,
} from "@mui/icons-material";
import { TAppDispatch, TRootState } from "../../redux/store";
import { isLoggedInSelector } from "../../redux/user";
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

const DashboardWrapper: React.FC<TDashboardWrapperProps> = (
  props: TDashboardWrapperProps
): React.ReactElement => {
  const { isLogged, selectedHouseId, houses } = props;

  const { pathname } = useLocation();

  const {
    housesMenuAnchorEl,
    isDrawerOpen,
    currentHouse,
    isHousesMenuOpen,
    handleMenuIconClick,
    handleDrawerClose,
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
  houses: housesSelector(state),
});

const mapDispatchToProps = (
  dispatch: TAppDispatch
): TDashboardWrapperDispatchProps => ({
  setSelectedHouseId: (houseId: string) =>
    dispatch(setSelectedHouseId(houseId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardWrapper);
