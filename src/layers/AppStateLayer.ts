import { defineLayer } from "@effuse/core";
import { setAppReady } from "../store/app";
import { logger } from "../utils/logger";

export const AppStateLayer = defineLayer({
  name: "appState",
  provides: {
    appStore: () => import("../store/app").then((m) => m.appStore),
  },
  setup: () => {
    setTimeout(() => {
      setAppReady();
    }, 1000);

    return () => {
      logger.info("AppStateLayer cleanup", { tag: "AppStateLayer" });
    };
  },
});
