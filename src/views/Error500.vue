<script lang="ts">
import Button from '@/components/UI/button/Button.vue';
import PageLayout from '@/components/UI/page-layout/PageLayout.vue';

export default {
    name: 'Error500',
    components: { PageLayout, Button },
    computed: {
        err500(): string {
            return new URL(`/src/assets/images/error500.svg`, import.meta.url).href;
        }
    }
};
</script>

<template>
    <PageLayout>
        <div class="page-wrapper">
            <img
                :src="err500"
                alt="error image"
                class="img"
                width="399"
                height="238"
            />
            <h1 class="title">Ошибка сервера</h1>
            <p class="subtitle">
                Мы уже работаем над проблемой, попробуйте повторить действие
                позже
            </p>
            <div class="btn">
                <Button text="На главную" size="medium" @click="$router.push('/')" />
            </div>
        </div>
    </PageLayout>
</template>

<style scoped lang="scss">
.page-wrapper {
    margin: auto;
    text-align: center;
}
.img {
    margin: auto;
    margin-bottom: 4rem;
}
.title {
    @include subheading-2;
    color: $neutrals-900;
    padding: 2rem 0;
}
.subtitle {
    @include text-2;
    color: $neutrals-900;
}
.btn {
    margin-top: 4rem;
    display: flex;
    justify-content: center;
}
</style>
