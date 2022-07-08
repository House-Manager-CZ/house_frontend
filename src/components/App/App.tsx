import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import { AppBox } from "./App.styled";
import ChooseHousePage from "../../pages/ChooseHousePage/ChooseHousePage";
import DashboardWrapper from "../DashboardWrapper/DashboardWrapper";
import { appRoutes } from "../../helpers/routing";

const App = () => (
  <BrowserRouter>
    <AppBox>
      <Routes>
        <Route path={appRoutes.AUTH.path}>
          <Route path={appRoutes.LOGIN.path} element={<LoginPage />} />
          <Route path={appRoutes.REGISTER.path} element={<RegisterPage />} />
        </Route>
        <Route path={appRoutes.HOME.path} element={<DashboardWrapper />}>
          <Route
            path={appRoutes.CHOOSE_HOUSE.path}
            element={<ChooseHousePage />}
          />
        </Route>
      </Routes>
    </AppBox>
  </BrowserRouter>
);

export default App;
