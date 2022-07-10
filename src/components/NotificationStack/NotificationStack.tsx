import React from "react";
import { Alert, AlertTitle } from "@mui/material";
import useNotificationStack from "./useNotificationStack";
import { TAlert } from "../../helpers/alertService/alertService";
import { NotificationStackStyled } from "./NotificationStack.styled";

const NotificationStack: React.FC = (): React.ReactElement => {
  const { alerts, handleAlertClose } = useNotificationStack();

  return (
    <NotificationStackStyled direction={"column"} spacing={2}>
      {alerts.map((alert: TAlert, i: number) => (
        <Alert
          key={`${alert.message}-${alert.id}-${i}`}
          severity={alert.severity}
          onClose={() => handleAlertClose(alert)}
          elevation={1}
        >
          {alert.title && <AlertTitle>{alert.title}</AlertTitle>}
          {alert.message}
        </Alert>
      ))}
    </NotificationStackStyled>
  );
};

export default NotificationStack;
