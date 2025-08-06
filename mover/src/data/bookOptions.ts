import { IconType } from "react-icons";
import { MdApartment, MdStore } from "react-icons/md";
import { FaTruck } from "react-icons/fa";
import { BiSolidUser, BiSolidStore } from "react-icons/bi";

export interface BookOption {
  title: string;
  description: string;
  Icon: IconType;
}

const bookOptions: BookOption[] = [
  {
    title: "Apartment Move",
    description: "For moving house items",
    Icon: MdApartment,
  },
  {
    title: "Move a Few Items",
    description: "Move only a few items",
    Icon: FaTruck,
  },
  {
    title: "Purchase Delivery",
    description: "For marketplace and stores",
    Icon: BiSolidStore,
  },
  {
    title: "Labor Only",
    description: "Hire only labor to move your stuff",
    Icon: BiSolidUser,
  },
];
export default bookOptions;
