<template>
    <div>
        <Html>
            <Head>
                <Title>Medusa + Nuxt App</Title>
                <Meta name="description" content="Generated by npx nuxi init" />
                <Link rel="icon" href="/favicon.ico" />
            </Head>
        </Html>
        <Layout>
            <NuxtPage />
        </Layout>
    </div>
</template>

<script setup lang="ts">
const store = useStore();
const { initialize } = store;

await useAsyncData("init-medusa", async () => {
    await initialize();
});
</script>
