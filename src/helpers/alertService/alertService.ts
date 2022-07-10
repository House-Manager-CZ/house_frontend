import { AlertColor } from "@mui/material";
import { filter, Observable, ReplaySubject, Subject } from "rxjs";

export type TAlert = {
  id?: string;
  severity: AlertColor;
  title?: string;
  message: string;
};
export const defaultAlertId = "default";

export default class AlertService {
  private static alertSubject: Subject<TAlert> = new ReplaySubject<TAlert>(
    Infinity
  );

  public static onAlert(id = defaultAlertId): Observable<TAlert> {
    return AlertService.alertSubject
      .asObservable()
      .pipe(filter((x) => x && x.id === id));
  }

  public static alert(alert: TAlert) {
    alert.id = defaultAlertId;
    AlertService.alertSubject.next(alert);
  }
}
