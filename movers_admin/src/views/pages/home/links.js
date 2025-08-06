import React from "react";

import { HiUsers } from "react-icons/hi";
// import { FaTruck } from "react-icons/fa";
import { FaPeopleCarryBox } from "react-icons/fa6";
import { FiPackage, FiSettings } from "react-icons/fi";
import { FaTruck } from "react-icons/fa6";

import { Routes } from "configs/Routes";

const links = [
  {
    title: "Moves",
    icon: <FaTruck size={40} />,
    navLink: Routes.moves.url,
  },
  {
    title: "Move Packages",
    icon: <FiPackage size={40} />,
    navLink: Routes.move_packages.url,
  },
  {
    title: "Users",
    icon: <HiUsers size={40} />,
    navLink: Routes.users.url,
  },
  // {
  //   title: "Drivers",
  //   icon: <FaTruck size={40} />,
  //   navLink: Routes.drivers.url,
  // },
  // {
  //   title: "Labors",
  //   icon: <FaPeopleCarryBox size={40} />,
  //   navLink: Routes.labors.url,
  // },
  {
    title: "Movers",
    icon: <FaPeopleCarryBox size={40} />,
    navLink: Routes.movers.url,
  },
  {
    title: "Settings",
    icon: <FiSettings size={40} />,
    navLink: Routes.settings.url,
  },
];

export default links;
