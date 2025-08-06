export interface NavItem {
  title: string;
  navLink: string;
  as?: "button";
  btnVariant?: "primary" | "outlined";
}

export const commonNavigationConfig: NavItem[] = [
  {
    navLink: "/more-info/individuals",
    title: "For Individuals",
  },
  {
    navLink: "/more-info/movers",
    title: "Become a Mover",
  },
  {
    navLink: "/book/get-started",
    title: "Book",
  },
];

export const needAuthNavigationConfig: NavItem[] = [
  {
    navLink: "/portal",
    title: "My Portal",
    as: "button",
    btnVariant: "outlined",
  },
];
export const notNeedAuthNavigationConfig: NavItem[] = [
  {
    navLink: "/register",
    title: "Register",
    as: "button",
    btnVariant: "outlined",
  },
  {
    navLink: "/login",
    title: "Login",
    as: "button",
    btnVariant: "primary",
  },
];
