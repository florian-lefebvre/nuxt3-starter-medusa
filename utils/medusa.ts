import Medusa from "@medusajs/medusa-js";

export let $medusa: Medusa;

export const setMedusa = (baseUrl: string) => {
  $medusa = new Medusa({
    baseUrl,
    maxRetries: 2,
  });
};
