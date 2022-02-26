<script lang="ts">
	import '../../app.css';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { audBuilder, browserDetector } from '$lib/helpers';
	import { browser, os, aud } from '$lib/stores/UserAgentStore';
	import { user } from '$lib/stores/UserStore';
	import Panel from '$lib/components/admin/Navigation/AdminPanel.svelte';
	import FlashMessage from '$lib/components/admin/shared/FlashMessage.svelte';

	onMount(() => {
		user.useLocalStorage();
		if (!$user.user) goto("/admin/login", { replaceState: true });
		if (navigator && window) {
			const bd = browserDetector(navigator, window);
			aud.set(audBuilder(bd));
			browser.set(`${bd.browser.name}||${bd.browser.version}`);
			os.set(`${bd.os.name}||${bd.os.version}`);
		};
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
		grid-template-areas: "navigation content";
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
