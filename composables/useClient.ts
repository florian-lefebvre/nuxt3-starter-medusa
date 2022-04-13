import Medusa from "@medusajs/medusa-js";

const BACKEND_URL =
  process.env.NUXT_PUBLIC_MEDUSA_URL || "http://localhost:9000";

export default new Medusa({ baseUrl: BACKEND_URL, maxRetries: 2 });
