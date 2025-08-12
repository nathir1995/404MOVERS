import { ROLE } from "@/constants/roles";
import { User } from "@/features/auth/utils/AuthContextType";
import { filterSafe } from "@/utils/safeArray";

export const filterAcceptedMovers = (
  movers: User[] | undefined | null,
  moverType: ROLE.DRIVER | ROLE.LABOR
): User[] => {
  // ✅ IMPROVED: Use safe filter utility for consistency
  return filterSafe(movers, (mover) => {
    return mover?.user_role?.key === moverType;
  });
};
