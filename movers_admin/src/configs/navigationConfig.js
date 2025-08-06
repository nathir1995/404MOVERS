import React from "react";

import { Home } from "react-feather";
import { MdManageAccounts } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
// import { FaTruck } from "react-icons/fa";
import { FaPeopleCarryBox } from "react-icons/fa6";
import { FiPackage, FiSettings } from "react-icons/fi";
import { FaTruck } from "react-icons/fa6";

import { Routes } from "./Routes";

const navigationConfig = [
  {
    id: "home",
    title: "home",
    type: "item",
    icon: <Home size={20} />,
    navLink: Routes.home.url,
  },
  {
    id: "moves",
    title: "moves",
    type: "item",
    icon: <FaTruck size={20} />,
    navLink: Routes.moves.url,
  },
  {
    id: "move_packages",
    title: "move_packages",
    type: "item",
    icon: <FiPackage size={20} />,
    navLink: Routes.move_packages.url,
  },
  {
    id: "accounts",
    title: "accounts",
    type: "collapse",
    icon: <MdManageAccounts size={20} />,
    children: [
      {
        id: "users",
        title: "users",
        type: "item",
        icon: <HiUsers size={20} />,
        navLink: Routes.users.url,
      },
      // {
      //   id: "drivers",
      //   title: "drivers",
      //   type: "item",
      //   icon: <FaTruck size={20} />,
      //   navLink: Routes.drivers.url,
      // },
      // {
      //   id: "labors",
      //   title: "labors",
      //   type: "item",
      //   icon: <FaPeopleCarryBox size={20} />,
      //   navLink: Routes.labors.url,
      // },
      {
        id: "movers",
        title: "movers",
        type: "item",
        icon: <FaPeopleCarryBox size={20} />,
        navLink: Routes.movers.url,
      },
    ],
  },
  {
    id: "settings",
    title: "settings",
    type: "item",
    icon: <FiSettings size={20} />,
    navLink: Routes.settings.url,
  },
];

export default navigationConfig;
