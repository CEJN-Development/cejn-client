<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import About from "../lib/index/About.svelte";
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<About />

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
</style>
