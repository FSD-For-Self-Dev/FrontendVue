<script lang="ts">
import DiscordIcon from '@/components/icons/DiscordIcon.vue';
import GithubIcon from '@/components/icons/GithubIcon.vue';
import TelegramIcon from '@/components/icons/TelegramIcon.vue';
import VkIcon from '@/components/icons/VkIcon.vue';
import YoutubeIcon from '@/components/icons/YoutubeIcon.vue';
import Logo from '@/components/UI/logo/Logo.vue';

export default {
    components: { Logo, DiscordIcon, GithubIcon, TelegramIcon, VkIcon, YoutubeIcon },
    data() {
        return {
            privacyPolicies: [
                { name: 'Правила и условия', link: '#' },
                { name: 'Политика конфиденциальности', link: '#' },
                {
                    name: 'Согласие на обработку персональных данных',
                    link: '#',
                },
            ] as Array<{ name: string; link: string }>,
            navigationLinks: [
                { name: 'О платформе', link: '#' },
                { name: 'Контакты', link: '#' },
                { name: 'Отзывы', link: '#' },
            ] as Array<{ name: string; link: string }>,
            socialLinks: [
                { name: 'YouTube', icon: 'youtube', link: '#' },
                { name: 'Telegram', icon: 'telegram', link: '#' },
                { name: 'VK', icon: 'vk', link: '#' },
                { name: 'GitHub', icon: 'github', link: '#' },
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
                            class="footer__icon-link"
                            target="_blank"
                            tabindex="0"
                            rel="noopener noreferrer"
                        >
                            <YoutubeIcon size="32" custom-color="#9EB4FF" v-if="socialLink.icon === 'youtube'" />
                            <TelegramIcon size="32" custom-color="#9EB4FF" v-else-if="socialLink.icon === 'telegram'" />
                            <VkIcon size="32" custom-color="#9EB4FF" v-else-if="socialLink.icon === 'vk'" />
                            <GithubIcon size="32" custom-color="#9EB4FF" v-else-if="socialLink.icon === 'github'" />


                            <span class="visually-hidden">
                                {{ socialLink.name }}
                            </span>
                        </a>
                    </div>
                    <p class="footer__rights text">
                        © {{ year }} Linguista. Все права защищены.
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
        line-height: 2rem;

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

    &__icon-link {
        display: flex;
        align-items: center;
        width: 3.2rem;
        height: 3.2rem;
    }

    &__rights {
        font-size: 1.4rem;
    }
}
</style>
