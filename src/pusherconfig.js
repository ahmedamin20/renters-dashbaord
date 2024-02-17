import Pusher from "pusher-js";
// import { handleSound } from "./components/NotificationsBox/NotificationsBox";
const user_id = localStorage.getItem("user_id");
const token = localStorage.getItem("token");

let pusherInstance = null;

Pusher.logToConsole = false;
const initializePusher = () => {
  if (!pusherInstance) {
    pusherInstance = new Pusher(import.meta.env.VITE_PUBLIC_KEY, {
      cluster: import.meta.env.VITE_CLUSTER,
      channelAuthorization: {
        endpoint: import.meta.env.VITE_AUTH_ENDPOINT,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
  } else {
    return pusherInstance;
  }
};

export const getPusherInstance = () => {
  if (!pusherInstance) {
    initializePusher();
  }

  return pusherInstance;
};
