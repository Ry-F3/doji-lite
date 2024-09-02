import React from "react";
import SvgColor from "../components/svg-color/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const authenticatedNavConfig = (handleSignOut) => [
  {
    title: "dashboard",
    path: "/dashboard",
    icon: icon("ic_analytics"),
  },
  {
    title: "user",
    path: "/user",
    icon: icon("ic_user"),
  },
  {
    title: "product",
    path: "/products",
    icon: icon("ic_cart"),
  },
  {
    title: "blog",
    path: "/blog",
    icon: icon("ic_blog"),
  },
  {
    title: "logout",
    onClick: handleSignOut,
    icon: icon("ic_lock"),
  },
  {
    title: "Not found",
    path: "/404",
    icon: icon("ic_disabled"),
  },
];

const unauthenticatedNavConfig = [
  {
    title: "sign in",
    path: "/signin",
    icon: icon("ic_lock"),
  },
  {
    title: "sign up",
    path: "/signup",
    icon: icon("ic_lock"),
  },
  {
    title: "Not found",
    path: "/404",
    icon: icon("ic_disabled"),
  },
];

export { authenticatedNavConfig, unauthenticatedNavConfig };
