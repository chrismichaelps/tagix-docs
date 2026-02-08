import { define } from "@effuse/core";

export const Loading = define({
  script: () => ({}),
  template: () => (
    <div class="tagix-releases-loading">
      <div class="tagix-spinner"></div>
      Loading changelog...
    </div>
  ),
});
