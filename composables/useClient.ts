import Medusa from "@medusajs/medusa-js";

export const BACKEND_URL =
  process.env.NUXT_PUBLIC_MEDUSA_URL || "http://localhost:9000";

let client: Medusa;

export const createClient = () => {
  client = new Medusa({ baseUrl: BACKEND_URL, maxRetries: 2 });
};

export default client;
