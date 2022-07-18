import React from "react";
import { connect } from "react-redux";
import {
  Box,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Icon,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import { Mail, Person, VpnKey } from "@mui/icons-material";
import { Navigate, useNavigate } from "react-router-dom";
import {
  TRegisterPageDispatchProps,
  TRegisterPageProps,
  TRegisterPageStateProps,
} from "./RegisterPage.types";
import { TAppDispatch, TRootState } from "../../redux/store";
import {
  RegisterCard,
  RegisterCardTextField,
  RegisterForm,
} from "./RegisterPage.styled";
import useRegisterPage from "./useRegisterPage";
import {
  isLoggedInSelector,
  registerRequestErrorSelector,
  registerRequestLoadingSelector,
  runRegister,
} from "../../redux/user";

const RegisterPage: React.FC<TRegisterPageProps> = (
  props: TRegisterPageProps
): React.ReactElement => {
  const { isLogged, registerRequestLoading, registerRequestError } = props;

  const {
    usernameValue,
    emailValue,
    passwordValue,
    passwordConfirmValue,
    errors,
    handleChange,
    handleSubmit,
  } = useRegisterPage(props);

  const navigate = useNavigate();

  if (isLogged) return <Navigate to={"/"} />;

  return (
    <RegisterForm onSubmit={handleSubmit}>
      <RegisterCard variant={"outlined"}>
        <CardHeader title={"Register"} />
        <CardContent>
          <Stack direction={"column"}>
            <RegisterCardTextField
              color={errors.username ? "error" : "primary"}
              name={"username"}
              value={usernameValue}
              onChange={handleChange}
              variant={"outlined"}
              label={"Username"}
              type={"text"}
              autoComplete={"username"}
              margin={"dense"}
              error={!!errors.username}
              helperText={errors.username}
              disabled={registerRequestLoading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position={"start"}>
                    <Icon>
                      <Person />
                    </Icon>
                  </InputAdornment>
                ),
              }}
            />
            <RegisterCardTextField
              color={errors.email ? "error" : "primary"}
              name={"email"}
              value={emailValue}
              onChange={handleChange}
              variant={"outlined"}
              label={"Email"}
              type={"email"}
              autoComplete={"email"}
              margin={"normal"}
              error={!!errors.email}
              helperText={errors.email}
              disabled={registerRequestLoading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position={"start"}>
                    <Icon>
                      <Mail />
                    </Icon>
                  </InputAdornment>
                ),
              }}
            />
            <RegisterCardTextField
              color={errors.password ? "error" : "primary"}
              name={"password"}
              value={passwordValue}
              onInput={handleChange}
              variant={"outlined"}
              label={"Password"}
              type={"password"}
              autoComplete={"new-password"}
              margin={"normal"}
              error={!!errors.password}
              helperText={errors.password}
              disabled={registerRequestLoading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position={"start"}>
                    <Icon>
                      <VpnKey />
                    </Icon>
                  </InputAdornment>
                ),
              }}
            />
            <RegisterCardTextField
              color={errors.passwordConfirm ? "error" : "primary"}
              name={"passwordConfirm"}
              value={passwordConfirmValue}
              onInput={handleChange}
              variant={"outlined"}
              label={"Password confirmation"}
              type={"password"}
              autoComplete={"new-password"}
              margin={"normal"}
              error={!!errors.passwordConfirm}
              helperText={errors.passwordConfirm}
              disabled={registerRequestLoading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position={"start"}>
                    <Icon>
                      <VpnKey />
                    </Icon>
                  </InputAdornment>
                ),
              }}
            />

            {registerRequestError && (
              <Typography color={"error"} variant={"body2"}>
                {registerRequestError}
              </Typography>
            )}
          </Stack>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => navigate("/auth/login")}
            disabled={registerRequestLoading}
          >
            Login
          </Button>
          <Box flexGrow={1} />
          <Button disabled={registerRequestLoading} type={"submit"}>
            Register
          </Button>
        </CardActions>
      </RegisterCard>
    </RegisterForm>
  );
};

export const mapStateToProps = (
  state: TRootState
): TRegisterPageStateProps => ({
  isLogged: isLoggedInSelector(state),
  registerRequestLoading: registerRequestLoadingSelector(state),
  registerRequestError: registerRequestErrorSelector(state),
});

export const mapDispatchToProps = (
  dispatch: TAppDispatch
): TRegisterPageDispatchProps => ({
  runRegister: (username: string, email: string, password: string) =>
    dispatch(runRegister({ username, email, password })),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
