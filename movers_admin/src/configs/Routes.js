import { lazy } from "react";

export const Routes = {
  home: {
    url: `/`,
    component: lazy(() => import("views/pages/home/HomePage")),
    isPrivate: true,
    exact: true,
  },

  // =============== Moves ===============
  moves: {
    url: `/moves`,
    component: lazy(() => import("views/pages/moves/all/MovesPage")),
    isPrivate: true,
    exact: true,
  },
  move_details: {
    url: `/moves/:move_id`,
    navTo: (move_id) => `/moves/${move_id}`,
    component: lazy(() => import("views/pages/moves/details/MoveDetailsPage")),
    isPrivate: true,
    exact: true,
  },

  // =============== Move Packages ===============
  move_packages: {
    url: `/move-packages`,
    component: lazy(() =>
      import("views/pages/move-packages/all/MovePackagesPage")
    ),
    isPrivate: true,
    exact: true,
  },
  add_move_package: {
    url: `/move-packages/add`,
    component: lazy(() =>
      import("views/pages/move-packages/add/AddMovePackagePage")
    ),
    isPrivate: true,
    exact: true,
  },
  move_package_details: {
    url: `/move-packages/:package_id`,
    navTo: (package_id) => `/move-packages/${package_id}`,
    component: lazy(() =>
      import("views/pages/move-packages/details/MovePackageDetailsPage")
    ),
    isPrivate: true,
    exact: true,
  },

  // =============== Accounts ===============
  users: {
    url: `/accounts/users`,
    component: lazy(() => import("views/pages/accounts/users/all/UsersPage")),
    isPrivate: true,
    exact: true,
  },
  user_details: {
    url: `/accounts/users/:user_id`,
    navTo: (user_id) => `/accounts/users/${user_id}`,
    component: lazy(() =>
      import("views/pages/accounts/users/details/UserDetailsPage")
    ),
    isPrivate: true,
    exact: true,
  },
  drivers: {
    url: `/accounts/drivers`,
    component: lazy(() =>
      import("views/pages/accounts/drivers/all/DriversPage")
    ),
    isPrivate: true,
    exact: true,
  },
  driver_details: {
    url: `/accounts/drivers/:driver_id`,
    navTo: (driver_id) => `/accounts/drivers/${driver_id}`,
    component: lazy(() =>
      import("views/pages/accounts/drivers/details/DriverDetailsPage")
    ),
    isPrivate: true,
    exact: true,
  },
  labors: {
    url: `/accounts/labors`,
    component: lazy(() => import("views/pages/accounts/labors/all/LaborsPage")),
    isPrivate: true,
    exact: true,
  },
  labor_details: {
    url: `/accounts/labors/:labor_id`,
    navTo: (labor_id) => `/accounts/labors/${labor_id}`,
    component: lazy(() =>
      import("views/pages/accounts/labors/details/LaborDetailsPage")
    ),
    isPrivate: true,
    exact: true,
  },
  movers: {
    url: `/accounts/movers`,
    component: lazy(() => import("views/pages/accounts/movers/all/MoversPage")),
    isPrivate: true,
    exact: true,
  },

  // =============== Setting ===============
  settings: {
    url: `/settings`,
    component: lazy(() => import("views/pages/settings/SettingsPage")),
    isPrivate: true,
    exact: true,
  },

  login: {
    url: `/login`,
    component: lazy(() => import("views/pages/authentication/login/Login")),
    fullLayout: true,
  },
  not_authorized: {
    url: `/misc/not-authorized`,
    component: lazy(() => import("views/pages/misc/NotAuthorized")),
    fullLayout: true,
  },
};
