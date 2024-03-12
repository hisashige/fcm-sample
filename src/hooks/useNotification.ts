import { useCallback, useEffect, useState } from "react";
import { requestNotificationPermission } from "../lib/firebase";

export function useNotification() {
  const [permission, setPermission] = useState<
    NotificationPermission | "not-supported"
  >("default");

  const revalidate = useCallback(() => {
    if ("Notification" in window) {
      setPermission(Notification.permission);
    } else {
      setPermission("not-supported");
    }
  }, []);

  useEffect(() => {
    revalidate();
  }, [revalidate]);

  const [isRequesting, setIsRequesting] = useState(false);

  const requestPermission = useCallback(() => {
    setIsRequesting(true);

    return requestNotificationPermission().finally(() => {
      revalidate();
      setIsRequesting(false);
    });
  }, [revalidate]);

  return { permission, requestPermission, isRequesting };
}
