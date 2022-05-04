import Medusa from "@medusajs/medusa-js";

export default defineNuxtPlugin((nuxtApp) => {
    const runtimeConfig = useRuntimeConfig();

    const client = new Medusa({
        baseUrl: runtimeConfig.public.BACKEND_URL,
        maxRetries: 2,
    });

    return {
        provide: {
            medusa: client,
        },
    };
});
