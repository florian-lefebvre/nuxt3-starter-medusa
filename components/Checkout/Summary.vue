<template>
  <div>
    <div
      v-if="cart"
      :class="`${styles.container} ${orderSummary ? styles.active : ''}`"
    >
      <div :class="itemStyles.top">
        <p>
          <strong>Order Summary</strong>
        </p>
        <p>
          {{ cart.items.length > 0 ? cart.items.map(quantity).reduce(sum) : 0
          }}{{ " " }}
          {{
            cart.items.length > 0 && cart.items.map(quantity).reduce(sum) === 1
              ? "item"
              : "items"
          }}
        </p>
        <button
          :class="styles.closeBtn"
          @click="() => updateOrderSummaryDisplay()"
        >
          X
        </button>
      </div>
      <div :class="itemStyles.overview">
        <div v-for="i in items" :class="itemStyles.product">
          <figure>
            <NuxtLink
              :to="{
                path: `/product/[id]`,
                query: { id: i.variant.product.id },
              }"
            >
              <div :class="itemStyles.placeholder">
                <img
                  objectFit="cover"
                  height="100%"
                  width="100%"
                  :src="i.variant.product.thumbnail"
                  :alt="i.title"
                />
              </div>
            </NuxtLink>
          </figure>
          <div :class="itemStyles.controls">
            <div>
              <div>
                <NuxtLink
                  :to="{
                    path: `/product/[id]`,
                    query: { id: i.variant.product.id },
                  }"
                  passHref
                >
                  {{ i.title }}
                </NuxtLink>
                <p :class="itemStyles.size">Size: {{ i.variant.title }}</p>
                <p :class="itemStyles.size">
                  Price: {{ formatPrices(cart, i.variant) }}
                </p>
                <p :class="itemStyles.size">Quantity: {{ i.quantity }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div :class="styles.breakdown">
        <p>Subtotal (incl. taxes)</p>
        <span>
          {{
            cart.region
              ? formatPrice(cart.subtotal, cart.region.currency_code)
              : 0
          }}
        </span>
      </div>
      <div :class="styles.breakdown">
        <p>Shipping</p>
        <span>
          {{
            cart.region
              ? formatPrice(cart.shipping_total, cart.region.currency_code)
              : 0
          }}
        </span>
      </div>
      <div :class="styles.total">
        <p>Total</p>
        <span>
          {{
            cart.region ? formatPrice(cart.total, cart.region.currency_code) : 0
          }}
        </span>
      </div>
    </div>
    <div v-else :class="styles.spinnerContainer">
      <PuffLoader />
    </div>
  </div>
</template>

<script setup lang="ts">
import styles from "~/assets/css/checkout-summary.module.css";
import itemStyles from "~/assets/css/cart-view.module.css";
import { Cart } from "@medusajs/medusa";
import { useDisplay } from "~/stores/useDisplay";

const props = defineProps<{ cart?: Cart }>();

const { orderSummary, updateOrderSummaryDisplay } = useDisplay();
const { sum, quantity, formatPrice } = useHelpers();
const { formatPrices } = usePrices();

const items = computed<any[]>(() => {
  return props.cart.items.sort((a, b) => {
    const createdAtA = new Date(a.created_at);
    const createdAtB = new Date(b.created_at);

    if (createdAtA < createdAtB) return -1;
    if (createdAtA > createdAtB) return 1;
    return 0;
  });
});
</script>
