<script lang="ts">
	import '../../app.css';
	import FlashMessage from '$lib/components/admin/shared/FlashMessage.svelte';
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
