/**
 * Single source of truth for site navigation paths.
 * Use in Header, Footer, and anywhere links need to match routes in App.js.
 */
export const ROUTES = {
  home: {
    path: "/",
    label: "Home",
    labelHi: "होम",
  },
  services: {
    path: "/ngo-service-page",
    label: "NGO Work",
    labelHi: "NGO कार्य",
    aliases: ["/online-tech-services"],
  },
  family: {
    path: "/ngo-family-page",
    label: "NGO Family",
    labelHi: "NGO परिवार",
  },
  news: {
    path: "/ngo-latest-news-blog",
    label: "News",
    labelHi: "समाचार",
  },
  about: {
    path: "/india-ngo-about",
    label: "About",
    labelHi: "हमारे बारे में",
  },
  blog: {
    path: "/ngo-blog",
    label: "Blog",
    labelHi: "ब्लॉग",
  },
  join: {
    path: "/online-connectus",
    label: "Join Us",
    labelHi: "हमसे जुड़ें",
  },
  contact: {
    path: "/india-ngo-contact",
    label: "Contact",
    labelHi: "संपर्क",
  },
  donate: {
    path: "/ngo-donate",
    label: "Donate",
    labelHi: "दान करें",
    cta: true,
  },
};

/** Main header navigation — order matters */
export const HEADER_NAV = [
  ROUTES.services,
  ROUTES.family,
  ROUTES.news,
  ROUTES.about,
  ROUTES.blog,
  ROUTES.join,
  ROUTES.contact,
  ROUTES.donate,
];

/** Footer quick links */
export const FOOTER_NAV = [
  ROUTES.home,
  ROUTES.about,
  ROUTES.services,
  ROUTES.family,
  ROUTES.news,
  ROUTES.blog,
  ROUTES.join,
  ROUTES.donate,
  ROUTES.contact,
];

/** All paths that belong to a route (primary + aliases) */
export function getRoutePaths(routeKey) {
  const route = ROUTES[routeKey];
  if (!route) return [];
  return [route.path, ...(route.aliases || [])];
}

/** Check if current pathname matches a route */
export function isRouteActive(pathname, routeKey) {
  const route = ROUTES[routeKey];
  if (!route) return false;
  const paths = [route.path, ...(route.aliases || [])];
  return paths.some(
    (path) =>
      pathname === path ||
      (path !== "/" && pathname.startsWith(`${path}/`))
  );
}

/** Match any configured route from pathname */
export function isNavPathActive(pathname, route) {
  const paths = [route.path, ...(route.aliases || [])];
  return paths.some(
    (path) =>
      pathname === path ||
      (path !== "/" && pathname.startsWith(`${path}/`))
  );
}

export function getRouteLabel(route, lang = "en") {
  return lang === "hi" && route.labelHi ? route.labelHi : route.label;
}
