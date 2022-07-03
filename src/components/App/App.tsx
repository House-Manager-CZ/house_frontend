import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../../pages/LoginPage/LoginPage";
import { AppBox } from "./App.styled";
import ChooseHomePage from "../../pages/ChooseHomePage/ChooseHomePage";
import DashboardWrapper from "../DashboardWrapper/DashboardWrapper";

const App = () => (
  <BrowserRouter>
    <AppBox>
      <Routes>
        <Route path={"auth"}>
          <Route path={"login"} element={<LoginPage />} />
        </Route>
        <Route path={"/"} element={<DashboardWrapper />}>
          <Route path={"choose-home"} element={<ChooseHomePage />} />
        </Route>
      </Routes>
    </AppBox>
  </BrowserRouter>
);

export default App;
