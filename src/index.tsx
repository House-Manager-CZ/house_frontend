import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";
import mainTheme from "./helpers/theme/mainTheme";
import App from "./components/App/App";

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface PasswordCredentialData {
    id: string;
    name?: string;
    iconURL?: string;
    password: string;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface PasswordCredentialConstructor extends Credential {
    new (passwordCredentialData: PasswordCredentialData): PasswordCredential;
    new (htmlFormElement: HTMLFormElement): PasswordCredential;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface PasswordCredential extends Credential {
    readonly iconURL: string;
    readonly password: string;
    readonly name: string;
  }

  const PasswordCredential: PasswordCredentialConstructor;

  // eslint-disable-next-line @typescript-eslint/naming-convention,no-unused-vars
  interface Window {
    PasswordCredential: PasswordCredentialConstructor;
  }
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
