import { MOVE_STATUS } from "@/constants/move_status";
import { ROLE } from "@/constants/roles";
import { User } from "@/features/auth/utils/AuthContextType";
import Move from "@/models/Move/Move.model";
import { findSafe } from "@/utils/safeArray";

export const isUserAlreadyAcceptedMove = (user: User, move: Move): boolean => {
  if (!user?.id || !move || move === null) {
    return false;
  }
  
  return findSafe(move.movers, (mover) => mover.id === user.id) !== undefined;
};

export const isRemainingDrivers = (move: Move): boolean => {
  if (!move?.remaining_number_of_drivers) return false;
  // @ts-ignore
  return parseInt(move.remaining_number_of_drivers) > 0;
};

export const isRemainingLabors = (move: Move): boolean => {
  if (!move?.remaining_number_of_labors) return false;
  // @ts-ignore
  return parseInt(move.remaining_number_of_labors) > 0;
};

export const checkIfMoverCanAccept = (
  move: Move,
  role: ROLE,
  user: User
): boolean => {
  if (!move || move === null || !user) return false;
  
  if (move.move_status.key !== MOVE_STATUS.PENDING) {
    return false;
  }

  if (role !== ROLE.DRIVER && role !== ROLE.LABOR) {
    return false;
  }

  if (isUserAlreadyAcceptedMove(user, move)) {
    return false;
  }

  if (role === ROLE.DRIVER && isRemainingDrivers(move)) {
    return true;
  }

  if (role === ROLE.LABOR && isRemainingLabors(move)) {
    return true;
  }

  return false;
};

export const checkIfMoverCanStart = (
  move: Move,
  role: ROLE,
  user: User
): boolean => {
  if (!move || move === null || !user?.id) {
    return false;
  }

  if (role !== ROLE.DRIVER && role !== ROLE.LABOR) {
    return false;
  }

  const targetMover = findSafe(move.movers, (mover) => mover.id === user.id);
  if (!targetMover) {
    return false;
  }

  return !targetMover.pivot.is_started;
};

export const checkIfMoverCanFinish = (
  move: Move,
  role: ROLE,
  user: User
): boolean => {
  if (!move || move === null || !user?.id) {
    return false;
  }

  if (role !== ROLE.DRIVER && role !== ROLE.LABOR) {
    return false;
  }

  const targetMover = findSafe(move.movers, (mover) => mover.id === user.id);
  if (!targetMover) {
    return false;
  }

  return targetMover.pivot.is_started && !targetMover.pivot.is_finished;
};

export const checkIfMoverShouldStreamLocation = (
  move: Move,
  role: ROLE,
  user: User
): boolean => {
  if (!move || move === null || !user?.id) {
    return false;
  }

  if (role !== ROLE.DRIVER && role !== ROLE.LABOR) {
    return false;
  }

  const targetMover = findSafe(move.movers, (mover) => mover.id === user.id);
  if (!targetMover) {
    return false;
  }

  return targetMover.pivot.is_started && !targetMover.pivot.is_finished;
};
