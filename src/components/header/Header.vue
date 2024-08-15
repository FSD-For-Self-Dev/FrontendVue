<script lang="ts">
import Logo from '@/components/UI/logo/Logo.vue'
import Menu from './Menu.vue';
import Button from './Button.vue';
import Icon from '../UI/icon/Icon.vue';
import Navigation from './Navigation.vue';
import Search from './Search.vue';
import Language from './Language.vue';
import Authentication from '@/components/authentication/Authentication.vue';

export default {
	components: { Logo, Menu, Button, Icon, Navigation, Search, Language, Authentication },
	computed: {
		authorized() {
			return this.$route.path !== '/';
		},
	},
	data(): {
		showAuth: boolean,
		viewAuth: 'login' | 'register',
	} {
		return {
			showAuth: false,
			viewAuth: 'login',
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
			<Navigation v-if="authorized" />
		</div>

		<div class="header--right">
			<Button v-if="!authorized" @click="() => openAuth('login')">Войти</Button>
			<Button v-if="!authorized" variant="secondary"
				@click="() => openAuth('register')">Зарегистрироваться</Button>

			<Authentication :switch-form="switchForm" :close-auth="closeAuth" :show-auth="showAuth"
				:view-auth="viewAuth" v-if="!authorized" />

			<div class="header--tools" v-if="authorized">
				<Search />
				<Button variant="primary" view="icon">
					<Icon name="plus-white" width="25" height="25" />
				</Button>
			</div>

			<div class="header--user" v-if="authorized">
				<Button variant="secondary" size="small" view="icon">
					<Icon name="bell-default" width="18" height="18" />
				</Button>
				<Button variant="secondary" size="small" view="icon">
					<Icon name="profile" width="18" height="18" />
				</Button>
			</div>

			<div class="header--language">
				<Language />
			</div>
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
