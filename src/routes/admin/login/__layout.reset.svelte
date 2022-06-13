<script lang="ts">
	import '../../../app.css';
	import FlashMessage from '$lib/components/admin/shared/FlashMessage.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores/UserStore';
	import { audBuilder, browserDetector, authorizationCheck, logOut } from '$lib/helpers';
	import { browser, os, aud } from '$lib/stores/UserAgentStore';
	import { SessionStore } from '$lib/stores/SessionStore';

	onMount(async () => {
		if (navigator && window) {
			const bd = browserDetector(navigator, window);
			aud.set(audBuilder(bd));
			browser.set(`${bd.browser.name}||${bd.browser.version}`);
			os.set(`${bd.os.name}||${bd.os.version}`);
		}

		if ($SessionStore.authenticated == false) {
			if ($SessionStore.authenticating == true) {
				user.useLocalStorage();

				if (!$user.user) {
					$SessionStore.authenticating = false;
					return goto('/admin/login', { replaceState: true });
				}

				const authorization = await authorizationCheck();

				if (!authorization.response.ok) {
					$SessionStore.authenticating = false;
					return logOut();
				} else {
					SessionStore.set({
						authenticated: true,
						authenticating: false,
						user: $user.user
					});

					if ($page.url.pathname === '/admin/login') {
						goto('/admin', { replaceState: true });
						window.location.reload();
					}
				}
			}
		}
	});
</script>

<header class="flex-row align-center drop-24">
	<img
		class="border--rounded-circle raised-3"
		src="/favicon.png"
		alt="Chicago Environmental Justice Network Logo"
	/>
</header>
<div id="admin">
	<main>
		<slot />
	</main>
</div>
<FlashMessage />

<style>
	header {
		max-height: 5rem;
	}

	img {
		width: auto;
		height: 100%;
	}
</style>
