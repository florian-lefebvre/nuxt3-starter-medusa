<template>
  <div :class="$style.container">
    <NuxtLink to="/" style="width: '125px'">
      <img src="/medusa-logo.svg" height="40px" width="100%" alt="logo" />
    </NuxtLink>
    <button
      v-if="isCheckout"
      :class="$style.btn"
      @click="() => updateCartViewDisplay()"
    >
      <ShoppingBagIcon />
      <span>
        {{ cart.items.length > 0 ? cart.items.map(quantity).reduce(sum) : 0 }}
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ShoppingBagIcon } from "@heroicons/vue/outline";
import { useDisplay } from "~/stores/useDisplay";
import { useStore } from "~/stores/useStore";

const { updateCartViewDisplay } = useDisplay();
const { cart } = useStore();
const { quantity, sum } = useHelpers();
const isCheckout = ref(true);
const route = useRoute();

watch(route, (n) => {
  if (n.fullPath === "/checkout" || n.fullPath === "/payment") {
    isCheckout.value = true;
  } else {
    isCheckout.value = false;
  }
});
</script>

<style module>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 88px;
  position: absolute;
  width: 100%;
  z-index: 10;
}

.container h1 {
  margin: 0;
}

.logo {
  font-size: var(--fz-xl);
  color: var(--logo-color-900);
}

.btn {
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  font-size: var(--fz-sm);
  cursor: pointer;
}

.btn span {
  margin-left: 0.75rem;
  margin-right: 0.75rem;
}

.btn svg {
  font-size: var(--fz-ml);
}

@media (max-width: 876px) {
  .container {
    padding: 20px 22px;
  }
}
</style>
