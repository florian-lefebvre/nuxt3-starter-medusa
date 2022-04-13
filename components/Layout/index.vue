<template>
  <div :class="cartView ? $style.noscroll : null">
    <CartView />
    <LayoutBlur />
    <LayoutNavBar />
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useDisplay } from "~/stores/useDisplay";

const { cartView } = useDisplay();
</script>

<style module>
.noscroll {
  overflow: hidden;
  height: 100vh;
}
</style>
