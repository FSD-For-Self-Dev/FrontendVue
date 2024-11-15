<template>
    <PageLayout>
        <h1>ЯЗЫКИ</h1>
        <Button @click="showModal = true">Добавить языки</Button>
        <Modal :icon-modal="iconModal" :form="modalForm" v-if="showModal" :close-modal="() => showModal = false"
            title-modal="Добавить изучаемые языки" />
    </PageLayout>
</template>

<script lang="ts">
import Button from '@/components/UI/button/Button.vue';
import Modal from '@/components/UI/modal/Modal.vue';
import PageLayout from '@/components/UI/page-layout/PageLayout.vue';
import LanguagesForm from '@/components/language/LanguagesForm.vue';
import ExercisesIcon from '@/assets/icons/exercises/ExercisesIcon.vue';

export default {
    data() {
        return {
            iconModal: ExercisesIcon,
            modalForm: LanguagesForm,
            showModal: false
        }
    },
    components: { PageLayout, Button, Modal },
};
</script>

<style lang="scss" scoped></style>
