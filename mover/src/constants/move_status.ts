export const MOVE_STATUS = {
  DRAFT: "DRAFT",
  PENDING: "PENDING",
  SCHEDULED: "SCHEDULED",
  ONGOING: "ONGOING",
  STARTED: "STARTED",
  DONE: "DONE",
} as const;

export enum MOVE_STATUS_ENUM {
  DRAFT = "DRAFT",
  PENDING = "PENDING",
  SCHEDULED = "SCHEDULED",
  ONGOING = "ONGOING",
  STARTED = "STARTED",
  DONE = "DONE",
}

export const UI_MOVE_STATUS = {
  [MOVE_STATUS_ENUM.DRAFT]: {
    label: "DRAFT",
    color: "#CCCCCC",
  },
  [MOVE_STATUS_ENUM.PENDING]: {
    label: "PENDING",
    color: "#37474f",
  },
  [MOVE_STATUS_ENUM.SCHEDULED]: {
    label: "SCHEDULED",
    color: "#FFA500",
  },
  [MOVE_STATUS_ENUM.ONGOING]: {
    label: "ONGOING",
    color: "#4169E1",
  },
  [MOVE_STATUS_ENUM.STARTED]: {
    label: "STARTED",
    color: "#FFA500",
  },
  [MOVE_STATUS_ENUM.DONE]: {
    label: "DONE",
    color: "#006400",
  },
};
