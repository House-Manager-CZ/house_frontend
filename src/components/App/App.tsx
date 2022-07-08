import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import { AppBox } from "./App.styled";
import ChooseHousePage from "../../pages/ChooseHousePage/ChooseHousePage";
import DashboardWrapper from "../DashboardWrapper/DashboardWrapper";

const App = () => (
  <BrowserRouter>
    <AppBox>
      <Routes>
        <Route path={"auth"}>
          <Route path={"login"} element={<LoginPage />} />
          <Route path={"register"} element={<RegisterPage />} />
        </Route>
        <Route path={"/"} element={<DashboardWrapper />}>
          <Route path={"choose-house"} element={<ChooseHousePage />} />
        </Route>
      </Routes>
    </AppBox>
  </BrowserRouter>
);

export default App;
