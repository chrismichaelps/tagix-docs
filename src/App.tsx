import { define, Suspense } from "@effuse/core";
import { RouterView } from "@effuse/router";
import { AppLayout } from "./layers/AppLayout";

export const App = define({
  script: ({}) => {
    return {};
  },
  template: ({}) => (
    <Suspense
      fallback={
        <div class="flex items-center justify-center h-screen">
          <div class="text-center">
            <div class="animate-pulse text-2xl text-white mb-4">Loading...</div>
            <div class="text-gray-400">Loading Tagix documentation</div>
          </div>
        </div>
      }
    >
      <AppLayout>
        <RouterView />
      </AppLayout>
    </Suspense>
  ),
});
