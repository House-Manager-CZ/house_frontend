import { ListItemButton, styled } from "@mui/material";

export const ListItemButtonLinkStyled = styled(ListItemButton)(
  ({ theme, selected }) => ({
    position: "relative",

    ...(selected && {
      "&:before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        width: theme.spacing(0.5),
        backgroundColor: theme.palette.primary.dark,
      },
    }),
  })
);
