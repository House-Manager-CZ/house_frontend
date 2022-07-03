export type TDashboardWrapperStateProps = {
  isLogged: boolean;
};

export type TDashboardWrapperDispatchProps = {};

export type TDashboardWrapperProps = TDashboardWrapperStateProps &
  TDashboardWrapperDispatchProps;

export type TDashboardWrapperHook = {
  isDrawerOpen: boolean;
  handleMenuIconClick: () => void;
  handleDrawerClose: () => void;
};
