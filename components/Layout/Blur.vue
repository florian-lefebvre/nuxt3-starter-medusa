<template>
  <div
    :class="`${$style.blur} ${cartView ? $style.active : null}`"
    :onClick="() => updateCartViewDisplay()"
    @keydown="() => updateCartViewDisplay()"
    role="button"
    tabIndex="-1"
    aria-label="Close cart view"
  ></div>
</template>

<script setup lang="ts">
import { useDisplay } from "~/stores/useDisplay";

const { cartView, updateCartViewDisplay } = useDisplay();
</script>

<style module>
.blur {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  z-index: 10;
}

.active {
  opacity: 1;
  visibility: visible;
}
</style>
