import { useCallback, useEffect, useState } from "react";
import { Subscription } from "rxjs";
import { TNotificationStackHook } from "./NotificationStack.types";
import AlertService, { TAlert } from "../../helpers/alertService/alertService";

const useNotificationStack = (): TNotificationStackHook => {
  const [alertSubscription, setAlertSubscription] = useState<
    Subscription | false
  >(false);
  const [alerts, setAlerts] = useState<Array<TAlert>>([]);

  useEffect(() => {
    if (!alertSubscription) {
      setAlertSubscription(
        AlertService.onAlert().subscribe((alert) => {
          setAlerts((prevAlerts) => [...prevAlerts, alert]);
        })
      );
    }

    return () => {
      if (alertSubscription) alertSubscription.unsubscribe();
    };
  }, [alertSubscription]);

  const handleAlertClose = useCallback(
    (alert: TAlert) => {
      setAlerts([...alerts.filter((x) => x !== alert)]);
    },
    [alerts]
  );

  return { alerts, handleAlertClose };
};

export default useNotificationStack;
