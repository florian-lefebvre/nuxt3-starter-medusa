<template>
    <div>
        <div>FAQ</div>
        <div>{{ cartView }}</div>
        <button @click="updateCartViewDisplay()">UPDATE</button>
    </div>
</template>
+

<script setup lang="ts">
const {
    actions: { updateCartViewDisplay },
    state: { cartView },
} = useDisplay();
</script>
