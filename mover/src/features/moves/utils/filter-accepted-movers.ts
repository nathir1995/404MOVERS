import { ROLE } from "@/constants/roles";
import { User } from "@/features/auth/utils/AuthContextType";

export const filterAcceptedMovers = (
  movers: User[],
  moverType: ROLE.DRIVER | ROLE.LABOR
): User[] => movers.filter((mover) => mover.user_role.key === moverType);
