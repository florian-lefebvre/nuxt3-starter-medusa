<template>
    <div>
        <div>FAQ</div>
        <div>{{ cartView }}</div>
        <button @click="updateCartViewDisplay()">UPDATE</button>
    </div>
</template>
+

<script setup lang="ts">
const display = useDisplay();
const { cartView } = storeToRefs(display);
const { updateCartViewDisplay } = display;
</script>
