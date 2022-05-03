import { defineNuxtModule, addAutoImportDir, addAutoImport } from "@nuxt/kit";
import { fileURLToPath } from "url";

export default defineNuxtModule({
    meta: {
        name: "stores-auto-imports",
    },
    setup(options, nuxt) {
        const storesDir = fileURLToPath(new URL("../stores", import.meta.url));
        nuxt.options.build.transpile.push(storesDir);
        addAutoImportDir(storesDir);
        addAutoImport({
            name: "storeToRefs",
            as: "storeToRefs",
            from: "pinia",
        });
    },
});
