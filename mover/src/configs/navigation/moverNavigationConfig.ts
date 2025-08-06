import sm from "../site-map";
import { NavItem } from "./navigation.type";

const moverNavigationConfig: NavItem[] = [
  {
    title: "My Moves",
    url: sm.portal.mover.moves.my.url,
  },
  {
    title: "Upcoming Moves",
    url: sm.portal.mover.moves.upcoming.url,
  },
  {
    title: "Past Moves",
    url: sm.portal.mover.moves.past.url,
  },
  {
    title: "All 404 Moves",
    url: sm.portal.mover.moves.index.url,
  },
];

export default moverNavigationConfig;
