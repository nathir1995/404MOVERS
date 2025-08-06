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
  items: navItems,
  setSidebarOpen,
}: IProps & { items: NavItem[] }) => {
  const router = useRouter();

  return (
    <>
      {navItems.map((nav) => (
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

  return (
    <>
      <ListOfLinks
        items={commonNavigationConfig}
        setSidebarOpen={setSidebarOpen}
      />

      {showNeedAuth && (
        <ListOfLinks
          items={needAuthNavigationConfig}
          setSidebarOpen={setSidebarOpen}
        />
      )}
      {showNotNeedAuth && (
        <ListOfLinks
          items={notNeedAuthNavigationConfig}
          setSidebarOpen={setSidebarOpen}
        />
      )}
    </>
  );
};

export default LinksElements;
