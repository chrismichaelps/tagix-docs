import { defineLayer } from "@effuse/core";
import { createRouter, createWebHistory, installRouter, type RouteRecord } from "@effuse/router";
import { HomePage } from "../pages/Home";
import { DocsPage } from "../pages/DocsPage";
import { NotFoundPage } from "../pages/NotFound";
import { TermsPage } from "../pages/Legal/Terms";
import { PrivacyPage } from "../pages/Legal/Privacy";
import { DisclaimerPage } from "../pages/Legal/Disclaimer";
import { ContactPage } from "../pages/Legal/Contact";
import { ApiPage } from "../pages/ApiPage";
import { logger } from "../utils/logger";

const routes: RouteRecord[] = [
  { path: "/", name: "home", component: HomePage },
  { path: "/api", name: "api", component: ApiPage },
  { path: "/terms", name: "terms", component: TermsPage },
  { path: "/privacy", name: "privacy", component: PrivacyPage },
  { path: "/disclaimer", name: "disclaimer", component: DisclaimerPage },
  { path: "/contact", name: "contact", component: ContactPage },
  {
    path: "/docs*",
    name: "docs",
    component: DocsPage,
  },
  { path: "*", name: "not-found", component: NotFoundPage },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export const RouterLayer = defineLayer({
  name: "router",
  dependencies: ["layout"],
  provides: {
    router: () => router,
  },
  onMount: () => {
    logger.info("RouterLayer mounted", { tag: "RouterLayer" });
  },
  setup: () => {
    installRouter(router);
    return () => {
      logger.info("RouterLayer cleanup", { tag: "RouterLayer" });
    };
  },
});

DocsPage;
