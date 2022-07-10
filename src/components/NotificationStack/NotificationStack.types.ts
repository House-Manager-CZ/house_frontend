import { TAlert } from "../../helpers/alertService/alertService";

export type TNotificationStackHook = {
  alerts: Array<TAlert>;
  handleAlertClose: (alert: TAlert) => void;
};
