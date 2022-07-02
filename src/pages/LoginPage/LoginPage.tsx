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
import { Mail, VpnKey } from "@mui/icons-material";
import { LoginCard, LoginCardTextField, LoginForm } from "./LoginPage.styled";
import {
  TLoginPageDispatchProps,
  TLoginPageProps,
  TLoginPageStateProps,
} from "./LoginPage.types";
import { TAppDispatch, TRootState } from "../../redux/store";
import { runLogin } from "../../redux/user";
import useLoginPage from "./useLoginPage";
import {
  loginRequestErrorSelector,
  loginRequestLoadingSelector,
} from "../../redux/user/selectors";

const LoginPage: React.FC<TLoginPageProps> = (
  props: TLoginPageProps
): React.ReactElement => {
  const { loginRequestLoading, loginRequestError } = props;

  const { emailValue, passwordValue, errors, handleChange, handleSubmit } =
    useLoginPage(props);

  return (
    <LoginForm onSubmit={handleSubmit}>
      <LoginCard variant={"outlined"}>
        <CardHeader title={"Login"} />
        <CardContent>
          <Stack direction={"column"}>
            <LoginCardTextField
              color={errors.email ? "error" : "primary"}
              name={"email"}
              value={emailValue}
              onChange={handleChange}
              variant={"outlined"}
              label={"Email"}
              type={"email"}
              autoComplete={"email"}
              margin={"dense"}
              error={!!errors.email}
              helperText={errors.email}
              disabled={loginRequestLoading}
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
            <LoginCardTextField
              color={errors.password ? "error" : "primary"}
              name={"password"}
              value={passwordValue}
              onInput={handleChange}
              variant={"outlined"}
              label={"Password"}
              type={"password"}
              autoComplete={"current-password"}
              margin={"normal"}
              error={!!errors.password}
              helperText={errors.password}
              disabled={loginRequestLoading}
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

            {loginRequestError && (
              <Typography color={"error"} variant={"body2"}>
                {loginRequestError}
              </Typography>
            )}
          </Stack>
        </CardContent>
        <CardActions>
          <Button>Register</Button>
          <Box flexGrow={1} />
          <Button disabled={loginRequestLoading} type={"submit"}>
            Login
          </Button>
        </CardActions>
      </LoginCard>
    </LoginForm>
  );
};

const mapStateToProps = (state: TRootState): TLoginPageStateProps => ({
  loginRequestLoading: loginRequestLoadingSelector(state),
  loginRequestError: loginRequestErrorSelector(state),
});

const mapDispatchToProps = (
  dispatch: TAppDispatch
): TLoginPageDispatchProps => ({
  runLogin: (email: string, password: string) =>
    dispatch(runLogin({ email, password })),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
