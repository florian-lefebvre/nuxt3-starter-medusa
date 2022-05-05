<template>
    <div>
        <div>FAQ</div>
        <div>{{ cartView }}</div>
        <button @click="updateCartViewDisplay()">UPDATE</button>
    </div>
</template>
+

<script setup lang="ts">
import { useDisplayRefs } from "~/types/stores";

const display = useDisplay();
const { cartView }: useDisplayRefs = storeToRefs(display);
const { updateCartViewDisplay } = display;
</script>
