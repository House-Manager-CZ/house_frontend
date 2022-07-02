import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../../pages/LoginPage/LoginPage";
import { AppBox } from "./App.styled";

const App = () => (
  <BrowserRouter>
    <AppBox>
      <Routes>
        <Route path={"auth"}>
          <Route path={"login"} element={<LoginPage />} />
        </Route>
      </Routes>
    </AppBox>
  </BrowserRouter>
);

export default App;
