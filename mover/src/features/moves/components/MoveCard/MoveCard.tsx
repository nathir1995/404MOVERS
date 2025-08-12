import React from "react";
import { a, findSafe } from "@/utils/safeArray";
// import types as needed

export default function MoveCard({
  move,
  assignedMover,
}: {
  move: any;
  assignedMover?: any;
}) {
  const movers = a(move?.movers);
  const rooms  = a(move?.rooms);
  const items  = a(move?.items);

  // Example of safe find on static steps
  const steps = a(move?.steps); // or your constant array if applicable
  const currentStep = findSafe(steps, (s: any) => s?.value === move?.status);

  const pickup = move?.pickup_address ?? move?.pickup ?? {};
  const dropoff = move?.dropoff_address ?? move?.dropoff ?? {};

  return (
    <div>
      <h4>Move #{move?.id ?? "—"}</h4>

      <div>
        <strong>Status:</strong> {currentStep?.label ?? move?.status ?? "—"}
      </div>

      <div>
        <strong>Pickup:</strong>{" "}
        {pickup?.line1 ?? pickup?.address_line_1 ?? "—"}
      </div>

      <div>
        <strong>Dropoff:</strong>{" "}
        {dropoff?.line1 ?? dropoff?.address_line_1 ?? "—"}
      </div>

      <div>
        <strong>Assigned mover:</strong>{" "}
        {assignedMover
          ? `${assignedMover?.first_name ?? ""} ${assignedMover?.last_name ?? ""}`.trim()
          : "—"}
      </div>

      <div>
        <strong>Rooms:</strong> {rooms.length}
      </div>

      <ul>
        {safeMap(items, (it: any, i: number) => (
          <li key={it?.id ?? i}>{it?.name ?? "Item"}</li>
        ))}
      </ul>
    </div>
  );
}
