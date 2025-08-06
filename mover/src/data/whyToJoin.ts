import { IconType } from "react-icons";
import { MdBusinessCenter } from "react-icons/md";
import { BiSolidDollarCircle } from "react-icons/bi";
import { FcManager } from "react-icons/fc";

export interface JoinItem {
  title: string;
  description: string;
  Icon: IconType;
}

const whyToJoinItems: JoinItem[] = [
  {
    title: "Guaranteed High Income",
    description:
      "See how much you'll earn before requesting a 404MOVERS and receive 100% of tips! Top Movers can earn over $1,000 per week.",
    Icon: BiSolidDollarCircle,
  },
  {
    title: "Build Your Own Business",
    description:
      "Be your own boss and quickly grow your business with consistent, well-paying job, and live notifications when new 404MOVERS are requested in your area",
    Icon: MdBusinessCenter,
  },
  {
    title: "Work At Your Own Pace",
    description:
      "Work at your own pace and as you'd like. You have full control over your tasks and which ones you choose to take on.",
    Icon: FcManager,
  },
];
export default whyToJoinItems;
