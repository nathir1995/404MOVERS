import { IconType } from "react-icons";
import { FaRegCalendarCheck } from "react-icons/fa";
import { BiSolidDollarCircle, BiShieldQuarter } from "react-icons/bi";
import { RiHandHeartFill } from "react-icons/ri";

export interface AdvantageItem {
  title: string;
  description: string;
  Icon: IconType;
}

const advantageItems: AdvantageItem[] = [
  {
    title: "EASY",
    description:
      "You choose the time, and the mover will be there. Never rent or borrow a truck again.",
    Icon: FaRegCalendarCheck,
  },
  {
    title: "AFFORDABLE",
    description:
      "Find out the cost upfront without any hidden fees. Much cheaper than most other alternatives.",
    Icon: BiSolidDollarCircle,
  },
  {
    title: "SAFE",
    description:
      "All 404moves are backed by the mandatory mover's commerical liability insurance & cargo insurance.",
    Icon: BiShieldQuarter,
  },
  {
    title: "RELIABLE",
    description:
      "You can view the reviews of your a Mover. No need to text 5 movers on Facebook without any response.",
    Icon: RiHandHeartFill,
  },
];
export default advantageItems;
