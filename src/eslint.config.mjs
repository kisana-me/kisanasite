import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

export default [
  {
    ignores: [
      ".next/**",
      ".open-next/**",
      ".wrangler/**",
      "generated/**",
      "node_modules/**",
      "cloudflare-env.d.ts",
      "pages/tools/markdown-editor.js",
      "lib/mds_reader.js",
      "lib/posts.js",
    ],
  },
  ...nextCoreWebVitals,
  {
    rules: {
      "react-hooks/set-state-in-effect": "warn",
    },
  },
];
