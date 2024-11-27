<script lang="ts">
import Logo from '@/components/UI/logo/Logo.vue'
import Menu from './Menu.vue';
import Navigation from './Navigation.vue';
import Language from './Language.vue';
import Authentication from '@/components/authentication/Authentication.vue';
import { mapState } from 'pinia';
import { useUserStore } from '@/store/user';
import { OnClickOutside } from '@vueuse/components';
import Button from '@/components/UI/button/Button.vue';
import ProfileTools from './ProfileTools.vue';
import IconButton from '../UI/button/IconButton.vue';

export default {
	components: { Logo, Menu, Button, IconButton, Navigation, Language, Authentication, ProfileTools, OnClickOutside },
	computed: {
		authorized() {
			return this.$route.path !== '/';
		},
		...mapState(useUserStore, ['username', 'authStatus', 'image']),
	},
	data(): {
		showAuth: boolean,
		viewAuth: 'login' | 'register',
		showProfileTools: boolean,
		shownBar: boolean,
	} {
		return {
			showAuth: false,
			viewAuth: 'login',
			showProfileTools: false,
			shownBar: false,
		};
	},
	methods: {
		openAuth(view: 'login' | 'register') {
			this.showAuth = !this.showAuth;
			this.viewAuth = view;
		},
		closeAuth() {
			this.showAuth = false;
		},
		switchForm(view: 'login' | 'register') {
			this.viewAuth = view;
		},
		showSearchBar(event: MouseEvent) {
            this.shownBar = true;
        },
        hideSearchBar() {
            this.shownBar = false;
        },
	},
};

</script>

<template>
	<header class="header">
		<div class="header--left">
			<Menu />
			<Logo />
		</div>

		<div class="header--navigation">
			<Navigation v-if="authStatus" />
		</div>

		<Authentication :switch-form="switchForm" :close-auth="closeAuth" :show-auth="showAuth"
			:view-auth="viewAuth" v-if="!authStatus" />

		<div class="header--tools" v-if="authStatus">
			<IconButton icon="SearchIcon" size="lg" variant="secondary" @click="showSearchBar" />
			<IconButton icon="AddIcon" size="lg" variant="primary" />
		</div>

		<div class="search" v-if="shownBar">
			<OnClickOutside @trigger="hideSearchBar" v-if="shownBar">
				<div class="searchbar" :class="{ shown: shownBar }">
					<div class="searchbar--input" />
				</div>
			</OnClickOutside>
		</div>

		<div class="header--right">
			<div class="header--auth-buttons" v-if="!authStatus">
				<Button label="Войти" size="normal" @click="() => openAuth('login')" />
				<Button label="Зарегистрироваться" size="normal" variant="secondary"
					@click="() => openAuth('register')" />
			</div>

			<div class="header--user" v-if="authStatus">
				<IconButton icon="BellIcon" size="md" variant="secondary" />
				<img class="header--avatar" :src="image" v-if="image" @click.stop="() => showProfileTools = !showProfileTools" />
				<IconButton v-else icon="ProfileIcon" size="md" variant="secondary"
					@click.stop="() => showProfileTools = !showProfileTools" />
			</div>

			<div class="header--language">
				<Language />
			</div>

			<Teleport to="body">
				<ProfileTools :handleClose="() => showProfileTools = false" v-if="showProfileTools" />
			</Teleport>
		</div>
	</header>
</template>

<style lang="scss">
.header {
	position: fixed;
	z-index: 10;
	top: 0;
	left: 0;
	width: 100%;
	height: 10rem;
	display: flex;
	gap: 4rem;
	align-items: center;
	justify-content: space-between;
	background-color: #ffffffe6;
	box-shadow: $regular-shadow;
	padding: 2.2rem 3.2rem;
	backdrop-filter: blur(4px);
	align-items: center;

	.header--left {
		display: flex;
		gap: 4rem;
	}

	.header--navigation {
		display: flex;
		gap: 1.2rem;
	}

	.header--tools {
		display: flex;
		gap: 1.2rem;
	}

	.header--right {
		display: flex;
		gap: 4rem;
		align-items: center;

		.header--auth-buttons {
			display: flex;
			gap: 1.6rem;
		}

		.header--user {
			display: flex;
			gap: 1.2rem;
		}

		.header--avatar {
			width: 4.4rem;
			height: 4.4rem;
			border-radius: 50%;
			object-fit: cover;
			border: none;
		}
	}
}
</style>
