import React from "react";

import styles from "./UserLayout.module.scss";

import { NavItem as NavItemType } from "@/configs/navigation/navigation.type";
import Link from "next/link";
import { useRouter } from "next/router";

const NavItem = ({ item }: { item: NavItemType }) => {
  const router = useRouter();
  const isActive = router.asPath === item.url;

  return (
    <li>
      <Link href={item.url} className={isActive ? styles.active : ""}>
        {item.title}
      </Link>
    </li>
  );
};

const VerticalSidebar = ({
  navigationConfig,
}: {
  navigationConfig: NavItemType[];
}) => {
  return (
    <nav className={styles.vertical_sidebar_container}>
      <ul>
        {navigationConfig.map((navItem) => (
          <NavItem key={navItem.url} item={navItem} />
        ))}
      </ul>
    </nav>
  );
};

export default VerticalSidebar;
