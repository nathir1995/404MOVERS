import React from "react";
import {
  NavItem,
  commonNavigationConfig,
  needAuthNavigationConfig,
  notNeedAuthNavigationConfig,
} from "@/configs/navigationConfig";
import Link from "next/link";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import styles from "./Navbar.module.scss";
import useAuth from "@/features/auth/utils/useAuth";

type IProps = {
  setSidebarOpen: (newValue: boolean) => void;
};

const ListOfLinks = ({
  items: navItems = [], // ✅ FIXED: Default empty array
  setSidebarOpen,
}: IProps & { items: NavItem[] }) => {
  const router = useRouter();

  // ✅ FIXED: Safety check for navItems
  const safeNavItems = Array.isArray(navItems) ? navItems : [];

  return (
    <>
      {safeNavItems.map((nav) => (
        <li
          key={nav.navLink}
          className={router.pathname === nav.navLink ? styles.active : ""}
        >
          <Link href={nav.navLink} onClick={() => setSidebarOpen(false)}>
            {nav.as === "button" ? (
              <Button variant={nav.btnVariant ?? "primary"}>{nav.title}</Button>
            ) : (
              nav.title
            )}
          </Link>
        </li>
      ))}
    </>
  );
};

const LinksElements = ({ setSidebarOpen }: IProps) => {
  const { isAuthenticated, loadingInitial } = useAuth();
  const showNeedAuth: boolean = !loadingInitial && isAuthenticated;
  const showNotNeedAuth: boolean = !loadingInitial && !isAuthenticated;

  // ✅ FIXED: Safety checks for navigation configs
  const safeCommonNav = Array.isArray(commonNavigationConfig) ? commonNavigationConfig : [];
  const safeNeedAuthNav = Array.isArray(needAuthNavigationConfig) ? needAuthNavigationConfig : [];
  const safeNotNeedAuthNav = Array.isArray(notNeedAuthNavigationConfig) ? notNeedAuthNavigationConfig : [];

  return (
    <>
      <ListOfLinks
        items={safeCommonNav}
        setSidebarOpen={setSidebarOpen}
      />

      {showNeedAuth && (
        <ListOfLinks
          items={safeNeedAuthNav}
          setSidebarOpen={setSidebarOpen}
        />
      )}
      {showNotNeedAuth && (
        <ListOfLinks
          items={safeNotNeedAuthNav}
          setSidebarOpen={setSidebarOpen}
        />
      )}
    </>
  );
};

export default LinksElements;
