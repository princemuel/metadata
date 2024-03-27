import alpine from "@astrojs/alpinejs";
import db from "@astrojs/db";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import qwik from "@qwikdev/astro";
import { AstroUserConfig } from "astro";
import {
  astroExpressiveCode as ec,
  type AstroExpressiveCodeOptions,
} from "astro-expressive-code";
import icon from "astro-icon";
import type { IntegrationOptions } from "astro-icon/typings/integration";
import defaultTheme from "tailwindcss/defaultTheme";
// @ts-expect-error
import simpleStackForm from "simple-stack-form";

const codeBlockOptions = {
  themes: ["github-dark", "github-light"],
  styleOverrides: {
    codeFontFamily: "__FontMono, " + defaultTheme.fontFamily.mono.join(", "),
    uiFontFamily: "__FontSans, " + defaultTheme.fontFamily.sans.join(", "),
  },
  // frames: {},
  plugins: [pluginCollapsibleSections()],
  useThemedSelectionColors: true,
  themeCssSelector: (theme) => `[data-theme='${theme.name}']`,
} satisfies AstroExpressiveCodeOptions;

const iconOptions = {
  // iconDir: "src/assets/icons",
  include: {
    lucide: ["*"],
  },
} satisfies IntegrationOptions;

export const integrations: AstroUserConfig["integrations"] = [
  db(),
  tailwind({ applyBaseStyles: false, nesting: true }),
  ec(codeBlockOptions),
  icon(iconOptions),
  mdx(),
  alpine({ entrypoint: "/src/scripts/alpinejs" }),
  qwik(),
  sitemap({
    changefreq: "daily",
    priority: 0.7,
    lastmod: new Date(),
    filter: (page) => !(page.includes("/api/") || page.includes(".xml")),
  }),
  simpleStackForm(),
];