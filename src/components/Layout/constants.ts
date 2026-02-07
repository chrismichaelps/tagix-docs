export const HEADER_CLASSES = {
  HEADER: "tagix-header",
  CONTENT: "tagix-header-content",
  LOGO: "tagix-logo",
  LOGO_IMG: "tagix-header-logo-img",
  NAV: "tagix-nav",
  NAV_LINK: "tagix-nav-link",
} as const;

export const FOOTER_CLASSES = {
  FOOTER: "tagix-footer",
  CONTENT: "tagix-footer-content",
  NAV: "tagix-footer-nav",
  SECTION: "tagix-footer-section",
  TITLE: "tagix-footer-title",
  LIST: "tagix-footer-list",
  SOCIAL_LINK: "tagix-footer-social-link",
  SOCIAL_ICON: "tagix-footer-social-icon",
  BOTTOM: "tagix-footer-bottom",
  VERSION: "tagix-footer-version",
  VERSION_ICON: "tagix-footer-version-icon",
  COPYRIGHT: "tagix-footer-copyright",
} as const;

export const ROUTES = {
  HOME: "/",
  DOCS: "/docs",
  API: "/api",
  TERMS: "/terms",
  PRIVACY: "/privacy",
  DISCLAIMER: "/disclaimer",
  CONTACT: "/contact",
} as const;

export const EXTERNAL_LINKS = {
  GITHUB: "https://github.com/chrismichaelps/tagix",
} as const;

export const ASSETS = {
  LOGO: "/illustrations/tagix_logo.svg?v=7",
  FAVICON: "/favicon.svg",
  GITHUB_ICON: "/icons/github.svg",
  EFFUSE_LOGO: "/logo-effuse.svg",
} as const;
