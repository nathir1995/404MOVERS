import React from "react";
import Navbar from "./Navbar";

import styles from "./UserLayout.module.scss";
import { useSidebar } from "@/hooks/useSidebar";
// import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useRouter } from "next/router";
import { MdClose } from "react-icons/md";
import Link from "next/link";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { ROLE } from "@/constants/roles";

import Button from "@/components/Button";
import sm from "@/configs/site-map";
import { FaTruck } from "react-icons/fa";
import userNavigationConfig from "@/configs/navigation/userNavigationConfig";
import moverNavigationConfig from "@/configs/navigation/moverNavigationConfig";
import { NavItem } from "@/configs/navigation/navigation.type";
import VerticalSidebar from "./VerticalSidebar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "@/features/auth/utils/useAuth";

type IProps = {
  children: React.ReactNode;
};

const UserLayout = ({ children }: IProps) => {
  const { role } = useAuth();

  const sidebar = useSidebar();
  const asideRef = React.useRef(null);
  useOnClickOutside(asideRef, () => {
    if (sidebar.sidebarOpen) {
      sidebar.setSidebarOpen(false);
    }
  });

  const router = useRouter();
  React.useEffect(() => {
    sidebar.setSidebarOpen(false);
    //eslint-disable-next-line
  }, [router.asPath]);

  let navigationConfig: NavItem[] = [];
  if (role === ROLE.USER) {
    navigationConfig = userNavigationConfig;
  }
  if (role === ROLE.DRIVER || role === ROLE.LABOR) {
    navigationConfig = moverNavigationConfig;
  }

  return (
    <>
      {role === ROLE.USER && (
        <Link
          href={sm.portal.user.moves.book.url}
          className={styles.floating_btn_wrapper}
        >
          <Button className={styles.floating_btn}>
            <FaTruck size={24} />
          </Button>
        </Link>
      )}
      <div className={styles.user_layout_page}>
        <div className="user_layout_page_content">
          <Navbar {...sidebar} />
          <div>
            <div className={styles.content}>
              <aside
                className={`${sidebar.sidebarOpen ? styles.open : ""}`}
                ref={asideRef}
              >
                <VerticalSidebar navigationConfig={navigationConfig} />

                {sidebar.sidebarOpen && (
                  <MdClose
                    size={22}
                    style={{ cursor: "pointer", color: "#fff" }}
                    onClick={() => sidebar.setSidebarOpen(false)}
                    className={styles.close_icon}
                  />
                )}
              </aside>
              <main>{children}</main>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default UserLayout;
