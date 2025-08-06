import sm from "../site-map";
import { NavItem } from "./navigation.type";

const userNavigationConfig: NavItem[] = [
  {
    title: "Upcoming Moves",
    url: sm.portal.user.moves.upcoming.url,
  },
  {
    title: "Draft Moves",
    url: sm.portal.user.moves.draft.url,
  },
  {
    title: "Past Moves",
    url: sm.portal.user.moves.past.url,
  },
  {
    title: "All 404 Moves",
    url: sm.portal.user.moves.index.url,
  },
  {
    title: "Book a Move",
    url: sm.portal.user.moves.book.url,
  },
];

export default userNavigationConfig;
