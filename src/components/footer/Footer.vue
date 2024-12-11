<script lang="ts">
import Logo from '@/components/UI/logo/Logo.vue';

export default {
    components: { Logo },
    data() {
        return {
            privacyPolicies: [
                { name: this.$t('footer.terms'), link: '#' },
                { name: this.$t('footer.privacyPolicy'), link: '#' },
                {
                    name: this.$t('footer.personalDataConsent'),
                    link: '#',
                },
            ] as Array<{ name: string; link: string }>,
            navigationLinks: [
                { name: this.$t('footer.aboutUs'), link: '#' },
                { name: this.$t('footer.contacts'), link: '#' },
                { name: this.$t('footer.reviews'), link: '#' },
            ] as Array<{ name: string; link: string }>,
            socialLinks: [
                { name: 'YouTube', icon: 'YoutubeIcon', link: '#' },
                { name: 'Telegram', icon: 'TelegramIcon', link: '#' },
                { name: 'VK', icon: 'VkIcon', link: '#' },
                { name: 'GitHub', icon: 'GithubIcon', link: '#' },
            ] as Array<{ name: string; icon: string; link: string }>,
            year: new Date().getFullYear(),
        };
    },
};
</script>

<template>
    <footer class="footer">
        <div class="footer__wrapper">
            <Logo />
            <div class="footer__content">
                <ul class="footer__list text">
                    <li
                        class="footer__list-item"
                        v-for="navigationLink in navigationLinks"
                        :key="navigationLink.name"
                    >
                        <a :href="navigationLink.link" tabindex="0">
                            {{ navigationLink.name }}
                        </a>
                    </li>
                </ul>
                <ul class="footer__list text">
                    <li
                        class="footer__list-item"
                        v-for="privacyPolicy in privacyPolicies"
                        :key="privacyPolicy.name"
                    >
                        <a :href="privacyPolicy.link" tabindex="0">
                            {{ privacyPolicy.name }}
                        </a>
                    </li>
                </ul>
                <div class="footer__social">
                    <div class="footer__icons">
                        <a
                            v-for="socialLink in socialLinks"
                            :key="socialLink.name"
                            :href="socialLink.link"
                            target="_blank"
                            tabindex="0"
                            rel="noopener noreferrer"
                        >
                            <svg-icon :name="socialLink.icon" size="xxl" color="var:primary-400" hoverColor="var:primary-600" />
                            <span class="visually-hidden">
                                {{ socialLink.name }}
                            </span>
                        </a>
                    </div>
                    <p class="footer__rights text">
                        © {{ year }} Linguista. {{ $t('footer.rights') }}
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped lang="scss">
.text {
    color: $neutrals-700;
}

.footer {
    display: flex;
    justify-content: center;
    background-color: white;
    box-shadow: $regular-shadow;
    padding: 4rem 10rem 8rem;

    &__wrapper {
        width: 100%;
        max-width: 1400px;
    }

    &__content {
        margin: 3.2rem 0 0 0;
        display: flex;
        column-gap: 2rem;
        justify-content: space-between;
    }

    &__list {
        display: flex;
        flex-direction: column;
        row-gap: 1.6rem;
        list-style-type: none;
        margin: 0;
        padding: 0;
        @include text-2;
        color: $neutrals-700;

        &-item {
            @include hover {
                color: $neutrals-900;
            }
        }
    }

    &__social {
        display: flex;
        flex-direction: column;
        row-gap: 1.6rem;
        align-self: flex-end;
    }

    &__icons {
        display: flex;
        column-gap: 1.2rem;
        align-items: center;
    }

    &__rights {
        @include text-3;
        color: $neutrals-700;
    }
}
</style>
