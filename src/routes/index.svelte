<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import WhoAreWe from "$lib/index/WhoAreWe.svelte";
	import About from "../lib/index/About.svelte";
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<hr class="separator stack-48" />
<About />
<hr class="separator stack-48" />
<WhoAreWe />
<hr class="separator stack-48" />
