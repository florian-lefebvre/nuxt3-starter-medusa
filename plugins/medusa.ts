import { $medusa, setMedusa } from "~/utils/medusa";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public;
  setMedusa(config.BACKEND_URL);
  return {
    provide: {
      medusa: $medusa,
    },
  };
});
