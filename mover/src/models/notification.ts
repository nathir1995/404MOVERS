import { Mover } from "./Move/Move.model";

export type MoveMeta = {
  type: "move";
  type_id: number;
};

export type LocationMeta = {
  type: "location";
  type_id: number;
  longitude: number;
  latitude: number;
  user_info: Mover;
};

export type NotificationMeta = MoveMeta | LocationMeta;

type NotificationItem = {
  id: string;
  title: string;

  meta: NotificationMeta;

  notification: string;

  read: 1 | 0;
  status: 1 | 0;

  created_at: string;
};

export default NotificationItem;
