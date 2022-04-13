import { loadStripe } from "@stripe/stripe-js";

const STRIPE_API_KEY = process.env.NUXT_PUBLIC_STRIPE_KEY || null;
const stripePromise = loadStripe(STRIPE_API_KEY);

export default stripePromise;
