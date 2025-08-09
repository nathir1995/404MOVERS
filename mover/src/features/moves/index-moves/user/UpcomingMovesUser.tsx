import React from "react";
import { useGetUpcomingMoves } from "./api"; // existing hook
import useDataToMoves from "../utils/useDataToMoves";
import MovesView from "./MovesView";
import useAuth from "@/features/auth/utils/useAuth";

export default function UpcomingMovesUser() {
  const { data, isLoading, isError } = useGetUpcomingMoves();
  const { user } = useAuth();

  const moves = useDataToMoves<any>(data);
  const currentUserId = user?.id ?? null;

  if (isLoading) return <div>Loading upcoming moves…</div>;
  if (isError) return <div>Failed to load moves. Please try again.</div>;

  return <MovesView moves={moves} currentUserId={currentUserId} />;
}
