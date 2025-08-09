import { ROLE } from "@/constants/roles";
import { User } from "@/features/auth/utils/AuthContextType";

export const filterAcceptedMovers = (
  movers: User[] | undefined | null,
  moverType: ROLE.DRIVER | ROLE.LABOR
): User[] => {
  if (!movers || !Array.isArray(movers)) {
    return [];
  }
  
  return movers.filter((mover) => {
    return mover?.user_role?.key === moverType;
  });
};
