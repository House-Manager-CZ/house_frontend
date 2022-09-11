import { styled, TableBody } from "@mui/material";

export const MembersTableBody = styled(TableBody)({
  "& .MuiTableRow-root": {
    "&:last-child": {
      "& .MuiTableCell-root": {
        borderBottom: 0,
      },
    },
  },
});
