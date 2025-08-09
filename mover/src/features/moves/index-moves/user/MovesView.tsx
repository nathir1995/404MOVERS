import React from "react";
import { a, findSafe } from "@/utils/safeArray";
import MoveCard from "@/features/moves/components/MoveCard/MoveCard";

type Props = {
  moves?: any[] | null;
  currentUserId?: number | string | null;
};

export default function MovesView({ moves, currentUserId }: Props) {
  const list = a(moves);

  if (list.length === 0) {
    return <div>No upcoming moves</div>;
  }

  return (
    <div className="grid gap-4">
      {list.map((move) => {
        const assigned = findSafe(move?.movers, (m: any) => m?.id === currentUserId);
        return (
          <MoveCard
            key={move?.id ?? Math.random()}
            move={move}
            assignedMover={assigned}
          />
        );
      })}
    </div>
  );
}
