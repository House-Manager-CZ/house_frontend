import { Card, styled, TextField } from "@mui/material";

export const RegisterForm = styled("form")({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export const RegisterCard = styled(Card)({
  width: "90%",
  maxWidth: "500px",
});

export const RegisterCardTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input, & .MuiOutlinedInput-input": {
    borderRadius: 0,
    "&:-webkit-autofill": {
      WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.default} inset !important`,

      "&:hover, &:focus, &:active": {
        WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.default} inset !important`,
      },
    },
  },
}));
