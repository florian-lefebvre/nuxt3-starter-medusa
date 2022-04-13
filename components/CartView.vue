<template>
  <div :class="`${$style.container} ${cartView ? $style.active : null}`">
    <div :class="$style.top">
      <p>Bag</p>
      <p>
        {{ cart.items.length > 0 ? cart.items.map(quantity).reduce(sum) : 0
        }}{{ " " }}
        {{
          cart.items.length > 0 && cart.items.map(quantity).reduce(sum) === 1
            ? "item"
            : "items"
        }}
      </p>
      <button :class="$style.closebtn" @click="() => updateCartViewDisplay()">
        X
      </button>
    </div>
    <div :class="$style.overview">
      <div v-for="i in items" :class="$style.product">
        <figure @click="() => updateCartViewDisplay()">
          <NuxtLink
            :to="{
              path: `/product/[id]`,
              query: { id: i.variant.product.id },
            }"
          >
            <div class="{$style.placeholder}">
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
        <div :class="$style.controls">
          <div>
            <div>
              <NuxtLink
                :to="{
                  path: `/product/[id]`,
                  query: { id: i.variant.product.id },
                }"
              >
                {{ i.title }}
              </NuxtLink>
              <p :class="$style.size">Size: {{ i.variant.title }}</p>
              <p :class="$style.size">
                Price: {{ formatPrices(cart, i.variant) }}
              </p>
            </div>
            <div>
              <div :class="$style.mid">
                <div :class="$style.selector">
                  <button
                    :class="$style.qtybtn"
                    @click="
                      () =>
                        updateLineItem({
                          lineId: i.id,
                          quantity: i.quantity - 1,
                        })
                    "
                  >
                    -
                  </button>
                  <p :class="$style.ticker">{{ i.quantity }}</p>
                  <button
                    :class="$style.qtybtn"
                    @click="
                      () =>
                        updateLineItem({
                          lineId: i.id,
                          quantity: i.quantity + 1,
                        })
                    "
                  >
                    +
                  </button>
                </div>
              </div>
              <p>{}</p>
            </div>
          </div>
          <button :class="$style.remove" @click="() => removeLineItem(i.id)">
            Remove
          </button>
        </div>
      </div>
    </div>
    <div :class="$style.subtotal">
      <p>Subtotal (incl. taxes)</p>
      <span>
        {{ cart.region ? formatPrice(cart.subtotal, currencyCode) : 0 }}
      </span>
    </div>
    <div :class="$style.bottom">
      <button
        :class="$style.checkoutbtn"
        @click="
          () => {
            updateCheckoutStep(1);
            updateCartViewDisplay();
            router.push('/checkout');
          }
        "
        :disabled="cart.items.length < 1 ? true : false"
      >
        Checkout
      </button>
    </div>
  </div>
  );
</template>

<script setup lang="ts">
import { useDisplay } from "~/stores/useDisplay";
import { useStore } from "~/stores/useStore";

const { cartView, updateCartViewDisplay, updateCheckoutStep } = useDisplay();
const { cart, currencyCode, updateLineItem, removeLineItem } = useStore();
const { quantity, sum, formatPrice } = useHelpers();
const { formatPrices } = usePrices();
const router = useRouter();

const items = computed<any[]>(() => {
  return cart.items.sort((a, b) => {
    const createdAtA = new Date(a.created_at);
    const createdAtB = new Date(b.created_at);

    if (createdAtA < createdAtB) return -1;
    if (createdAtA > createdAtB) return 1;
    return 0;
  });
});
</script>

<style module>
.container {
  --py: 35px;

  position: fixed;
  min-width: 460px;
  height: 100vh;
  max-height: 100vh;
  -webkit-box-shadow: var(--shade);
  box-shadow: var(--shade);
  background: white;
  z-index: 11;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  justify-content: space-between;
  right: -460px;
  top: 0;
  transition: -webkit-transform 0.5s ease;
  transition: transform 0.5s ease;
  -webkit-transform: translateX(110%);
  -ms-transform: translateX(110%);
  transform: translateX(110%);
}

.active {
  -webkit-transform: translateX(-460px);
  -ms-transform: translateX(-460px);
  transform: translateX(-460px);
}

.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px var(--py);
}

.closebtn {
  background: transparent;
  border: none;
  cursor: pointer;
}

.subtotal {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px var(--py);
}

.bottom {
  padding: 15px var(--py);
}

.overview {
  flex-grow: 1;
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: var(--logo-color-400) transparent;
}

.overview::-webkit-scrollbar {
  width: 12px;
  border-radius: 12px;
}

.overview::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 12px;
}

.overview::-webkit-scrollbar-thumb {
  background-color: var(--logo-color-400);
  border-radius: 20px;
  border: 1px solid var(--bg);
}

.product {
  padding: 24px var(--py) 0;
  margin-top: 0;
  position: relative;
  min-height: 120px;
  display: flex;
}

.mid {
  display: flex;
  flex-direction: column;
}

.price {
  margin: 0;
}

.selector {
  display: flex;
  align-items: center;
}

.product figure {
  background: var(--bg);
  width: 126px;
  height: 189px;
  margin: 0;
  margin-right: 1rem;
}

.placeholder {
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.placeholder > div {
  width: 100%;
  height: 100%;
}

.controls {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.remove {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  text-align: left;
  text-decoration: underline;
  color: lightgrey;
  transition: color 0.1s ease-in;
}

.remove:hover {
  color: var(--logo-color-900);
}

.size {
  font-size: var(--fz-sm);
  color: grey;
}

.ticker {
  width: 15px;
  text-align: center;
  user-select: none;
}

.qtybtn {
  background: transparent;
  border: transparent;
  color: grey;
  transition: color 0.1s ease-in;
  cursor: pointer;
}

.qtybtn:hover {
  color: var(--logo-color-900);
}

.checkoutbtn {
  width: 100%;
  font-size: 1.125rem;
  min-height: 3rem;
  padding: 0.5rem 0;
  align-self: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--logo-color-900);
  color: white;
  border-radius: 8px;
  transition: background 0.2s ease-in;
  font-weight: 500;
  cursor: pointer;
  border: none;
}

.checkoutbtn:hover {
  background: var(--logo-color-1000);
}

@media (max-width: 876px) {
  .container {
    width: 100%;
  }
}
</style>
