import { defineNuxtConfig } from "nuxt/config";
import graphqlLoader from "vite-plugin-graphql-loader";

export default defineNuxtConfig({
  srcDir: "src",
  css: ["water.css/out/light.css"],
  build: {
    transpile: ["@urql/vue"]
  },
  telemetry: false,
  vite: {
    plugins: [
      graphqlLoader()
    ]
  }
});
