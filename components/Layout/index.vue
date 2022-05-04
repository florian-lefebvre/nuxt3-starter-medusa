<template>
    <div class="flex min-h-screen flex-col bg-white">
        <LayoutNavBar />
        <main>
            <slot />
        </main>
        <LayoutFooter />
    </div>
</template>

<script setup lang="ts"></script>
