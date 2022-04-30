import { defineNuxtModule } from "@nuxt/kit";
import { resolve } from "path";
import { fileURLToPath } from "url";

export default defineNuxtModule({
  meta: {
    name: "harlem-auto-imports",
  },
  setup(options, nuxt) {
    const storesDir = fileURLToPath(new URL("../stores", import.meta.url));
    nuxt.options.build.transpile.push(storesDir);
    nuxt.hook("autoImports:dirs", (dirs) => {
      dirs.push(storesDir);
    });
  },
});
