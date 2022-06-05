<script lang="ts">
	import '../../app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { audBuilder, browserDetector, authorizationCheck, logOut } from '$lib/helpers';
	import { browser, os, aud } from '$lib/stores/UserAgentStore';
	import { user } from '$lib/stores/UserStore';
	import { SessionStore } from '$lib/stores/SessionStore';
	import Panel from '$lib/components/admin/Navigation/AdminPanel.svelte';
	import FlashMessage from '$lib/components/admin/shared/FlashMessage.svelte';

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

<div id="admin">
	<Panel />
	<main>
		<slot />
	</main>
</div>
<FlashMessage />

<style>
	#admin {
		display: grid;
		grid-template-areas: 'navigation content';
		grid-template-columns: minmax(200px, 20%) 1fr;
		width: 100%;
		max-width: 100vw;
		min-height: 100vh;
		overflow-x: hidden;
	}

	main {
		grid-area: content;
		width: 100%;
	}
</style>
