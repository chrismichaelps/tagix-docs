import "@fontsource/geist-sans";
import "@fontsource/geist-mono";

import { createApp } from "@effuse/core";
import { App } from "./App";
import { RouterLayer, LayoutLayer, AppStateLayer, I18nLayer } from "./layers";
import { logger } from "./utils/logger";
import "./styles.css";

import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-markdown";

createApp(App)
  .useLayers([LayoutLayer, AppStateLayer, RouterLayer, I18nLayer])
  .then((app) => {
    app
      .mount("#app", {
        tracing: {
          enabled: import.meta.env.DEV,
          serviceName: "tagix-docs",
          console: true,
          verbose: false,
        },
      })
      .then(() => logger.info("App mounted", { tag: "App" }))
      .catch((err) => logger.error(err, { tag: "App" }));
  });
