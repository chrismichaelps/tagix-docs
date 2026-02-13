import { define, computed } from "@effuse/core";
import { Link, useRoute } from "@effuse/router";
import { i18nStore } from "../../store/appI18n";
import { buildNavigation, isSlugActive } from "./utils";
import { CSS_CLASSES } from "./constants";
import type { SidebarProps, NavCategory } from "./types";
import { type SidebarScriptReturn } from "./types";

export const Sidebar = define<SidebarProps, SidebarScriptReturn>({
  script: ({ props, useStore }) => {
    const { isOpen, onClose } = props;
    const route = useRoute();
    const store = useStore("i18n") as typeof i18nStore;
    const tVal = computed(() => store.translations.value?.sidebar);

    const navigation = computed(() => buildNavigation());

    const isLinkActive = (slug: string) => isSlugActive(route.path, slug);

    const handleLinkClick = () => {
      if (onClose) onClose();
    };

    return {
      navigation,
      isLinkActive,
      isOpen,
      handleLinkClick,
      t: tVal,
    };
  },
  template: ({ navigation, isLinkActive, isOpen, handleLinkClick, t }) => (
    <aside class={`${CSS_CLASSES.SIDEBAR} ${isOpen?.value ? CSS_CLASSES.SIDEBAR_OPEN : ""}`}>
      <div class={CSS_CLASSES.SIDEBAR_HEADER}>
        <Link to="/" class={CSS_CLASSES.LOGO}>
          <div class={CSS_CLASSES.LOGO_ICON}>T</div>
          <span>Tagix</span>
        </Link>
        <button class={CSS_CLASSES.SIDEBAR_CLOSE} onClick={handleLinkClick} aria-label="Close menu">
          <img src="/icons/close.svg" alt="" width="18" height="18" />
        </button>
      </div>

      <nav class={CSS_CLASSES.NAV}>
        {() =>
          navigation.value.map((category: NavCategory) => (
            <div class={CSS_CLASSES.NAV_CATEGORY} key={category.name}>
              <h3>
                {() =>
                  t.value?.[
                    category.name.charAt(0).toLowerCase() + category.name.slice(1).replace(/ /g, "")
                  ] || category.name
                }
              </h3>
              <ul>
                {category.pages.map((page) => (
                  <li key={page.slug}>
                    <Link
                      to={`/docs/${page.slug}`}
                      class={`${CSS_CLASSES.NAV_LINK} ${isLinkActive(page.slug) ? CSS_CLASSES.NAV_LINK_ACTIVE : ""}`}
                      onClick={handleLinkClick}
                    >
                      {page.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))
        }
      </nav>
    </aside>
  ),
});

export type { SidebarProps, NavCategory, NavPage } from "./types";

export {
  SidebarState,
  type SidebarStateType,
  sidebarStore,
  setSidebarLoading,
  setSidebarReady,
  setSidebarError,
  resetSidebar,
  isSidebarReady,
  isSidebarLoading,
  isSidebarError,
} from "./state";
