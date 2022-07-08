export enum APP_ROUTES {
  HOME = "/",
  CHOOSE_HOUSE = "choose-house",
  ADD_HOUSE = "add-house",
  AUTH = "/auth",
  LOGIN = "login",
  REGISTER = "register",
}

export type TAppRouteDetails<T extends keyof typeof APP_ROUTES> = {
  readonly path: typeof APP_ROUTES[T];
  readonly readableName: string;
};

export type TAppRoute = {
  [key in keyof typeof APP_ROUTES]: TAppRouteDetails<key>;
};

export const appRoutes: TAppRoute = {
  HOME: {
    path: APP_ROUTES.HOME,
    readableName: "Home",
  },
  CHOOSE_HOUSE: {
    path: APP_ROUTES.CHOOSE_HOUSE,
    readableName: "Choose House",
  },
  ADD_HOUSE: {
    path: APP_ROUTES.ADD_HOUSE,
    readableName: "Add House",
  },
  AUTH: {
    path: APP_ROUTES.AUTH,
    readableName: "Auth",
  },
  LOGIN: {
    path: APP_ROUTES.LOGIN,
    readableName: "Login",
  },
  REGISTER: {
    path: APP_ROUTES.REGISTER,
    readableName: "Register",
  },
};
