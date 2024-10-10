<script lang="ts">
import Logo from '@/components/UI/logo/Logo.vue'
import Menu from './Menu.vue';
import Button from './Button.vue';
import Icon from '../UI/icon/Icon.vue';
import Navigation from './Navigation.vue';
import Search from './Search.vue';
import Language from './Language.vue';
import Authentication from '@/components/authentication/Authentication.vue';
import { mapState } from 'pinia';
import { useUserStore } from '@/store/user';
import ProfileTools from './ProfileTools.vue';

export default {
	components: { Logo, Menu, Button, Icon, Navigation, Search, Language, Authentication, ProfileTools },
	computed: {
		authorized() {
			return this.$route.path !== '/';
		},
		...mapState(useUserStore, ['username', 'authStatus']),
	},
	data(): {
		showAuth: boolean,
		viewAuth: 'login' | 'register',
		showProfileTools: boolean,
	} {
		return {
			showAuth: false,
			viewAuth: 'login',
			showProfileTools: false,
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
	},
};

</script>

<template>
	<header class="header">
		<div class="header--left">
			<Menu />
			<Logo />
		</div>

		<div class="header--center">
			<Navigation v-if="authStatus" />
		</div>

		<div class="header--right">
			<Button v-if="!authStatus" @click="() => openAuth('login')">Войти</Button>
			<Button v-if="!authStatus" variant="secondary"
				@click="() => openAuth('register')">Зарегистрироваться</Button>

			<Authentication :switch-form="switchForm" :close-auth="closeAuth" :show-auth="showAuth"
				:view-auth="viewAuth" v-if="!authStatus" />

			<div class="header--tools" v-if="authStatus">
				<Search />
				<Button variant="primary" view="icon">
					<Icon name="plus-white" width="32" height="32" color="#fff" />
				</Button>
			</div>

			<div class="header--user" v-if="authStatus">
				<Button variant="secondary" size="small" view="icon">
					<Icon name="bell-default" width="18" height="18" />
				</Button>
				<Button variant="secondary" size="small" view="icon"
					@click.stop="() => showProfileTools = !showProfileTools">
					<Icon name="profile" width="18" height="18" />
				</Button>
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
	gap: 3.2rem;
	justify-content: space-between;
	background-color: #ffffffe6;
	box-shadow: $regular-shadow;
	padding: 2.2rem 3.2rem;
	backdrop-filter: blur(4px);
	align-items: center;


	.header--left {
		display: flex;
		gap: 3.2rem;
	}

	.header--center {
		display: flex;
		gap: 1rem;
	}

	.header--right {
		display: flex;
		gap: 4rem;
		align-items: center;


		.header--tools {
			display: flex;
			gap: 1rem;
		}

		.header--user {
			display: flex;
			gap: 1rem;
		}
	}
}
</style>
