import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as Sentry from "@sentry/react";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import { AppBox } from "./App.styled";
import DashboardWrapper from "../DashboardWrapper/DashboardWrapper";
import { APP_ROUTES, appRoutes, TAppRouteDetails } from "../../helpers/routing";

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

const App = () => (
  <BrowserRouter>
    <AppBox>
      <SentryRoutes>
        <Route>
          <Route path={APP_ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={APP_ROUTES.REGISTER} element={<RegisterPage />} />
        </Route>
        <Route path={APP_ROUTES.HOME} element={<DashboardWrapper />}>
          {Object.values<TAppRouteDetails<any>>(appRoutes).map(
            ({ path, component: Component }: TAppRouteDetails<any>) => (
              <Route key={path} path={path} element={<Component />} />
            )
          )}
        </Route>
      </SentryRoutes>
    </AppBox>
  </BrowserRouter>
);

export default App;
