import React from "react";
import { FaBell } from "react-icons/fa6";
import styles from "./Notifications.module.scss";
import colors from "@/assets/scss/colors.module.scss";
import {
  useGetNotifications,
  useMarkNotificationAsRead,
  useNotificationCount,
} from "@/services/notification";
import usePopup from "@/hooks/usePopup";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { IoMdClose } from "react-icons/io";
import { formatDateTime } from "@/utility/date";
import { app as firebaseApp } from "@/firebase";
import { getMessaging, onMessage } from "firebase/messaging";
import useFirebaseContext from "@/firebase/FirebaseContext";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import NotificationItem, { NotificationMeta } from "@/models/notification";
import useAuth from "@/features/auth/utils/useAuth";
import { ROLE } from "@/constants/roles";
import sm from "@/configs/site-map";
import { useRouter } from "next/router";
import { safeMap, hasItems } from "@/utility/arraySafety";

const Notifications = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const notificationPopper = usePopup();
  useOnClickOutside(containerRef, notificationPopper.handleClose);
  const {
    notifications,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch,
  } = useGetNotifications();
  const total_number = useNotificationCount() || 0;

  const { fcmToken } = useFirebaseContext();
  React.useEffect(() => {
    if (typeof window !== "undefined" && fcmToken) {
      const messaging = getMessaging(firebaseApp);
      onMessage(messaging, (payload) => {
        let meta: NotificationMeta | undefined;
        try {
          meta = JSON.parse(payload.data?.meta || "");
        } catch (e) {}

        if (meta?.type === "move") {
          console.log("Message received. ", payload);
          refetch();
          toast.info(payload.notification?.title, {
            position: "bottom-right",
          });
        }
      });
    }
  }, [fcmToken]);

  const { role } = useAuth();
  const router = useRouter();
  const { mutate: markAsRead, isProcessing } = useMarkNotificationAsRead();

  const handleClick = (notification: NotificationItem) => {
    let link = "";
    if (notification.meta.type === "move") {
      const move_id = notification.meta.type_id;
      if (role === ROLE.USER) {
        link = sm.portal.user.moves.details.navLink(move_id);
      } else {
        link = sm.portal.mover.moves.details.navLink(move_id);
      }
    }
    // else if (notification.meta.type === "location") {
    //   const move_id = notification.meta.type_id;
    //   if (role === ROLE.USER) {
    //     link = sm.portal.user.moves.details.navLink(move_id) + "/track";
    //   } else {
    //     link = sm.portal.mover.moves.details.navLink(move_id);
    //   }
    // }

    notificationPopper.handleClose();
    if (notification.read === 0 && !isProcessing(notification.id)) {
      markAsRead({ id: notification.id });
    }
    if (link) {
      router.push(link);
    }
  };

  return (
    <>
      <button
        type="button"
        className={styles.button}
        onClick={notificationPopper.handleToggle}
      >
        <FaBell color={colors.text_primary} size={20} />
        {total_number > 0 && (
          <span className={styles.total_number}>
            {total_number < 100 ? total_number : "+99"}
          </span>
        )}
      </button>
      <div
        ref={containerRef}
        className={styles.popper}
        data-is-open={notificationPopper.isOpen}
      >
        <div className={styles.header}>
          <h5>Notifications ({total_number < 100 ? total_number : "+99"})</h5>
          <IoMdClose
            color="#000"
            fontSize={24}
            style={{ cursor: "pointer" }}
            onClick={notificationPopper.handleClose}
          />
        </div>
        <div className={styles.content}>
          {safeMap(notifications, (notification) => (
            <div
              key={notification.id}
              className={styles.item}
              onClick={() => handleClick(notification)}
            >
              <p
                className={styles.title}
                style={notification.read === 0 ? { fontWeight: "bold" } : {}}
              >
                {notification.title}{" "}
                {notification.read === 0 && (
                  <span className={styles.unread_dot}></span>
                )}
              </p>
              <p className={styles.description}>{notification.notification}</p>
              <p className={styles.date}>
                {formatDateTime(notification.created_at)}
              </p>
            </div>
          ))}
          {hasNextPage && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "1rem",
              }}
            >
              <Button
                type="button"
                onClick={fetchNextPage}
                isLoading={isFetchingNextPage}
                style={{ width: "100%", padding: "0.5rem" }}
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Notifications;
