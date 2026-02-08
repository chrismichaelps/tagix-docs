import { Footer, Header } from "../components/Layout";

import { define } from "@effuse/core";

export const AppLayout = define({
  script: ({}) => ({}),
  template: ({ children }) => (
    <div class="min-h-screen bg-white dark:bg-black font-sans antialiased">
      <Header />
      <div class="relative flex min-h-screen flex-col">
        {children}
        <Footer />
      </div>
    </div>
  ),
});
