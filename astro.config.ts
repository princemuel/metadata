import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import { environment } from "./plugins/environment";
import { integrations } from "./plugins/integrations";
import { rehypePlugins } from "./plugins/rehype";
import { remarkPlugins } from "./plugins/remark";

const mode = process.env.NODE_ENV ?? "production";
const envVars = loadEnv(mode, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  srcDir: "./app",
  site: envVars.PUBLIC_SITE_URL,
  experimental: {
    actions: true,
    globalRoutePriority: true,
    contentCollectionCache: true,
    serverIslands: true,
    contentIntellisense: true,
    contentLayer: true,
    directRenderScript: true,
    env: environment,
  },
  security: { checkOrigin: true },
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: remarkPlugins,
    rehypePlugins: rehypePlugins,
  },
  integrations: [...integrations],
  adapter: vercel({
    edgeMiddleware: true,
    functionPerRoute: false,
    imageService: true,
    webAnalytics: {
      enabled: envVars.NODE_ENV === "production",
    },
  }),
});
