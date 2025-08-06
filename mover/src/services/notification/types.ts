import NotificationItem from "@/models/notification";

export type Page = {
  notification_number: number;
  notifications: {
    data: NotificationItem[];
    current_page: number;
    last_page: number;
    total: number;
    total_unread_notifications: number;
  };
};

export type IndexResponseType = {
  data: Page;
};
