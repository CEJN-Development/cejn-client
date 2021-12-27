<script lang="ts">
	import Panel from '$lib/components/admin/Navigation/AdminPanel.svelte';
	import '../../app.css';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { audBuilder, browserDetector } from '$lib/helpers';
	import { browser, os, aud } from '$lib/stores/UserAgentStore';
	import { user } from '$lib/stores/UserStore';

	onMount(() => {
		user.useLocalStorage();
		if (!$user.user) goto("/admin/login", { replaceState: true });
		if (navigator && window) {
			const bd = browserDetector(navigator, window).init();
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