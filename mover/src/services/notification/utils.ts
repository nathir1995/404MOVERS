// import React from "react";
import { Page } from "./types";
// import NotificationItem from "@/models/notification";
import useAuth from "@/features/auth/utils/useAuth";

export const useUserId = (): number | undefined => {
  const { user } = useAuth();
  let userId: number | undefined;
  if (user && user["id"]) {
    userId = user["id"];
  }

  return userId;
};

// export const receiveNewNotification = (
//   newItem: NotificationItem,
//   pages: undefined | Page[]
// ) => {
//   if (!pages) return [newItem];
//   return pages?.map((page) => ({
//     ...page,
//     notification_number: page.notification_number + 1,
//     data: {
//       ...page.data,
//       data: [newItem, ...page.data],
//     },
//   }));
// };

export const MarkAsReadPagesUpdater = (id: string, pages: undefined | Page[]) =>
  pages?.map((page) => ({
    ...page,
    notification_number: page.notification_number - 1,
    data: {
      // @ts-ignore
      ...page.data,
      // @ts-ignore
      data: page.data.data.map((item) =>
        item.id !== id ? item : { ...item, read: 1 }
      ),
    },
  }));

// export const MarkAllAsReadPagesUpdater = (pages: undefined | Page[]) =>
//   pages?.map((page) => ({
//     ...page,
//     notification_number: 0,
//     data: {
//       ...page.data,
//       data: page.data.map((item) => ({ ...item, read: "1" })),
//     },
//   }));

// export const useNotificationAudioPlayer = () => {
//   return React.useRef<HTMLAudioElement | undefined>(
//     typeof Audio !== "undefined"
//       ? new Audio("/assets/sounds/notification-sound.mp3")
//       : undefined
//   );
// };
